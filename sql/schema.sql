-- ============================================================
-- AdorniLeaks — Schema SQL
-- Ejecutar en Supabase SQL Editor o psql
-- ============================================================

-- Tabla principal de noticias curadas por el agente
CREATE TABLE IF NOT EXISTS notas (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug                TEXT UNIQUE NOT NULL,            -- URL amigable: ej. "adorni-desaire-discapacidad-2024-03"
    titulo_original     TEXT NOT NULL,                   -- Título tal como apareció en la fuente
    titulo_ia           TEXT,                            -- Título reescrito por la IA
    resumen_ia          TEXT,                            -- Copete/resumen redactado por la IA (2-3 párrafos)
    url                 TEXT UNIQUE NOT NULL,            -- URL de la nota original (fuente)
    fuente              TEXT,                            -- Nombre del medio (ej: "Infobae", "Clarin")
    categoria           TEXT CHECK (categoria IN (
                            'Causas Judiciales',
                            'Conferencias de Prensa',
                            'Desaires',
                            'Dichos Polémicos',
                            'Gobierno',
                            'Sin Categoría'
                        )) DEFAULT 'Sin Categoría',
    tags                TEXT[],                          -- Array de etiquetas (ej: ["discapacidad", "ANDIS", "insulto"])
    score_relevancia    SMALLINT CHECK (score_relevancia BETWEEN 1 AND 10),
    fecha_publicacion   TIMESTAMPTZ,                     -- Fecha de publicación en la fuente original
    fecha_indexacion    TIMESTAMPTZ DEFAULT now(),       -- Fecha en que el agente la procesó
    procesado_por       TEXT DEFAULT 'groq/llama-3.3-70b-versatile',
    activo              BOOLEAN DEFAULT true,            -- Para soft-delete sin borrar datos
    -- Columna generada para full-text search en español (usada por el frontend via .textSearch)
    fts                 TSVECTOR GENERATED ALWAYS AS (
                            to_tsvector('spanish', coalesce(titulo_ia, '') || ' ' || coalesce(resumen_ia, ''))
                        ) STORED
);

-- Índices para performance del frontend
CREATE INDEX IF NOT EXISTS idx_notas_categoria    ON notas (categoria);
CREATE INDEX IF NOT EXISTS idx_notas_fecha        ON notas (fecha_publicacion DESC);
CREATE INDEX IF NOT EXISTS idx_notas_score        ON notas (score_relevancia DESC);
CREATE INDEX IF NOT EXISTS idx_notas_activo       ON notas (activo);
CREATE INDEX IF NOT EXISTS idx_notas_slug         ON notas (slug);

-- Full-text search en español (columna generada fts, usada por el frontend)
CREATE INDEX IF NOT EXISTS idx_notas_fts ON notas USING GIN (fts);

-- Vista pública para el frontend (solo campos necesarios, sin datos internos)
CREATE OR REPLACE VIEW notas_publicas AS
SELECT
    id,
    slug,
    titulo_ia,
    resumen_ia,
    url,
    fuente,
    categoria,
    tags,
    score_relevancia,
    fecha_publicacion,
    fecha_indexacion
FROM notas
WHERE activo = true
ORDER BY fecha_publicacion DESC;

-- ============================================================
-- Row Level Security (Supabase)
-- Solo lectura pública; escritura solo vía service_role (el agente)
-- ============================================================
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de notas activas"
    ON notas FOR SELECT
    USING (activo = true);

-- ============================================================
-- Tabla de fuentes monitoreadas (para referencia y auditoría)
-- ============================================================
CREATE TABLE IF NOT EXISTS fuentes (
    id          SERIAL PRIMARY KEY,
    nombre      TEXT NOT NULL,
    url_rss     TEXT NOT NULL UNIQUE,
    activa      BOOLEAN DEFAULT true,
    ultima_vez  TIMESTAMPTZ          -- Última vez que el agente la procesó
);

INSERT INTO fuentes (nombre, url_rss) VALUES
    ('Infobae',         'https://www.infobae.com/feeds/rss/'),
    ('Clarín',          'https://www.clarin.com/rss/politica/'),
    ('La Nación',       'https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml'),
    ('Página 12',       'https://www.pagina12.com.ar/rss/secciones/el-pais/notas'),
    ('TN',              'https://tn.com.ar/rss/politica.xml'),
    ('Ámbito',          'https://www.ambito.com/rss/pages/economia.xml'),
    ('El Destape',      'https://www.eldestapeweb.com/rss/'),
    ('Perfil',          'https://www.perfil.com/feed/')   -- Reemplaza Télam (intervenida, RSS caído)
ON CONFLICT DO NOTHING;
