"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import NewsCard, { NewsCardSkeleton } from "@/components/NewsCard";
import CategoryFilter from "@/components/CategoryFilter";
import { getNotas, getStats, type Nota } from "@/lib/supabase";

const POR_PAGINA = 12;

export default function HomePage() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [hayMas, setHayMas] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [buscandoInput, setBuscandoInput] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [stats, setStats] = useState<{ total: number; porCategoria: Record<string, number> }>({
    total: 0,
    porCategoria: {},
  });

  // Cargar stats una vez
  useEffect(() => {
    getStats().then(setStats);
  }, []);

  // Cargar notas cuando cambia filtro o búsqueda
  const cargarNotas = useCallback(
    async (reset = true) => {
      const paginaActual = reset ? 0 : pagina + 1;

      if (reset) {
        setLoading(true);
        setPagina(0);
      } else {
        setLoadingMore(true);
      }

      const { notas: nuevas, total: totalNuevo } = await getNotas(
        categoriaActiva,
        busqueda,
        paginaActual,
        POR_PAGINA
      );

      setTotal(totalNuevo);
      setNotas((prev) => (reset ? nuevas : [...prev, ...nuevas]));
      setHayMas((paginaActual + 1) * POR_PAGINA < totalNuevo);
      if (!reset) setPagina(paginaActual);

      setLoading(false);
      setLoadingMore(false);
    },
    [categoriaActiva, busqueda, pagina]
  );

  useEffect(() => {
    cargarNotas(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaActiva, busqueda]);

  // Debounce del buscador
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusqueda(buscandoInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [buscandoInput]);

  return (
    <>
      <Header totalNotas={stats.total} />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-eyebrow">
              <span>🔴</span> Archivo en vivo — actualización diaria automática
            </div>

            <h1 className="hero-title">
              Todo lo que <span>Adorni</span> dijo,<br />
              hizo y preferiría olvidar.
            </h1>

            <p className="hero-subtitle">
              Archivo periodístico independiente sobre Manuel Adorni, vocero 
              presidencial de Argentina. Conferencias, causas judiciales, 
              desaires y contradicciones. Curado con IA, para que no lo olvidemos.
            </p>

            {/* Buscador */}
            <div className="search-bar">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                id="search-input"
                type="search"
                className="search-input"
                placeholder="Buscá por tema, dicho o fecha…"
                value={buscandoInput}
                onChange={(e) => setBuscandoInput(e.target.value)}
                aria-label="Buscar notas en el archivo"
              />
            </div>
          </div>
        </section>

        {/* Filtros */}
        <div className="container">
          <CategoryFilter
            selected={categoriaActiva}
            onSelect={(cat) => {
              setCategoriaActiva(cat);
            }}
            counts={stats.porCategoria}
            total={stats.total}
          />

          {/* Resultado de búsqueda */}
          {busqueda && !loading && (
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                marginBottom: "1.25rem",
              }}
            >
              {total > 0
                ? `${total} resultado${total !== 1 ? "s" : ""} para "${busqueda}"`
                : `Sin resultados para "${busqueda}"`}
            </p>
          )}

          {/* Grid */}
          {loading ? (
            <div className="news-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : notas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🗃️</div>
              <h3>El archivo está vacío por ahora</h3>
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                {busqueda
                  ? "Probá con otra búsqueda."
                  : "El agente aún no indexó notas en esta categoría."}
              </p>
            </div>
          ) : (
            <>
              <div className="news-grid">
                {notas.map((nota, i) => (
                  <NewsCard key={nota.id} nota={nota} index={i} />
                ))}
              </div>

              {/* Cargar más */}
              {hayMas && (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <button
                    id="load-more-btn"
                    className="filter-btn"
                    style={{ padding: "0.7rem 2rem", fontSize: "0.9rem" }}
                    onClick={() => cargarNotas(false)}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Cargando…" : `Ver más notas`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            <strong>AdorniLeaks</strong> — Archivo periodístico independiente.
          </p>
          <p>
            Contenido curado automáticamente con IA (Groq/Llama 3.3) desde medios 
            argentinos públicos.
          </p>
          <p>
            Todo el crédito a los medios originales.{" "}
            <a
              href="https://github.com/tu-usuario/adorni-leaks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver código fuente
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
