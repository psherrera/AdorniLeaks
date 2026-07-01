"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import NewsCard, { NewsCardSkeleton } from "@/components/NewsCard";
import CategoryFilter from "@/components/CategoryFilter";
import Hitos from "@/components/Hitos";
import LineaTiempo from "@/components/LineaTiempo";
import { getNotas, getStats, type Nota } from "@/lib/supabase";

const POR_PAGINA = 13; // 1 destacado + 12 secundarios en la primera página

export default function HomePage() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const paginaRef = useRef(0);
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
  // Usamos useRef para pagina para evitar que el cambio de página
  // recree cargarNotas y dispare el useEffect de filtros en cascada.
  const cargarNotas = useCallback(
    async (reset = true) => {
      const paginaActual = reset ? 0 : paginaRef.current + 1;

      if (reset) {
        setLoading(true);
        paginaRef.current = 0;
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
      if (!reset) paginaRef.current = paginaActual;

      setLoading(false);
      setLoadingMore(false);
    },
    [categoriaActiva, busqueda]
  );

  useEffect(() => {
    cargarNotas(true);
  }, [categoriaActiva, busqueda, cargarNotas]);

  // Debounce del buscador
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusqueda(buscandoInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [buscandoInput]);

  // Separación del Informe Central:
  // solo en la primera página, sin búsqueda activa y sin filtro de categoría
  const mostrarDestacado =
    paginaRef.current === 0 &&
    notas.length > 0 &&
    !busqueda &&
    categoriaActiva === "Todas";
  const notaPrincipal = mostrarDestacado ? notas[0] : null;
  const notasSecundarias = mostrarDestacado ? notas.slice(1) : notas;

  return (
    <>
      <Header totalNotas={stats.total} />

      <main>
        {/* Hero CQC */}
        <section className="hero">
          <div className="container">
            <div className="hero-eyebrow">
              <span>⚡</span> CONTRALOR DE LA VERDAD OFICIAL
            </div>

            <h1 className="hero-title">
              ADORNI <span>LEAKS</span>
            </h1>

            <p className="hero-subtitle">
              El archivo implacable del paso de Manuel Adorni por el gobierno.
              Dichos, contradicciones y expedientes bajo lupa.
            </p>

            {/* Buscador CQC */}
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
                placeholder="BUSCAR CRÓNICA O EXPEDIENTE..."
                value={buscandoInput}
                onChange={(e) => setBuscandoInput(e.target.value)}
                aria-label="Buscar notas en el archivo"
              />
            </div>
          </div>
        </section>

        {/* Filtros CQC */}
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
                fontSize: "0.75rem",
                color: "var(--green)",
                textTransform: "uppercase",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                marginBottom: "1.5rem",
                letterSpacing: "0.05em",
              }}
            >
              {total > 0
                ? `${total} crónica${total !== 1 ? "s" : ""} encontrada${total !== 1 ? "s" : ""} para "${busqueda}"`
                : `Sin resultados para "${busqueda}"`}
            </p>
          )}

          {/* Grid o Contenido */}
          {loading ? (
            <div className="news-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : notas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🗃️</div>
              <h3>Archivo despejado</h3>
              <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "var(--text-muted)" }}>
                {busqueda
                  ? "Probá con otros términos de búsqueda."
                  : "No se encontraron crónicas en esta sección."}
              </p>
            </div>
          ) : (
            <>
              {/* INFORME CENTRAL */}
              {notaPrincipal && (
                <a
                  href={notaPrincipal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="informe-central"
                  id={`card-featured-${notaPrincipal.id}`}
                >
                  <span className="informe-label">Informe Central</span>
                  <h2 className="informe-titulo">{notaPrincipal.titulo_ia}</h2>
                  <p className="informe-resumen">
                    {notaPrincipal.resumen_ia ? notaPrincipal.resumen_ia.split("\n")[0] : ""}
                  </p>
                  <div className="informe-meta">
                    <span>📅 {new Date(notaPrincipal.fecha_publicacion).toLocaleDateString("es-AR")}</span>
                    <span>•</span>
                    <span className="informe-cat">{notaPrincipal.categoria}</span>
                    <span>•</span>
                    <span>{notaPrincipal.fuente}</span>
                    <span className="informe-leer">Leer Informe Completo ↗</span>
                  </div>
                </a>
              )}

              {/* CRÓNICAS INDEXADAS (GRID SECUNDARIO) */}
              <div className="section-header">
                <span className="section-label">Crónicas Indexadas</span>
                <span className="section-count">{notasSecundarias.length} notas exhibidas</span>
              </div>

              <div className="news-grid">
                {notasSecundarias.map((nota, i) => (
                  <NewsCard key={nota.id} nota={nota} index={i} />
                ))}
              </div>

              {/* Cargar más */}
              {hayMas && (
                <div style={{ textAlign: "center", padding: "3rem 0" }}>
                  <button
                    id="load-more-btn"
                    className="load-more-btn"
                    onClick={() => cargarNotas(false)}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Solicitando..." : "Desplegar Más Crónicas"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Hitos del archivo */}
        <div className="container">
          <Hitos />
        </div>

        {/* Trayectoria y Línea de Tiempo */}
        <div className="container">
          <LineaTiempo />
        </div>
      </main>

      <footer className="footer" style={{ paddingBottom: "calc(64px + 1.5rem)" }}>
        <div className="container">
          <p>
            <strong>AdorniLeaks</strong> — Archivo no oficial de contralor periodístico.
          </p>
          <p>
            Contenido filtrado, evaluado y redactado mediante IA bajo supervisión de código abierto.
          </p>
          <p>
            Todos los derechos reservados a los respectivos cronistas originales.{" "}
            <a
              href="https://github.com/psherrera/AdorniLeaks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Repositorio
            </a>{" "}
            |{" "}
            <a
              href="https://youtu.be/-ibOErExfKQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Créditos de Música de Fondo
            </a>
          </p>
        </div>
      </footer>

      {/* Barra de navegación inferior (solo mobile) */}
      <nav className="mobile-bottom-nav" aria-label="Navegación principal mobile">
        <Link href="/" className="mobile-bottom-nav-item" id="mobile-nav-home">
          <span className="mobile-bottom-nav-icon">🗃️</span>
          <span>Archivo</span>
        </Link>
        <Link href="/especial" className="mobile-bottom-nav-item" id="mobile-nav-especial">
          <span className="mobile-bottom-nav-icon">📺</span>
          <span>El Ciclo</span>
        </Link>
        <Link href="/archivo" className="mobile-bottom-nav-item" id="mobile-nav-clasificado">
          <span className="mobile-bottom-nav-icon">🔍</span>
          <span>Clasificado</span>
        </Link>
      </nav>
    </>
  );
}
