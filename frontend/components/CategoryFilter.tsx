import { type Categoria } from "@/lib/supabase";

const CATEGORIAS: { label: Categoria; emoji: string }[] = [
  { label: "Todas", emoji: "📋" },
  { label: "Causas Judiciales", emoji: "⚖️" },
  { label: "Conferencias de Prensa", emoji: "🎙️" },
  { label: "Desaires", emoji: "😤" },
  { label: "Dichos Polémicos", emoji: "💬" },
  { label: "Gobierno", emoji: "🏛️" },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (cat: string) => void;
  counts: Record<string, number>;
  total: number;
}

export default function CategoryFilter({
  selected,
  onSelect,
  counts,
  total,
}: CategoryFilterProps) {
  const getCount = (label: string) => {
    if (label === "Todas") return total;
    return counts[label] || 0;
  };

  return (
    <div className="category-filter">
      {CATEGORIAS.map(({ label, emoji }) => (
        <button
          key={label}
          id={`filter-${label.toLowerCase().replace(/\s+/g, "-")}`}
          className={`filter-btn ${selected === label ? "active" : ""}`}
          onClick={() => onSelect(label)}
        >
          <span>{emoji}</span>
          <span>{label}</span>
          <span className="filter-count">{getCount(label)}</span>
        </button>
      ))}
    </div>
  );
}
