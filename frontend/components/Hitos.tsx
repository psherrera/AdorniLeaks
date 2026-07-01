"use client";

// ── Casos emblemáticos del archivo ────────────────────────────────
// Agregá o editá los hitos acá manualmente

interface Hito {
  año: number;
  titulo: string;
  descripcion: string;
  url: string;
  categoria: string;
  emoji: string;
  impacto: "alto" | "medio";
}

const HITOS: Hito[] = [
  // ── 2025 ──────────────────────────────────────────────
  {
    año: 2025,
    titulo: "La tarjeta ajena: Adorni usó la tarjeta de una empleada para compras personales",
    descripcion:
      "Una funcionaria de la Casa Rosada prestó su tarjeta de crédito al entonces jefe de Gabinete para gastos personales que incluían un Smart TV. La causa derivó en una investigación judicial por enriquecimiento ilícito y terminó con su renuncia.",
    url: "https://www.lanacion.com.ar/politica/la-empleada-de-la-casa-rosada-que-le-presto-su-tarjeta-a-adorni-declaro-que-el-tambien-intento-nid30062026/",
    categoria: "Causas Judiciales",
    emoji: "💳",
    impacto: "alto",
  },
  {
    año: 2025,
    titulo: "El WSJ advierte: el caso Adorni podría costarle el apoyo de Trump a Milei",
    descripcion:
      "The Wall Street Journal analizó el escándalo de enriquecimiento ilícito de Adorni y señaló que podría afectar la relación del gobierno de Milei con la administración Trump, en un momento clave para la agenda económica argentina.",
    url: "https://www.lanacion.com.ar/politica/the-wall-street-journal-publico-una-nota-que-analiza-el-caso-adorni-y-advierte-que-trump-podria-nid30062026/",
    categoria: "Causas Judiciales",
    emoji: "🌎",
    impacto: "alto",
  },
  {
    año: 2025,
    titulo: '"Figura devaluada": el más corto de los jefes de Gabinete',
    descripcion:
      "Solo Posse duró menos que Adorni en el cargo. Asumió como jefe de Gabinete en medio del escándalo de las pensiones por discapacidad y cayó por el escándalo de la tarjeta de crédito. Un ciclo de apenas meses que lo dejó como una figura políticamente quemada.",
    url: "https://www.lanacion.com.ar/politica/figura-devaluada-solo-posse-duro-menos-que-adorni-y-milei-ya-es-el-presidente-que-mas-jefes-de-nid30062026/",
    categoria: "Gobierno",
    emoji: "📉",
    impacto: "alto",
  },

  // ── 2024 ──────────────────────────────────────────────
  {
    año: 2024,
    titulo: "El desaire a las personas con discapacidad: recortaron las pensiones sin aviso",
    descripcion:
      "El gobierno de Milei, con Adorni como vocero, anunció el recorte masivo de pensiones por discapacidad a través de un comunicado frío y sin diálogo con los afectados. Adorni defendió la medida en conferencia de prensa con un tono que fue calificado de insensible por organismos de DDHH.",
    url: "https://www.pagina12.com.ar/",
    categoria: "Desaires",
    emoji: "♿",
    impacto: "alto",
  },
  {
    año: 2024,
    titulo: 'La "radiografía del perro": el escándalo del gasto inexplicable',
    descripcion:
      "Entre los gastos cuestionados del entorno de Adorni apareció una radiografía veterinaria cargada como gasto de representación del Estado. El caso se volvió viral y se convirtió en símbolo del despilfarro del área de comunicación presidencial.",
    url: "https://www.infobae.com/",
    categoria: "Causas Judiciales",
    emoji: "🐕",
    impacto: "alto",
  },
  {
    año: 2024,
    titulo: "Adorni llamó a una periodista \"ridícula\" en plena conferencia de prensa",
    descripcion:
      "Durante una conferencia de prensa en Casa Rosada, Adorni respondió de manera despectiva a una periodista que insistió en una pregunta incómoda sobre el ajuste en educación. La escena fue registrada y se viralizó, generando un rechazo generalizado.",
    url: "https://www.infobae.com/",
    categoria: "Desaires",
    emoji: "🎙️",
    impacto: "medio",
  },

  // ── 2023 ──────────────────────────────────────────────
  {
    año: 2023,
    titulo: 'De vocero de campaña a vocero presidencial: el ascenso de "el portavoz"',
    descripcion:
      "Manuel Adorni era prácticamente desconocido antes de la campaña de Milei. Economista liberal, se convirtió en la cara visible de la comunicación del candidato y luego del gobierno. Su estilo confrontativo y sus conferencias de prensa diarias lo hicieron famoso — y polémico.",
    url: "https://www.infobae.com/",
    categoria: "Gobierno",
    emoji: "📢",
    impacto: "medio",
  },
];

// ── Helpers ──────────────────────────────────────────────────────

function getCategoryClass(categoria: string): string {
  const map: Record<string, string> = {
    "Causas Judiciales": "cat-causas-judiciales",
    Desaires: "cat-desaires",
    "Dichos Polémicos": "cat-dichos-polemicos",
    Gobierno: "cat-gobierno",
  };
  return map[categoria] || "cat-sin-categoria";
}

const AÑOS = [...new Set(HITOS.map((h) => h.año))].sort((a, b) => b - a);

export default function Hitos() {
  return (
    <section className="hitos-section">
      <div className="hitos-header">
        <h2 className="hitos-title">
          🗂️ Casos emblemáticos del archivo
        </h2>
        <p className="hitos-subtitle">
          Los momentos que no podemos dejar que se olviden
        </p>
      </div>

      {AÑOS.map((año) => (
        <div key={año} className="hitos-año-grupo">
          <div className="hitos-año-label">{año}</div>
          <div className="hitos-grid">
            {HITOS.filter((h) => h.año === año).map((hito, i) => (
              <a
                key={i}
                href={hito.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hito-card ${hito.impacto === "alto" ? "hito-alto" : ""}`}
                id={`hito-${año}-${i}`}
              >
                <div className="hito-emoji">{hito.emoji}</div>
                <div className="hito-content">
                  <div className={`category-badge ${getCategoryClass(hito.categoria)}`} style={{ marginBottom: "0.5rem", fontSize: "0.65rem" }}>
                    {hito.categoria}
                  </div>
                  <h3 className="hito-titulo">{hito.titulo}</h3>
                  <p className="hito-desc">{hito.descripcion}</p>
                </div>
                <div className="hito-arrow">↗</div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
