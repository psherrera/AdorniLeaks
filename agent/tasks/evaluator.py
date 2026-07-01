"""
AdorniLeaks — Task 2: Evaluador de Relevancia (The Filter)
Usa Groq (Llama 3.3 70B) para determinar si una nota merece ser archivada.
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

from config.prompts import EVALUADOR_SISTEMA, EVALUADOR_USUARIO

# Cliente Groq (singleton)
_client: Groq | None = None


def _get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=os.environ["GROQ_API_KEY"])
    return _client


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=15),
    retry=retry_if_exception_type(Exception),
    reraise=True,
)
def _llamar_groq(titulo: str, texto: str) -> dict:
    """Llama a Groq y parsea el JSON de respuesta."""
    client = _get_client()
    model = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

    prompt_usuario = EVALUADOR_USUARIO.format(
        titulo=titulo,
        texto=texto[:2000],  # Límite para el evaluador (es rápido)
    )

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": EVALUADOR_SISTEMA},
            {"role": "user", "content": prompt_usuario},
        ],
        temperature=0.1,  # Muy determinista para el evaluador
        max_tokens=200,
        response_format={"type": "json_object"},
    )

    raw = response.choices[0].message.content.strip()
    return json.loads(raw)


def evaluar(articulo: dict) -> dict:
    """
    Evalúa si un artículo es relevante para AdorniLeaks.

    Args:
        articulo: dict con {url, titulo, texto, fuente, ...}

    Returns:
        dict con {guardar: bool, score: int, categoria: str, razon: str}
        o {guardar: false, error: str} si falla.
    """
    titulo = articulo.get("titulo", "Sin título")
    texto = articulo.get("texto", "")

    logger.info(f"🔍 Evaluando: '{titulo[:60]}...'")

    try:
        resultado = _llamar_groq(titulo, texto)

        # Validar estructura esperada
        score = int(resultado.get("score", 0))
        guardar = resultado.get("guardar", False)
        categoria = resultado.get("categoria", "Sin Categoría")
        razon = resultado.get("razon", "")

        score_minimo = int(os.environ.get("SCORE_MINIMO", "6"))

        # Doble verificación: si el score es bajo, forzar guardar=false
        if score < score_minimo:
            guardar = False

        emoji = "✅" if guardar else "❌"
        logger.info(f"  {emoji} Score: {score}/10 | Categoría: {categoria} | {razon}")

        return {
            "guardar": guardar,
            "score": score,
            "categoria": categoria,
            "razon": razon,
        }

    except json.JSONDecodeError as e:
        logger.error(f"  ⚠️ Error parseando JSON del evaluador: {e}")
        return {"guardar": False, "error": str(e)}
    except Exception as e:
        logger.error(f"  ⚠️ Error en el evaluador: {e}")
        return {"guardar": False, "error": str(e)}
