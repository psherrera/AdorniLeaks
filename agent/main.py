"""
AdorniLeaks — main.py
Orquestador principal del agente. Ejecuta las 4 tareas en secuencia.

Uso:
    python main.py                  # Ejecución normal
    python main.py --dry-run        # Sin escribir en BD
    python main.py --limit 5        # Procesa solo N artículos
    python main.py --verbose        # Más detalle en logs
"""

import argparse
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

# Fix encoding en Windows (PowerShell usa cp1252 por defecto, no soporta emojis)
if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr.encoding and sys.stderr.encoding.lower() != "utf-8":
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from dotenv import load_dotenv
from loguru import logger

# Cargar variables de entorno desde .env (si existe, ignorado en GitHub Actions)
load_dotenv()

# Configurar logger
logger.remove()
logger.add(
    sys.stdout,
    format="<green>{time:HH:mm:ss}</green> | <level>{level: <8}</level> | {message}",
    level="DEBUG",
)
logger.add(
    Path(__file__).parent / "logs" / "agente_{time:YYYY-MM-DD}.log",
    rotation="1 day",
    retention="30 days",
    level="INFO",
)

# Importar tasks (después de load_dotenv para que tengan las env vars)
from tasks.fetcher import fetch_articulos
from tasks.evaluator import evaluar
from tasks.writer import redactar
from tasks.indexer import get_urls_procesadas, indexar


def main(dry_run: bool = False, limit: int | None = None):
    inicio = datetime.now(tz=timezone.utc)
    logger.info("=" * 60)
    logger.info("🚀 AdorniLeaks Agent — Inicio de ejecución")
    logger.info(f"   Timestamp: {inicio.isoformat()}")
    logger.info(f"   Modo: {'DRY RUN (sin escritura)' if dry_run else 'PRODUCCIÓN'}")
    if limit:
        logger.info(f"   Límite: {limit} artículos")
    logger.info("=" * 60)

    # ─────────────────────────────────────────────
    # STEP 0: Obtener URLs ya procesadas
    # ─────────────────────────────────────────────
    if not dry_run:
        urls_procesadas = get_urls_procesadas()
    else:
        urls_procesadas = set()
        logger.info("🔵 Dry run: BD no consultada")

    # ─────────────────────────────────────────────
    # TASK 1: Fetcher
    # ─────────────────────────────────────────────
    logger.info("\n📡 TASK 1: Fetcher")
    articulos = fetch_articulos(urls_procesadas)

    if not articulos:
        logger.info("✅ Sin artículos nuevos para procesar. El archivo está al día.")
        return

    # Aplicar límite si se especificó
    if limit:
        articulos = articulos[:limit]
        logger.info(f"⚠️  Limitando a {limit} artículos para esta ejecución")

    # ─────────────────────────────────────────────
    # Contadores para el reporte final
    # ─────────────────────────────────────────────
    stats = {
        "total": len(articulos),
        "evaluados": 0,
        "relevantes": 0,
        "descartados": 0,
        "indexados": 0,
        "errores": 0,
    }

    # ─────────────────────────────────────────────
    # TASK 2 + 3 + 4: Por cada artículo
    # ─────────────────────────────────────────────
    for i, articulo in enumerate(articulos, 1):
        logger.info(f"\n[{i}/{stats['total']}] {articulo['url']}")

        # ── TASK 2: Evaluador ──
        evaluacion = evaluar(articulo)
        stats["evaluados"] += 1

        if not evaluacion.get("guardar", False):
            stats["descartados"] += 1
            continue

        stats["relevantes"] += 1

        # ── TASK 3: Redactor ──
        payload = redactar(articulo, evaluacion)
        if not payload:
            stats["errores"] += 1
            continue

        # ── TASK 4: Indexador ──
        if not dry_run:
            exito = indexar(payload)
            if exito:
                stats["indexados"] += 1
            else:
                stats["errores"] += 1
        else:
            logger.info(f"  🔵 [DRY RUN] Sería indexado: '{payload['titulo_ia'][:60]}'")
            stats["indexados"] += 1

        # Rate limiting cortés para Groq (gratis tiene límite de requests/min)
        # Groq free: 30 requests/min → ~2s entre cada par de llamadas
        time.sleep(2)

    # ─────────────────────────────────────────────
    # Reporte final
    # ─────────────────────────────────────────────
    duracion = (datetime.now(tz=timezone.utc) - inicio).total_seconds()

    logger.info("\n" + "=" * 60)
    logger.info("📊 REPORTE FINAL")
    logger.info(f"   Total artículos revisados:  {stats['total']}")
    logger.info(f"   Evaluados por IA:           {stats['evaluados']}")
    logger.info(f"   Relevantes (guardados):     {stats['relevantes']}")
    logger.info(f"   Descartados (score bajo):   {stats['descartados']}")
    logger.info(f"   ✅ Indexados en BD:         {stats['indexados']}")
    logger.info(f"   ❌ Errores:                 {stats['errores']}")
    logger.info(f"   ⏱  Duración:               {duracion:.1f}s")
    logger.info("=" * 60)

    if stats["indexados"] > 0:
        logger.success(
            f"🎉 ¡{stats['indexados']} nota(s) nueva(s) archivadas en AdorniLeaks!"
        )
    else:
        logger.info("💤 Sin notas nuevas para archivar en esta ejecución.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AdorniLeaks Agent")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Ejecutar sin escribir en la base de datos",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Máximo de artículos a procesar",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Más detalle en los logs",
    )
    args = parser.parse_args()

    main(dry_run=args.dry_run, limit=args.limit)
