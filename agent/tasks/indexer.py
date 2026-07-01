"""
AdorniLeaks — Task 4: Indexador (The Publisher)
Guarda el contenido curado en Supabase y recupera URLs ya procesadas.
"""

import os
from supabase import create_client, Client
from loguru import logger

_supabase: Client | None = None


def _get_client() -> Client:
    global _supabase
    if _supabase is None:
        url = os.environ["SUPABASE_URL"]
        key = os.environ["SUPABASE_SERVICE_KEY"]
        _supabase = create_client(url, key)
    return _supabase


def get_urls_procesadas() -> set[str]:
    """
    Recupera todas las URLs ya indexadas en la BD.
    Usado por el Fetcher para evitar procesar duplicados.

    Returns:
        Conjunto de URLs ya presentes en la tabla `notas`.
    """
    try:
        client = _get_client()
        # Paginamos en lotes de 1000 por si hay muchas notas
        urls = set()
        offset = 0
        batch_size = 1000

        while True:
            response = (
                client.table("notas")
                .select("url")
                .range(offset, offset + batch_size - 1)
                .execute()
            )
            data = response.data or []
            if not data:
                break
            for row in data:
                urls.add(row["url"])
            if len(data) < batch_size:
                break
            offset += batch_size

        logger.info(f"📦 URLs ya indexadas en BD: {len(urls)}")
        return urls

    except Exception as e:
        logger.error(f"Error obteniendo URLs de Supabase: {e}")
        return set()


def indexar(payload: dict) -> bool:
    """
    Inserta o actualiza una nota curada en la tabla `notas` de Supabase.

    Usa UPSERT por `url` para garantizar idempotencia (nunca duplica).

    Args:
        payload: dict con todos los campos de la tabla.

    Returns:
        True si se guardó correctamente, False si hubo error.
    """
    try:
        client = _get_client()

        response = (
            client.table("notas")
            .upsert(
                payload,
                on_conflict="url",   # Si la URL ya existe, actualiza los campos IA
                ignore_duplicates=False,
            )
            .execute()
        )

        if response.data:
            slug = payload.get("slug", "?")
            categoria = payload.get("categoria", "?")
            score = payload.get("score_relevancia", "?")
            logger.success(f"  💾 Indexada: [{categoria}] score={score} | {slug}")
            return True
        else:
            logger.warning(f"  ⚠️ Upsert sin datos de retorno para {payload.get('url')}")
            return False

    except Exception as e:
        logger.error(f"  ❌ Error indexando {payload.get('url', '?')}: {e}")
        return False
