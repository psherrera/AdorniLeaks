import Link from "next/link";
import { type Nota } from "@/lib/supabase";

// ── Helpers ──────────────────────────────────────────────────────

function getCategoryClass(categoria: string): string {
  const map: Record<string, string> = {
    "Causas Judiciales": "cat-causas-judiciales",
    "Conferencias de Prensa": "cat-conferencias-de-prensa",
    Desaires: "cat-desaires",
    "Dichos Polémicos": "cat-dichos-polemicos",
    Gobierno: "cat-gobierno",
    "Sin Categoría": "cat-sin-categoria",
  };
  return map[categoria] || "cat-sin-categoria";
}

function getCategoryEmoji(categoria: string): string {
  const map: Record<string, string> = {
    "Causas Judiciales": "⚖️",
    "Conferencias de Prensa": "🎙️",
    Desaires: "😤",
    "Dichos Polémicos": "💬",
    Gobierno: "🏛️",
    "Sin Categoría": "📄",
  };
  return map[categoria] || "📄";
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function truncateSummary(text: string, maxChars: number = 200): string {
  if (!text) return "";
  // Tomar solo el primer párrafo
  const firstParagraph = text.split("\n")[0];
  if (firstParagraph.length <= maxChars) return firstParagraph;
  return firstParagraph.substring(0, maxChars).trimEnd() + "…";
}

// ── Componente ────────────────────────────────────────────────────

interface NewsCardProps {
  nota: Nota;
  index?: number;
}

export default function NewsCard({ nota, index = 0 }: NewsCardProps) {
  const catClass = getCategoryClass(nota.categoria);
  const catEmoji = getCategoryEmoji(nota.categoria);
  const isHighScore = nota.score_relevancia >= 9;

  return (
    <Link
      href={`/${nota.slug}`}
      id={`card-${nota.id}`}
      className="news-card animate-in"
      style={{
        animationDelay: `${Math.min(index * 50, 400)}ms`,
      }}
    >
      {/* Header: badges + score */}
      <div className="card-header">
        <div className="card-meta">
          <span className={`category-badge ${catClass}`}>
            {catEmoji} {nota.categoria}
          </span>
          <span className="fuente-tag">{nota.fuente}</span>
        </div>
        <div
          className={`card-score ${isHighScore ? "high" : ""}`}
          title={`Relevancia: ${nota.score_relevancia}/10`}
        >
          {nota.score_relevancia}
        </div>
      </div>

      {/* Título */}
      <h2 className="card-title">{nota.titulo_ia}</h2>

      {/* Resumen (primer párrafo) */}
      <p className="card-summary">{truncateSummary(nota.resumen_ia)}</p>

      {/* Footer: fecha + tags */}
      <div className="card-footer">
        <span className="card-date">
          📅 {nota.fecha_publicacion ? formatDate(nota.fecha_publicacion) : "Sin fecha"}
        </span>
        <div className="card-tags">
          {(nota.tags || []).slice(0, 2).map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

// ── Skeleton loader ────────────────────────────────────────────────

export function NewsCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton" style={{ height: "20px", width: "40%" }} />
      <div className="skeleton" style={{ height: "24px", width: "90%" }} />
      <div className="skeleton" style={{ height: "16px", width: "100%" }} />
      <div className="skeleton" style={{ height: "16px", width: "80%" }} />
      <div className="skeleton" style={{ height: "16px", width: "60%" }} />
    </div>
  );
}
