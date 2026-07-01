import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { getNotaBySlug, getStats } from "@/lib/supabase";

export const dynamic = "force-dynamic";


interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const nota = await getNotaBySlug(params.slug);
  if (!nota) return { title: "Nota no encontrada" };

  const descripcion = nota.resumen_ia?.split("\n")[0]?.slice(0, 155) || "";

  return {
    title: nota.titulo_ia,
    description: descripcion,
    openGraph: {
      type: "article",
      title: nota.titulo_ia,
      description: descripcion,
      publishedTime: nota.fecha_publicacion,
      images: [
        {
          url: "https://adorni-leaks.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: nota.titulo_ia,
        },
      ],
    },
  };
}

function getCategoryClass(categoria: string): string {
  const map: Record<string, string> = {
    "Causas Judiciales": "cat-causas-judiciales",
    "Conferencias de Prensa": "cat-conferencias-de-prensa",
    Desaires: "cat-desaires",
    "Dichos Polémicos": "cat-dichos-polemicos",
    Gobierno: "cat-gobierno",
  };
  return map[categoria] || "cat-sin-categoria";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderResumen(resumen: string) {
  // Separar por saltos de línea dobles o simples en párrafos
  const parrafos = resumen
    .split(/\n{1,2}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return parrafos.map((parrafo, i) => <p key={i}>{parrafo}</p>);
}

export default async function ArticlePage({ params }: PageProps) {
  const [nota, stats] = await Promise.all([
    getNotaBySlug(params.slug),
    getStats(),
  ]);

  if (!nota) notFound();

  const catClass = getCategoryClass(nota.categoria);

  return (
    <>
      <Header totalNotas={stats.total} />

      <main>
        <article className="article-page">
          {/* Volver */}
          <Link href="/" className="article-back" id="back-link">
            ← Volver al archivo
          </Link>

          {/* Cabecera */}
          <header className="article-header">
            <div className="article-badges">
              <span className={`category-badge ${catClass}`}>
                {nota.categoria}
              </span>
              <span className="article-score-badge">
                🎯 Relevancia {nota.score_relevancia}/10
              </span>
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  padding: "3px 10px",
                  borderRadius: "100px",
                }}
              >
                📰 {nota.fuente}
              </span>
            </div>

            <h1 className="article-title">{nota.titulo_ia}</h1>

            <div className="article-info">
              {nota.fecha_publicacion && (
                <>
                  <span>📅 {formatDate(nota.fecha_publicacion)}</span>
                  <span className="article-info-dot" aria-hidden="true" />
                </>
              )}
              <span>
                Indexado por AdorniLeaks el{" "}
                {formatDate(nota.fecha_indexacion)}
              </span>
            </div>
          </header>

          {/* Cuerpo del artículo */}
          <div className="article-body">{renderResumen(nota.resumen_ia)}</div>

          {/* Tags */}
          {nota.tags && nota.tags.length > 0 && (
            <div className="article-tags">
              {nota.tags.map((tag) => (
                <span key={tag} className="article-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Link a la fuente original */}
          <div>
            <a
              id="source-link"
              href={nota.url}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link-btn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Leer nota original en {nota.fuente}
            </a>
            <p className="source-disclaimer">
              Todo el crédito periodístico pertenece a {nota.fuente}. 
              AdorniLeaks solo archiva y resume con fines de memoria pública.
            </p>
          </div>
        </article>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            <strong>AdorniLeaks</strong> — Porque la memoria es resistencia.
          </p>
        </div>
      </footer>
    </>
  );
}
