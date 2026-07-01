"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getNotas, type Nota } from "@/lib/supabase";

interface NotaCqc {
  id: string | number;
  titulo: string;
  fecha: string;
  categoria: string;
  resumen: string;
  url: string;
  slug?: string;
}

// Fallback hardcoded notes requested by the user
const NOTAS_FALLBACK: NotaCqc[] = [
  {
    id: "f1",
    titulo: "La renuncia inesperada: 'Me voy a dormir en absoluta paz'",
    fecha: "2026-06-15",
    categoria: "Informe Central",
    resumen: "Análisis cronológico de las últimas horas de Manuel Adorni en la Jefatura de Gabinete y el impacto político de su salida.",
    url: "#",
  },
  {
    id: "f2",
    titulo: "El fiscal Pollicita avanza en la causa por presunto enriquecimiento",
    fecha: "2026-06-20",
    categoria: "CQTest",
    resumen: "Los detalles del expediente judicial que investiga los bienes y los viajes en avión privado durante su gestión.",
    url: "#",
  },
  {
    id: "f3",
    titulo: "Top 5: Las chicanas más virales desde el atril de Casa Rosada",
    fecha: "2026-05-10",
    categoria: "El Top Five",
    resumen: "Un repaso por los momentos donde el exvocero utilizó su característico latiguillo 'Fin' para cerrar debates con la prensa.",
    url: "#",
  },
  {
    id: "f4",
    titulo: "Cruce total con los acreditados por los datos de inflación",
    fecha: "2026-04-12",
    categoria: "¡Proteste Ya!",
    resumen: "Archivo audiovisual y transcripción de la tensa mañana donde la sala de prensa cuestionó los índices del INDEC.",
    url: "#",
  },
  {
    id: "f5",
    titulo: "De Vocero a Ministro: La meritocracia de los ascensos de rango",
    fecha: "2026-02-18",
    categoria: "Grandes Valores",
    resumen: "La reconstrucción de su meteórica carrera política dentro de la estructura de La Libertad Avanza.",
    url: "#",
  },
];

function mapNotaToCqc(nota: Nota): NotaCqc {
  // Map Supabase tags or category to CQC categories
  let cqcCat = "Informe Central";
  if (nota.tags?.includes("la-caida")) cqcCat = "Informe Central";
  else if (nota.tags?.includes("top-five")) cqcCat = "El Top Five";
  else if (nota.tags?.includes("proteste-ya")) cqcCat = "¡Proteste Ya!";
  else if (nota.tags?.includes("cqtest")) cqcCat = "CQTest";
  else if (nota.tags?.includes("grandes-valores")) cqcCat = "Grandes Valores";
  else {
    // Fallback based on raw database category
    if (nota.categoria === "Causas Judiciales") cqcCat = "CQTest";
    else if (nota.categoria === "Conferencias de Prensa" || nota.categoria === "Desaires") cqcCat = "¡Proteste Ya!";
    else if (nota.categoria === "Dichos Polémicos") cqcCat = "El Top Five";
    else if (nota.categoria === "Gobierno") cqcCat = "Grandes Valores";
  }

  return {
    id: nota.id,
    titulo: nota.titulo_ia,
    fecha: nota.fecha_publicacion.split("T")[0],
    categoria: cqcCat,
    resumen: nota.resumen_ia,
    url: nota.url,
    slug: nota.slug,
  };
}

