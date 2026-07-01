"""
AdorniLeaks — Task 3: Redactor y Curador (The Writer)
Usa Groq para reescribir el título, redactar el resumen y asignar tags.
"""

import json
import os
from groq import Groq
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)
from loguru import logger

from config.prompts import REDACTOR_SISTEMA, REDACTOR_USUARIO

_client: Groq | None = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=os.environ["GROQ_API_KEY"])
    return _client


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=3, max=20),
    retry=retry_if_exception_type(Exception),
    reraise=True,
)
def _llamar_groq(titulo: str, texto: str, fuente: str, categoria: str) -> dict:
    """Llama a Groq para que redacte el contenido curado."""
    client = _get_client()
    model = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

    prompt_usuario = REDACTOR_USUARIO.format(
        titulo=titulo,
        texto=texto[:3000],
        fuente=fuente,
        categoria=categoria,
    )

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": REDACTOR_SISTEMA},
            {"role": "user", "content": prompt_usuario},
        ],
        temperature=0.4,  # Algo de creatividad para el título, pero controlada
        max_tokens=800,
        response_format={"type": "json_object"},
    )

    raw = response.choices[0].message.content.strip()
    return json.loads(raw)


def redactar(articulo: dict, evaluacion: dict) -> dict | None:
    """
    Genera el contenido curado de un artículo validado.

    Args:
        articulo:   dict con {url, titulo, texto, fuente, slug, fecha_publicacion}
        evaluacion: dict con {score, categoria, razon}

    Returns:
        dict con todos los campos listos para insertar en la BD, o None si falla.
    """
    titulo = articulo.get("titulo", "Sin título")
    texto = articulo.get("texto", "")
    fuente = articulo.get("fuente", "Desconocida")
    categoria = evaluacion.get("categoria", "Sin Categoría")

    logger.info(f"✍️  Redactando: '{titulo[:60]}...'")

    try:
        resultado = _llamar_groq(titulo, texto, fuente, categoria)

        titulo_ia = resultado.get("titulo_ia", titulo)
        resumen_ia = resultado.get("resumen_ia", "")
        tags = resultado.get("tags", [])

        # Validaciones básicas
        if not titulo_ia or not resumen_ia:
            logger.error("  ⚠️ Redactor devolvió campos vacíos")
            return None

        logger.info(f"  ✅ Título IA: '{titulo_ia[:70]}...'")

        return {
            "slug": articulo["slug"],
            "titulo_original": titulo,
            "titulo_ia": titulo_ia[:200],  # Límite de seguridad
            "resumen_ia": resumen_ia,
            "url": articulo["url"],
            "fuente": fuente,
            "categoria": categoria,
            "tags": tags,
            "score_relevancia": evaluacion.get("score", 6),
            "fecha_publicacion": articulo.get("fecha_publicacion"),
        }

    except json.JSONDecodeError as e:
        logger.error(f"  ⚠️ Error parseando JSON del redactor: {e}")
        return None
    except Exception as e:
        logger.error(f"  ⚠️ Error en el redactor: {e}")
        return None
