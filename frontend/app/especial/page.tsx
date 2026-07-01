"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getStats } from "@/lib/supabase";

type Seccion = "caida" | "topfive" | "protesteya" | "cqtest" | "ascensos";

export default function EspecialPage() {
  const [seccionActiva, setSeccionActiva] = useState<Seccion>("caida");
  const [totalNotas, setTotalNotas] = useState(0);
  const [topFiveExpandido, setTopFiveExpandido] = useState<Record<number, boolean>>({});
  const [cruceActivo, setCruceActivo] = useState<number>(0);
  const [ladderStep, setLadderStep] = useState<number>(0);

  useEffect(() => {
    getStats().then((stats) => setTotalNotas(stats.total));
  }, []);

  const toggleTopFive = (num: number) => {
    setTopFiveExpandido((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  return (
    <>
      <Header totalNotas={totalNotas} />

      <main className="especial-container">
        {/* Banner de Cabecera Especial */}
        <section className="especial-hero">
          <div className="crt-overlay" />
          <div className="container">
            <span className="especial-eyebrow">📺 ARCHIVO EXCLUSIVO CAIGA QUIEN CAIGA</span>
            <h1 className="especial-main-title">
              EL CICLO <span>ADORNI</span>
            </h1>
            <p className="especial-subtitle">
              Crónica ácida del tuitero que se convirtió en Ministro Coordinador y terminó acorralado por los expedientes. Diciembre 2023 - Junio 2026.
            </p>
          </div>
        </section>

        {/* Navegación Brutalista de Secciones */}
        <div className="container">
          <div className="especial-nav-brutal">
            <button
              onClick={() => setSeccionActiva("caida")}
              className={`nav-brutal-btn ${seccionActiva === "caida" ? "active" : ""}`}
            >
              <span className="btn-num">1</span> Informe Central: La Caída
            </button>
            <button
              onClick={() => setSeccionActiva("topfive")}
              className={`nav-brutal-btn ${seccionActiva === "topfive" ? "active" : ""}`}
            >
              <span className="btn-num">2</span> El Top Five
            </button>
            <button
              onClick={() => setSeccionActiva("protesteya")}
              className={`nav-brutal-btn ${seccionActiva === "protesteya" ? "active" : ""}`}
            >
              <span className="btn-num">3</span> ¡Proteste Ya!
            </button>
            <button
              onClick={() => setSeccionActiva("cqtest")}
              className={`nav-brutal-btn ${seccionActiva === "cqtest" ? "active" : ""}`}
            >
              <span className="btn-num">4</span> CQTest: Los Números
            </button>
            <button
              onClick={() => setSeccionActiva("ascensos")}
              className={`nav-brutal-btn ${seccionActiva === "ascensos" ? "active" : ""}`}
            >
              <span className="btn-num">5</span> Grandes Valores
            </button>
          </div>

          {/* ──────────────────────────────────────────────────────── */}
          {/* SECCIÓN 1: INFORME CENTRAL - LA CAÍDA */}
          {seccionActiva === "caida" && (
            <div className="especial-content-box animated-fade">
              <div className="box-header green-border">
                <h2>INFORME CENTRAL: LA CAÍDA (Fin de Ciclo)</h2>
                <span className="badge-cqc red">CRÍTICO</span>
              </div>
              <div className="box-body">
                <div className="editorial-lead">
                  <p>
                    <strong>La Jefatura de Gabinete de Manuel Adorni terminó como empezó:</strong> en absoluta orfandad política y rodeada de expedientes judiciales que asustarían a cualquier tuitero de bien. En apenas siete meses como Ministro Coordinador tras reemplazar a Guillermo Francos, el hombre del <em>"Fin."</em> demostró que la meritocracia libertaria consistía en escalar de rango salarial mientras los números del Estado se desplomaban.
                  </p>
                  <p>
                    El golpe definitivo no provino de la oposición, sino de la propia interna de la Casa Rosada y de una tarjeta de crédito. La declaración testimonial de una funcionaria que admitió haberle facilitado su plástico a Adorni para compras personales (incluyendo electrodomésticos suntuosos y un Smart TV) selló su suerte ante la mirada del juez Ariel Lijo y el fiscal Gerardo Pollicita.
                  </p>
                </div>

                <div className="two-columns">
                  {/* Cronología del Desgaste */}
                  <div className="timeline-desgaste">
                    <h3>📁 Hitos Judiciales y de Gestión</h3>
                    <div className="desgaste-item">
                      <div className="desgaste-date">26 de Junio 2026</div>
                      <h4>Renuncia vía X: "Me voy a dormir en absoluta paz"</h4>
                      <p>
                        Cercado por el avance judicial, Adorni publica su renuncia en redes sociales alegando "paz interior" mientras los tribunales federales de Comodoro Py preparaban requerimientos de información.
                      </p>
                      <Link href="/la-tarjeta-ajena-la-empleada-de-la-casa-rosada-declaro-que" className="link-documento">
                        Leer Nota de Archivo ➔
                      </Link>
                    </div>

                    <div className="desgaste-item">
                      <div className="desgaste-date">Mediados de 2026</div>
                      <h4>El WSJ advierte el enojo de Donald Trump</h4>
                      <p>
                        El Wall Street Journal publica que las causas por enriquecimiento ilícito de Adorni y sus 19 viajes en aviones privados dañan la credibilidad fiscal ante la administración republicana.
                      </p>
                      <Link href="/the-wall-street-journal-advierte-que-el-escandalo-adorni" className="link-documento">
                        Leer Documento WSJ ➔
                      </Link>
                    </div>

                    <div className="desgaste-item">
                      <div className="desgaste-date">Noviembre 2025</div>
                      <h4>Ascenso a Ministro Coordinador</h4>
                      <p>
                        Tras la caída de Francos, asume la Jefatura de Gabinete concentrando la pauta publicitaria oficial y el organigrama de secretarías.
                      </p>
                      <Link href="/figura-devaluada-adorni-entra-en-la-lista-de-los-jefes" className="link-documento">
                        Leer Análisis Político ➔
                      </Link>
                    </div>
                  </div>

                  {/* Ficha del Expediente */}
                  <div className="expediente-card">
                    <div className="expediente-header">
                      <h3>⚖️ EXPEDIENTE PENAL N° 4812/2026</h3>
                      <span>ESTADO: INVESTIGACIÓN ABIERTA</span>
                    </div>
                    <table className="expediente-table">
                      <tbody>
                        <tr>
                          <td><strong>Tribunal:</strong></td>
                          <td>Juzgado Criminal y Correccional Federal N° 4</td>
                        </tr>
                        <tr>
                          <td><strong>Juez:</strong></td>
                          <td>Ariel Lijo</td>
                        </tr>
                        <tr>
                          <td><strong>Fiscal:</strong></td>
                          <td>Gerardo Pollicita</td>
                        </tr>
                        <tr>
                          <td><strong>Imputados:</strong></td>
                          <td>Manuel Adorni, Francisco Adorni y otros.</td>
                        </tr>
                        <tr>
                          <td><strong>Carátula:</strong></td>
                          <td>Enriquecimiento Ilícito, Malversación de Caudales Públicos y Dádivas.</td>
                        </tr>
                        <tr>
                          <td><strong>Foco Principal:</strong></td>
                          <td>
                            - Compra de bienes con tarjeta de crédito de empleados públicos.<br />
                            - Contratación de 19 vuelos privados sin justificación oficial.<br />
                            - Multiplicación de su patrimonio declarado en 250% desde 2023.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="expediente-footer">
                      <span>CQC Verdict: <strong>"Del atril a Comodoro Py hay una sola firma de distancia"</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* SECCIÓN 2: EL TOP FIVE - FIN DEL COMUNICADO */}
          {seccionActiva === "topfive" && (
            <div className="especial-content-box animated-fade">
              <div className="box-header yellow-border">
                <h2>EL TOP FIVE: "FIN DEL COMUNICADO"</h2>
                <span className="badge-cqc yellow">RANKING</span>
              </div>
              <div className="box-body">
                <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                  Los 5 momentos más memorables, insólitos e irreverentes de la era de vocería y jefatura de Manuel Adorni. Hacé clic en cada puesto para desplegar el archivo de video.
                </p>

                <div className="topfive-list">
                  {/* Puesto 5 */}
                  <div className={`topfive-card ${topFiveExpandido[5] ? "expanded" : ""}`}>
                    <div className="topfive-trigger" onClick={() => toggleTopFive(5)}>
                      <div className="topfive-number">5</div>
                      <div className="topfive-title-area">
                        <h3>El Ninguneo a Maradona ("Día del Zurdo")</h3>
                        <span className="topfive-tag">Desaires</span>
                      </div>
                      <span className="expand-arrow">{topFiveExpandido[5] ? "▲" : "▼"}</span>
                    </div>
                    {topFiveExpandido[5] && (
                      <div className="topfive-details animated-slide">
                        <div className="topfive-media-mock">
                          <div className="tv-static-effect" />
                          <span>📺 VIDEO PLAYBACK MOCK // SALÓN HÉROES DE MALVINAS</span>
                        </div>
                        <p>
                          <strong>La Chicana:</strong> En el Día Internacional del Zurdo de 2024, Adorni saludó a deportistas zurdos como Messi, Vilas y Ginóbili. Cuando los periodistas le recordaron a Diego Armando Maradona, respondió con su icónico: <em>"¿Quién? Ah, sí, Maradona... también era zurdo. Bueno, nada, sigo..."</em>.
                        </p>
                        <p>
                          <strong>El Vuelto:</strong> Dalma Maradona le contestó: <em>"Es el muppet de turno que tiene que salir a hablar por los demás"</em>. Las redes sociales estallaron contra la vocería por politizar incluso los íconos populares.
                        </p>
                        <Link href="/adorni-ningunea-a-maradona-en-el-dia-del-zurdo-desde-el" className="link-topfive-nota">
                          Ver archivo completo ➔
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Puesto 4 */}
                  <div className={`topfive-card ${topFiveExpandido[4] ? "expanded" : ""}`}>
                    <div className="topfive-trigger" onClick={() => toggleTopFive(4)}>
                      <div className="topfive-number">4</div>
                      <div className="topfive-title-area">
                        <h3>La Radiografía del Perro y la Cantidad de Canes</h3>
                        <span className="topfive-tag">Dichos Polémicos</span>
                      </div>
                      <span className="expand-arrow">{topFiveExpandido[4] ? "▲" : "▼"}</span>
                    </div>
                    {topFiveExpandido[4] && (
                      <div className="topfive-details animated-slide">
                        <div className="topfive-media-mock">
                          <div className="tv-static-effect" />
                          <span>📺 VIDEO PLAYBACK MOCK // ATRIL PRESIDENCIAL</span>
                        </div>
                        <p>
                          <strong>La Chicana:</strong> Adorni tildó de "falta de respeto" las preguntas de periodistas acreditados sobre el número real de perros de Javier Milei. Paralelamente, se filtró una radiografía canina cargada como gasto de representación oficial del área de comunicación.
                        </p>
                        <p>
                          <strong>El Vuelto:</strong> El debate público se debatió semanas entre el misterio existencial canino de Olivos y el absurdo administrativo de financiar tratamientos veterinarios de mascotas presidenciales con dinero fiscal.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Puesto 3 */}
                  <div className={`topfive-card ${topFiveExpandido[3] ? "expanded" : ""}`}>
                    <div className="topfive-trigger" onClick={() => toggleTopFive(3)}>
                      <div className="topfive-number">3</div>
                      <div className="topfive-title-area">
                        <h3>La Tarjeta Solidaria de la Empleada</h3>
                        <span className="topfive-tag">Causas Judiciales</span>
                      </div>
                      <span className="expand-arrow">{topFiveExpandido[3] ? "▲" : "▼"}</span>
                    </div>
                    {topFiveExpandido[3] && (
                      <div className="topfive-details animated-slide">
                        <div className="topfive-media-mock">
                          <div className="tv-static-effect" />
                          <span>📺 VIDEO PLAYBACK MOCK // COMODORO PY TESTIMONIO</span>
                        </div>
                        <p>
                          <strong>La Chicana:</strong> La insólita triangulación donde el flamante Jefe de Gabinete usaba la tarjeta de crédito de una empleada jerárquica de Casa Rosada para financiar consumos personales (compras en plataformas y electrodomésticos).
                        </p>
                        <p>
                          <strong>El Vuelto:</strong> La empleada declaró bajo juramento que el propio Adorni le pidió "aguantarle" los saldos. La contradicción de la "lucha contra los privilegios políticos" alcanzó su punto de mayor ridículo.
                        </p>
                        <Link href="/la-tarjeta-ajena-la-empleada-de-la-casa-rosada-declaro-que" className="link-topfive-nota">
                          Ver expediente de tarjeta ➔
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Puesto 2 */}
                  <div className={`topfive-card ${topFiveExpandido[2] ? "expanded" : ""}`}>
                    <div className="topfive-trigger" onClick={() => toggleTopFive(2)}>
                      <div className="topfive-number">2</div>
                      <div className="topfive-title-area">
                        <h3>"Ahorré en negro durante 25 años"</h3>
                        <span className="topfive-tag">Dichos Polémicos</span>
                      </div>
                      <span className="expand-arrow">{topFiveExpandido[2] ? "▲" : "▼"}</span>
                    </div>
                    {topFiveExpandido[2] && (
                      <div className="topfive-details animated-slide">
                        <div className="topfive-media-mock">
                          <div className="tv-static-effect" />
                          <span>📺 VIDEO PLAYBACK MOCK // ENTREVISTA TN</span>
                        </div>
                        <p>
                          <strong>La Chicana:</strong> Durante un reportaje en vivo, para justificar su patrimonio en dólares y criptomonedas frente al escrutinio del fisco, Adorni admitió con total naturalidad: <em>"Yo ahorré 25 años de mi vida en negro"</em>.
                        </p>
                        <p>
                          <strong>El Vuelto:</strong> Un sincericidio absoluto. El vocero del Estado que impone multas y recortes tributarios, admitiendo la evasión sistemática ante las cámaras de televisión nacional.
                        </p>
                        <Link href="/adorni-confiesa-en-television-que-ahorro-en-negro-durante" className="link-topfive-nota">
                          Ver sincericidio completo ➔
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Puesto 1 */}
                  <div className={`topfive-card ${topFiveExpandido[1] ? "expanded" : ""}`}>
                    <div className="topfive-trigger" onClick={() => toggleTopFive(1)}>
                      <div className="topfive-number">1</div>
                      <div className="topfive-title-area">
                        <h3>"Me voy a dormir en absoluta paz" (El Adiós)</h3>
                        <span className="topfive-tag">La Caída</span>
                      </div>
                      <span className="expand-arrow">{topFiveExpandido[1] ? "▲" : "▼"}</span>
                    </div>
                    {topFiveExpandido[1] && (
                      <div className="topfive-details animated-slide">
                        <div className="topfive-media-mock">
                          <div className="tv-static-effect" />
                          <span>📺 VIDEO PLAYBACK MOCK // RED X POST REEL</span>
                        </div>
                        <p>
                          <strong>La Chicana:</strong> En la medianoche del escándalo de la tarjeta, acosado por citaciones de Lijo y Pollicita, publica en X: <em>"Presenté mi renuncia. Me voy a dormir en absoluta paz."</em>.
                        </p>
                        <p>
                          <strong>El Vuelto:</strong> El broche de oro del cinismo digital. Cierra su etapa pública durmiendo en paz, pero con un expediente penal abierto que promete despertarlo temprano por los próximos años.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* SECCIÓN 3: ¡PROTESTE YA! - LA GRIETA DE LA SALA DE PRENSA */}
          {seccionActiva === "protesteya" && (
            <div className="especial-content-box animated-fade">
              <div className="box-header cyan-border">
                <h2>¡PROTESTE YA!: LA GRIETA EN BALCARCE 50</h2>
                <span className="badge-cqc cyan">CRUCES DE SALA</span>
              </div>
              <div className="box-body">
                <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem" }}>
                  Las mañanas en Casa Rosada no eran para debatir políticas, sino para batirse a esgrima verbal. Seleccioná el round para leer la transcripción oculta del micrófono de CQC:
                </p>

                <div className="proteste-layout">
                  {/* Selector de Rounds */}
                  <div className="rounds-nav">
                    <button
                      onClick={() => setCruceActivo(0)}
                      className={`round-btn ${cruceActivo === 0 ? "active" : ""}`}
                    >
                      Round 1: Adorni vs. Fabián Waldman
                    </button>
                    <button
                      onClick={() => setCruceActivo(1)}
                      className={`round-btn ${cruceActivo === 1 ? "active" : ""}`}
                    >
                      Round 2: Adorni vs. Silvia Mercado
                    </button>
                    <button
                      onClick={() => setCruceActivo(2)}
                      className={`round-btn ${cruceActivo === 2 ? "active" : ""}`}
                    >
                      Round 3: Adorni vs. Cronista por Pensiones
                    </button>
                  </div>

                  {/* Transcripción del Round */}
                  <div className="cruce-dialog-box">
                    {cruceActivo === 0 && (
                      <div className="dialog-content animated-fade">
                        <div className="dialog-meta">
                          <span>TEMA: Parálisis de la Obra Pública y Despidos</span>
                          <span>FECHA: Abril 2024</span>
                        </div>
                        <div className="dialog-lines">
                          <div className="line journalist">
                            <span className="speaker">Fabián Waldman (La Patriada):</span>
                            <p>
                              "Vocero, buenos días. Quería consultarle sobre los más de 50.000 trabajadores despedidos de la construcción tras la suspensión total de la obra pública a nivel federal... ¿Qué respuesta social le da el gobierno?"
                            </p>
                          </div>
                          <div className="line adorni">
                            <span className="speaker">Manuel Adorni:</span>
                            <p>
                              "A ver Fabián, me resulta llamativa tu preocupación tardía. La obra pública como se conoció en el kirchnerismo no existe más. Era una máquina de robar. Los obreros despedidos son ajustes lógicos del sector privado. El mercado reasigna los recursos de forma eficiente..."
                            </p>
                          </div>
                          <div className="line journalist">
                            <span className="speaker">Fabián Waldman:</span>
                            <p>
                              "¿Pero no le preocupa al gobierno que esas familias queden sin ingresos en el invierno?"
                            </p>
                          </div>
                          <div className="line adorni">
                            <span className="speaker">Manuel Adorni:</span>
                            <p>
                              "Lo que nos preocupa es que siga habiendo inflación que empobrezca a 46 millones de argentinos. Si querés discutir estadísticas o sentimientos, te sugiero un café. Siguiente pregunta. Fin."
                            </p>
                          </div>
                        </div>
                        <div className="cqc-verdict-banner">
                          <span>CQC Fallo: <strong>Adorni descalifica al emisor para no discutir la desocupación. Clásico recurso de tuitero con rango de Secretario de Estado.</strong></span>
                        </div>
                        <Link href="/tenso-cruce-entre-adorni-y-fabian-waldman-por-la-paralisi" className="link-cruce-nota">
                          Ver nota relacionada en archivo ➔
                        </Link>
                      </div>
                    )}

                    {cruceActivo === 1 && (
                      <div className="dialog-content animated-fade">
                        <div className="dialog-meta">
                          <span>TEMA: El número de perros y el libre acceso a la información</span>
                          <span>FECHA: Mayo 2024</span>
                        </div>
                        <div className="dialog-lines">
                          <div className="line journalist">
                            <span className="speaker">Silvia Mercado:</span>
                            <p>
                              "Vocero, disculpe que insista con un tema que el presidente considera íntimo, pero es una cuestión de interés público debido a que los perros viven en una propiedad del Estado financiada por todos..."
                            </p>
                          </div>
                          <div className="line adorni">
                            <span className="speaker">Manuel Adorni:</span>
                            <p>
                              "Silvia, meterse con la vida familiar del presidente y el número de perros que tiene o deja de tener me parece de un nivel de periodismo bajísimo y ridículo. Los perros de Javier Milei son su familia y punto."
                            </p>
                          </div>
                          <div className="line journalist">
                            <span className="speaker">Silvia Mercado:</span>
                            <p>
                              "Pero es el presidente quien los nombra en discursos públicos oficiales y agradece sus consejos..."
                            </p>
                          </div>
                          <div className="line adorni">
                            <span className="speaker">Manuel Adorni:</span>
                            <p>
                              "Agradece a quien quiere. Es una falta de respeto tu pregunta. Si querés te doy el número del veterinario de Olivos, aunque no creo que te interese la radiografía del perro. Otra pregunta."
                            </p>
                          </div>
                        </div>
                        <div className="cqc-verdict-banner">
                          <span>CQC Fallo: <strong>Se apela a la sacralidad familiar para proteger un mito político. La evasión se disfraza de ofensa ética.</strong></span>
                        </div>
                      </div>
                    )}

                    {cruceActivo === 2 && (
                      <div className="dialog-content animated-fade">
                        <div className="dialog-meta">
                          <span>TEMA: Suspensión de Pensiones por Discapacidad (ANDIS)</span>
                          <span>FECHA: Septiembre 2024</span>
                        </div>
                        <div className="dialog-lines">
                          <div className="line journalist">
                            <span className="speaker">Periodista Acreditada:</span>
                            <p>
                              "Vocero, diversas organizaciones de derechos humanos denunciaron recortes brutales e inesperados en las pensiones por discapacidad, afectando a pacientes oncológicos y niños con enfermedades raras. ¿Cómo justifica el recorte?"
                            </p>
                          </div>
                          <div className="line adorni">
                            <span className="speaker">Manuel Adorni:</span>
                            <p>
                              "Ningún recorte es brutal cuando se busca la transparencia. Encontramos pensiones otorgadas de forma fraudulenta: personas que declaraban discapacidad con radiografías de perros o diagnósticos truchos firmados por médicos fantasmas..."
                            </p>
                          </div>
                          <div className="line journalist">
                            <span className="speaker">Periodista Acreditada:</span>
                            <p>
                              "¿Pero mientras tanto se suspenden los tratamientos a quienes sí lo necesitan de verdad?"
                            </p>
                          </div>
                          <div className="line adorni">
                            <span className="speaker">Manuel Adorni:</span>
                            <p>
                              "La prioridad del Estado es erradicar el curro. Al que es discapacitado de verdad se le va a auditar y mantener. Al que vivía del curro de la política, se le terminó. Es bastante sencillo de entender. Fin."
                            </p>
                          </div>
                        </div>
                        <div className="cqc-verdict-banner">
                          <span>CQC Fallo: <strong>Utilizar la anécdota ridícula ("radiografía de perro") como escudo argumentativo para justificar una parálisis de asistencia social generalizada.</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* SECCIÓN 4: CQTEST - LOS NÚMEROS DEL VOCERO */}
          {seccionActiva === "cqtest" && (
            <div className="especial-content-box animated-fade">
              <div className="box-header purple-border">
                <h2>CQTEST: ARCHIVO VS. REALIDAD (Los Números)</h2>
                <span className="badge-cqc purple">EXAMEN</span>
              </div>
              <div className="box-body">
                <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                  Bajo la lupa de CQC. Confrontamos las frases textuales pronunciadas por Manuel Adorni desde el atril de Balcarce 50 con los datos duros provistos por el INDEC, las auditorías estatales y los expedientes judiciales.
                </p>

                <div className="table-wrapper">
                  <table className="cqtest-table">
                    <thead>
                      <tr>
                        <th>Dicho de Adorni / Promesa Oficial</th>
                        <th>Realidad Documental / Números INDEC</th>
                        <th>Veredicto de CQC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="dicho-col">
                          "La inflación está pulverizada. El poder adquisitivo de los salarios formales ya le está ganando por goleada a la inflación."
                          <span className="dicho-date">(Marzo 2024 - Atril Oficial)</span>
                        </td>
                        <td className="realidad-col">
                          El informe oficial del INDEC de diciembre de 2024 determinó una <strong>caída acumulada del salario real promedio del 18.7%</strong> para el sector formal y más de 30% en el sector informal.
                        </td>
                        <td className="veredicto-col red-glow">
                          ❌ <strong>MENTIRA POR GOLEADA:</strong> La pulverización no fue de la inflación sino de los ingresos de la clase media argentina.
                        </td>
                      </tr>

                      <tr>
                        <td className="dicho-col">
                          "Nosotros venimos a terminar con los privilegios de la casta política. En este gobierno no hay lugar para familiares ni acomodos."
                          <span className="dicho-date">(Diciembre 2023 - Atril Oficial)</span>
                        </td>
                        <td className="realidad-col">
                          - Su hermano Francisco Adorni fue designado asesor en Defensa con sueldo de <strong>$2.6M</strong>.<br />
                          - Adorni acumuló rango de Ministro y fue nombrado director de YPF con dietas millonarias.
                        </td>
                        <td className="veredicto-col red-glow">
                          ❌ <strong>DOBLE VARA ILIMITADA:</strong> El discurso de la casta terminó en el momento en que se completaron los nombramientos del clan familiar.
                        </td>
                      </tr>

                      <tr>
                        <td className="dicho-col">
                          "Todos mis bienes e inversiones están perfectamente declarados ante la Oficina Anticorrupción y son fruto de mi trabajo transparente."
                          <span className="dicho-date">(Octubre 2025 - Declaración OA)</span>
                        </td>
                        <td className="realidad-col">
                          Admitió en vivo en televisión poseer <strong>ahorros en negro no declarados</strong> durante más de 25 años. La declaración testimonial de la empleada confirmó el uso indebido de tarjetas ajenas.
                        </td>
                        <td className="veredicto-col red-glow">
                          ❌ <strong>SINCERICIDIO FISCAL:</strong> Reconocer la evasión fiscal en vivo mientras se exige austeridad y pago de impuestos es el epítome de la contradicción.
                        </td>
                      </tr>

                      <tr>
                        <td className="dicho-col">
                          "Hemos recortado el uso discrecional de las flotas de aviones del Estado. Se terminaron los viajes de placer a costa del contribuyente."
                          <span className="dicho-date">(Enero 2024 - Atril Oficial)</span>
                        </td>
                        <td className="realidad-col">
                          El fiscal Pollicita perita <strong>19 vuelos en avión privado</strong> del ex Jefe de Gabinete, incluyendo un viaje a Punta del Este junto a familiares y amigos en temporada alta de verano.
                        </td>
                        <td className="veredicto-col red-glow">
                          ❌ <strong>VUELO DE CABOTAJE:</strong> El avión del Estado dejó de ser para "la casta anterior" para convertirse en el taxi de fin de semana de la vocería.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────── */}
          {/* SECCIÓN 5: GRANDES VALORES - LA ESCALERA DE ASCENSOS */}
          {seccionActiva === "ascensos" && (
            <div className="especial-content-box animated-fade">
              <div className="box-header gold-border">
                <h2>GRANDES VALORES: LA ESCALERA DE LA VOCERÍA</h2>
                <span className="badge-cqc gold">ASCENSOS</span>
              </div>
              <div className="box-body">
                <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                  Manuel Adorni encarna como nadie el "sueño libertario": ingresar como vocero tuitero a sueldo básico y retirarse con dieta de petrolero estatal y rango ministerial. Hacé clic en los escalones para ver la evolución salarial acumulada:
                </p>

                <div className="ladder-layout">
                  {/* Gráfico de la Escalera */}
                  <div className="ladder-graphic">
                    <div
                      onClick={() => setLadderStep(4)}
                      className={`ladder-step step-4 ${ladderStep === 4 ? "active" : ""}`}
                    >
                      <span className="step-tag">YPF DIRECTOR</span>
                      <span className="step-salary">DIETA: $10.000.000+/mes</span>
                    </div>
                    <div
                      onClick={() => setLadderStep(3)}
                      className={`ladder-step step-3 ${ladderStep === 3 ? "active" : ""}`}
                    >
                      <span className="step-tag">JEFE DE GABINETE</span>
                      <span className="step-salary">MINISTRO: $5.500.000/mes</span>
                    </div>
                    <div
                      onClick={() => setLadderStep(2)}
                      className={`ladder-step step-2 ${ladderStep === 2 ? "active" : ""}`}
                    >
                      <span className="step-tag">SECRETARIO DE ESTADO</span>
                      <span className="step-salary">RANGO: $3.200.000/mes</span>
                    </div>
                    <div
                      onClick={() => setLadderStep(1)}
                      className={`ladder-step step-1 ${ladderStep === 1 ? "active" : ""}`}
                    >
                      <span className="step-tag">SUBSECRETARIO</span>
                      <span className="step-salary">VOCERO: $1.800.000/mes</span>
                    </div>
                  </div>

                  {/* Detalle del Escalón Seleccionado */}
                  <div className="ladder-details-box">
                    {ladderStep === 1 && (
                      <div className="step-detail-content animated-fade">
                        <h3>Escalón 1: Subsecretario de Vocería</h3>
                        <span className="step-period">PERIODO: Diciembre 2023</span>
                        <p>
                          Asume su cargo como vocero en el inicio del gobierno de Javier Milei. Se le asigna la subsecretaría de comunicación presidencial. A pesar de los discursos de "austeridad total" y la consigna "no hay plata", ingresa con un haber inicial superior al millón y medio de pesos mensuales.
                        </p>
                        <div className="meritocracy-irony">
                          <span>Aporte a la patria: <strong>Pelear con periodistas acreditados a las 8:00 AM y tuitear "Fin.".</strong></span>
                        </div>
                      </div>
                    )}

                    {ladderStep === 2 && (
                      <div className="step-detail-content animated-fade">
                        <h3>Escalón 2: Ascenso a Secretario de Estado</h3>
                        <span className="step-period">PERIODO: Abril 2024</span>
                        <p>
                          Mediante resolución de secretaría general de presidencia, Adorni es ascendido al rango y jerarquía de Secretario de Estado. Esto le otorga no solo una oficina más grande en la Casa Rosada sino también un aumento salarial retroactivo de casi el 80%, superando los 3.2 millones de pesos mensuales en mano.
                        </p>
                        <div className="meritocracy-irony">
                          <span>Aporte a la patria: <strong>Justificar el aumento diciendo que tiene "más responsabilidades" debido a los viajes del presidente.</strong></span>
                        </div>
                        <Link href="/la-meritocracia-del-atril-el-meteorico-ascenso-de-manuel" className="link-ladder-nota">
                          Ver nota de archivo de ascensos ➔
                        </Link>
                      </div>
                    )}

                    {ladderStep === 3 && (
                      <div className="step-detail-content animated-fade">
                        <h3>Escalón 3: Rango de Ministro y Jefatura de Gabinete</h3>
                        <span className="step-period">PERIODO: Noviembre 2025</span>
                        <p>
                          Tras la salida abrupta de Guillermo Francos del gabinete, Adorni es ascendido a Ministro de la Jefatura de Gabinete. Este ascenso representa la cúspide de su influencia en la mesa presidencial, manejando las partidas discrecionales a provincias y las contrataciones de servicios del Estado. Su remuneración básica asciende a los 5.5 millones de pesos.
                        </p>
                        <div className="meritocracy-irony">
                          <span>Aporte a la patria: <strong>La consolidación del poder total, que duraría muy pocos meses antes de chocar con las causas de enriquecimiento.</strong></span>
                        </div>
                      </div>
                    )}

                    {ladderStep === 4 && (
                      <div className="step-detail-content animated-fade">
                        <h3>Escalón 4: El Premio Mayor - Director de YPF</h3>
                        <span className="step-period">PERIODO: Fines de 2025</span>
                        <p>
                          Como "extra" a su rango de Ministro, el Ejecutivo promueve la designación de Manuel Adorni en el directorio de la petrolera estatal YPF S.A. Las dietas de los directores de YPF (que cotiza en bolsa) no se rigen por la ley de sueldos públicos del Estado, permitiéndole embolsar una suma mensual complementaria estimada en más de 10 millones de pesos mensuales.
                        </p>
                        <div className="meritocracy-irony">
                          <span>Aporte a la patria: <strong>Demostrar que en el sector energético estatal también hay lugar para los economistas de Twitter.</strong></span>
                        </div>
                      </div>
                    )}

                    {ladderStep === 0 && (
                      <div className="step-detail-content-empty">
                        <p>Hacé clic en cualquier escalón de la izquierda para analizar la "meritocracia del atril" de Manuel Adorni.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="footer" style={{ marginTop: "6rem" }}>
        <div className="container">
          <p>
            <strong>AdorniLeaks — Especial CQC "El Ciclo Adorni"</strong>. Todos los datos, expedientes e hitos son rigurosamente extraídos del archivo periodístico nacional.
          </p>
        </div>
      </footer>
    </>
  );
}