export default function ArchivoAdorniPage() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltrada, setCategoriaFiltrada] = useState("Todas");
  const [notas, setNotas] = useState<NotaCqc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch up to 1000 notes from Supabase
    getNotas(undefined, undefined, 0, 1000)
      .then(({ notas: dbNotas }) => {
        if (dbNotas && dbNotas.length > 0) {
          const mapped = dbNotas.map(mapNotaToCqc);
          
          // Merge Supabase notes with fallback notes to ensure a rich list
          const combined = [...mapped];
          NOTAS_FALLBACK.forEach((fb) => {
            // Avoid duplicates
            if (!combined.some((n) => n.titulo === fb.titulo)) {
              combined.push(fb);
            }
          });

          setNotas(combined);
        } else {
          setNotas(NOTAS_FALLBACK);
        }
      })
      .catch((err) => {
        console.error("Error loading notes:", err);
        setNotas(NOTAS_FALLBACK);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter in real-time
  const notasFiltradas = notas.filter((nota) => {
    const coincideBusqueda =
      nota.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      nota.resumen.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaFiltrada === "Todas" || nota.categoria === categoriaFiltrada;
    return coincideBusqueda && coincideCategoria;
  });

  const categorias = [
    "Todas",
    "Informe Central",
    "El Top Five",
    "¡Proteste Ya!",
    "CQTest",
    "Grandes Valores",
  ];

  return (
    <>
      {/* BARRA DE ESTADO DEL ARCHIVO */}
      <div className="archive-status-bar">
        <div className="status-bar-left">
          <span className="status-dot"></span>
          <span>AGENTE IA: RECOPILACIÓN HISTÓRICA ACTIVA</span>
        </div>
        <div className="status-bar-right">
          [ ARCHIVO: {notasFiltradas.length} NOTAS ENCONTRADAS ]
        </div>
      </div>

      <Header totalNotas={notas.length} />

      <div className="archive-page-wrapper">
        <header className="archive-header container">
          <h1 className="archive-page-title">
            EL ARCHIVO <span className="text-neon-green">CLASIFICADO</span>
          </h1>
          <p className="archive-page-subtitle">
            Historial completo de crónicas, informes de auditoría, expedientes y recortes del ciclo político de Manuel Adorni, curado automáticamente bajo el filtro analítico de CQC.
          </p>
        </header>

        {/* SECCIÓN DE FILTROS Y BUSCADOR (Estilo Gafas de Sol CQC) */}
        <section className="archive-filters-section">
          <div className="container filters-container">
            {/* Buscador Gafas CQC */}
            <div className="gafas-search-wrapper">
              <div className="gafas-frame">
                <div className="gafas-lens left-lens">
                  <input
                    type="text"
                    placeholder="BUSCAR EN EL ARCHIVO SECRETO..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="gafas-input"
                    aria-label="Buscar en el archivo secreto"
                  />
                </div>
                <div className="gafas-bridge" />
                <div className="gafas-lens right-lens">
                  <span className="gafas-text-hint">CQC ARCHIVE</span>
                </div>
              </div>
            </div>

            {/* Chips de Categorías */}
            <div className="archive-category-chips">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoriaFiltrada(cat)}
                  className={`archive-chip-btn ${
                    categoriaFiltrada === cat ? "active" : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* GRILLA PRINCIPAL DE NOTAS */}
        <main className="container archive-main">
          {loading ? (
            <div className="archive-loading">
              <span className="loading-spinner">⚡</span>
              <p>CONSULTANDO DOCUMENTACIÓN SECRETA...</p>
            </div>
          ) : notasFiltradas.length === 0 ? (
            <div className="archive-empty">
              <p>[ SIN RESULTADOS PARA LA BÚSQUEDA ACTUAL ]</p>
            </div>
          ) : (
            <div className="archive-grid">
              {notasFiltradas.map((nota) => (
                <article key={nota.id} className="archive-card group">
                  <div className="archive-card-header">
                    <span className="archive-card-cat">{nota.categoria}</span>
                    <span className="archive-card-date">
                      {new Date(nota.fecha).toLocaleDateString("es-AR")}
                    </span>
                  </div>

                  <div className="archive-card-body">
                    <h2 className="archive-card-title">
                      {nota.slug ? (
                        <Link href={`/${nota.slug}`}>{nota.titulo}</Link>
                      ) : (
                        <a href={nota.url}>{nota.titulo}</a>
                      )}
                    </h2>
                    <p className="archive-card-desc">{nota.resumen}</p>
                  </div>

                  <div className="archive-card-footer">
                    {nota.slug ? (
                      <Link href={`/${nota.slug}`} className="archive-card-btn">
                        Ver Crónica IA <span>→</span>
                      </Link>
                    ) : (
                      <a
                        href={nota.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="archive-card-btn"
                      >
                        Abrir Fuente Original <span>→</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
