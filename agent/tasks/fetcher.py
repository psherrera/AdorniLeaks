"""
AdorniLeaks — Task 1: Fetcher (Extractor de Contenido)
Lee feeds RSS, filtra por keywords y extrae texto limpio.
"""

import feedparser
import trafilatura
import httpx
from datetime import datetime, timezone
from loguru import logger
from slugify import slugify

from config.feeds import FEEDS, KEYWORDS


def _contiene_keyword(texto: str) -> bool:
    """Verifica si el texto contiene alguna keyword de Adorni."""
    texto_lower = texto.lower()
    return any(kw in texto_lower for kw in KEYWORDS)


def _extraer_texto(url: str, timeout: int = 15) -> str | None:
    """
    Descarga la URL y extrae el texto limpio con trafilatura.
    Retorna None si falla o el texto es muy corto.
    """
    try:
        response = httpx.get(
            url,
            timeout=timeout,
            follow_redirects=True,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 (compatible; AdorniLeaksBot/1.0; "
                    "+https://github.com/tu-usuario/adorni-leaks)"
                )
            },
        )
        if response.status_code != 200:
            logger.warning(f"HTTP {response.status_code} para {url}")
            return None

        texto = trafilatura.extract(
            response.text,
            include_comments=False,
            include_tables=False,
            no_fallback=False,
        )

        if not texto or len(texto) < 200:
            logger.debug(f"Texto demasiado corto o vacío para {url}")
            return None

        # Limitar a ~3000 chars para no gastar tokens de más en Groq
        return texto[:3000]

    except Exception as e:
        logger.warning(f"Error extrayendo texto de {url}: {e}")
        return None


def _parsear_fecha(entry) -> datetime | None:
    """Parsea la fecha de publicación de una entrada RSS."""
    try:
        if hasattr(entry, "published_parsed") and entry.published_parsed:
            return datetime(*entry.published_parsed[:6], tzinfo=timezone.utc)
        if hasattr(entry, "updated_parsed") and entry.updated_parsed:
            return datetime(*entry.updated_parsed[:6], tzinfo=timezone.utc)
    except Exception:
        pass
    return datetime.now(tz=timezone.utc)


def fetch_articulos(urls_ya_procesadas: set[str]) -> list[dict]:
    """
    Lee todos los feeds RSS configurados y retorna artículos nuevos sobre Adorni.

    Args:
        urls_ya_procesadas: conjunto de URLs ya en la base de datos.

    Returns:
        Lista de dicts con {url, titulo, texto, fuente, fecha_publicacion, slug}
    """
    articulos_nuevos = []
    total_revisados = 0
    total_filtrados_keyword = 0
    total_duplicados = 0

    for feed_config in FEEDS:
        nombre = feed_config["nombre"]
        url_feed = feed_config["url"]

        logger.info(f"📡 Leyendo feed: {nombre}")
        try:
            feed = feedparser.parse(url_feed)
            if feed.bozo and feed.bozo_exception:
                logger.warning(f"Feed mal formado ({nombre}): {feed.bozo_exception}")
        except Exception as e:
            logger.error(f"Error leyendo {nombre}: {e}")
            continue

        for entry in feed.entries:
            total_revisados += 1

            # Extraer URL canónica
            url = getattr(entry, "link", None)
            if not url:
                continue

            # Filtrar duplicados contra la BD
            if url in urls_ya_procesadas:
                total_duplicados += 1
                continue

            # Extraer título para pre-filtro rápido
            titulo = getattr(entry, "title", "") or ""
            resumen_feed = getattr(entry, "summary", "") or ""

            # Pre-filtro por keyword (rápido, sin descargar la nota completa)
            texto_para_filtrar = (titulo + " " + resumen_feed).lower()
            if not _contiene_keyword(texto_para_filtrar):
                continue

            total_filtrados_keyword += 1
            logger.info(f"  ✅ Posible match: '{titulo[:60]}...'")

            # Descargar y extraer texto completo
            texto_completo = _extraer_texto(url)
            if not texto_completo:
                # Fallback: usar el resumen del feed si hay suficiente texto
                if len(resumen_feed) >= 200:
                    texto_completo = resumen_feed[:3000]
                else:
                    logger.debug(f"  ⏭ Sin texto suficiente, saltando: {url}")
                    continue

            # Verificar keyword en el texto completo también
            if not _contiene_keyword(texto_completo) and not _contiene_keyword(titulo):
                continue

            fecha = _parsear_fecha(entry)

            # Generar slug único basado en título + fecha
            slug_base = slugify(titulo[:60] + " " + fecha.strftime("%Y-%m"))
            slug = slug_base[:100]  # Máximo 100 chars

            articulos_nuevos.append({
                "url": url,
                "titulo": titulo,
                "texto": texto_completo,
                "fuente": nombre,
                "fecha_publicacion": fecha.isoformat(),
                "slug": slug,
            })

            # Marcar como procesada para no repetir dentro del mismo run
            urls_ya_procesadas.add(url)

    logger.info(
        f"\n📊 Resumen Fetcher:\n"
        f"   Total revisados:  {total_revisados}\n"
        f"   Match keywords:   {total_filtrados_keyword}\n"
        f"   Duplicados:       {total_duplicados}\n"
        f"   ✅ A procesar:    {len(articulos_nuevos)}"
    )

    return articulos_nuevos
