"use client";

interface EventoLinea {
  fecha: string;
  titulo: string;
  descripcion: string;
  detalles: string[];
  categoria: "origen" | "gestion" | "polemica" | "caida";
  emoji: string;
}

const EVENTOS: EventoLinea[] = [
  {
    fecha: "2022",
    titulo: "Construcción del personaje en redes",
    descripcion: "Consolida su perfil en X como 'tuitero político' de derecha con un tono confrontativo que luego trasladará intacto al Estado.",
    detalles: [
      "Publica la provocación de billetes de 100 dólares titulada 'Estos sí son 30.000. Fin.', generando repudio de organismos de DDHH.",
      "Instala su muletilla de cierre con la palabra 'Fin.' y un estilo de desprecio hacia la izquierda."
    ],
    categoria: "origen",
    emoji: "📱"
  },
  {
    fecha: "Diciembre 2023",
    titulo: "Salto de comentarista a vocero presidencial",
    descripcion: "Llega al gobierno de Javier Milei fijando el encuadre oficial mediante conferencias de prensa diarias.",
    detalles: [
      "Pasa de criticar a 'la casta' y al aparato estatal a convertirse en la voz oficial de la presidencia.",
      "Mantiene el estilo confrontativo de sus redes sociales en los atriles de Casa Rosada."
    ],
    categoria: "gestion",
    emoji: "📢"
  },
  {
    fecha: "Durante 2024",
    titulo: "Consolidación y choques con la prensa",
    descripcion: "Fija el relato del ajuste y blindaje presidencial ante las críticas de los medios.",
    detalles: [
      "Frente a preguntas incómodas sobre viajes o gestión, responde con frases como 'Sos apenas un periodista'.",
      "Evita dar explicaciones sobre los perros de Milei argumentando que hablar de ellos es 'meterse con su familia'."
    ],
    categoria: "gestion",
    emoji: "🎙️"
  },
  {
    fecha: "Agosto 2024",
    titulo: "Día del Zurdo y ninguneo a Maradona",
    descripcion: "Omite deliberadamente a Diego Maradona en el listado de deportistas zurdos destacados.",
    detalles: [
      "Reivindica en conferencia de prensa a 'grandes zurdos que sí aportaron a la grandeza de la Argentina'.",
      "Recibe fuertes críticas de Dalma Maradona y compañeros del '10', considerándolo un castigo ideológico."
    ],
    categoria: "polemica",
    emoji: "⚽"
  },
  {
    fecha: "2024 - 2025",
    titulo: "Foto del perro y narrativa familiar",
    descripcion: "Construye una narrativa afectiva en redes que contrasta con sus discursos de extrema meritocracia.",
    detalles: [
      "Difunde fotos junto a Karina Milei y un perro presentado como 'nuevo integrante de la Casa Rosada'.",
      "La narrativa de 'familia ampliada' choca con revelaciones posteriores sobre propiedades y privilegios."
    ],
    categoria: "polemica",
    emoji: "🐕"
  },
  {
    fecha: "Noviembre 2025",
    titulo: "Ascenso a Jefe de Gabinete",
    descripcion: "Mediante el decreto 784/2025 del 4 de noviembre, asume la Jefatura de Gabinete tras la salida de Guillermo Francos.",
    detalles: [
      "Concentra poder político y de comunicación al combinar la jefatura de gabinete con el control interno del aparato oficial.",
      "Este ascenso incrementa el escrutinio de la justicia y los medios sobre su evolución patrimonial."
    ],
    categoria: "gestion",
    emoji: "🏛️"
  },
  {
    fecha: "2025 - 2026",
    titulo: "Causas por patrimonio, viajes y propiedades",
    descripcion: "Se inician expedientes federales por presunto enriquecimiento ilícito, negociaciones incompatibles y dádivas.",
    detalles: [
      "La justicia pone la lupa sobre 19 vuelos privados, incluyendo un viaje familiar a Punta del Este junto al periodista Marcelo Grandio.",
      "El fiscal Gerardo Pollicita ordena peritajes sobre su evolución patrimonial y se indaga a su hermano Francisco Adorni."
    ],
    categoria: "caida",
    emoji: "✈️"
  },
  {
    fecha: "Principios 2026",
    titulo: "Declaración jurada y 'ahorros en negro'",
    descripcion: "Intenta justificar su patrimonio declarando fondos fuera del sistema financiero formal.",
    detalles: [
      "Declara que su riqueza proviene de '25 años de ahorrar en negro' junto a su esposa y de inversiones en bitcoin.",
      "La admisión genera fuertes críticas por la doble vara frente a sus discursos pasados de estricto apego a la ley."
    ],
    categoria: "caida",
    emoji: "💰"
  },
  {
    fecha: "Junio 2026",
    titulo: "Renuncia y fin de ciclo",
    descripcion: "El 26-27 de junio de 2026 renuncia a su cargo cercado por las causas judiciales por enriquecimiento ilícito.",
    detalles: [
      "Se retira de la Casa Rosada dejando un historial de agresiones mediáticas ('yo sí quiero grieta') y sospechas sobre su patrimonio.",
      "La carta de renuncia intenta cerrar su ciclo de vocero reconvertido en funcionario investigado."
    ],
    categoria: "caida",
    emoji: "🚪"
  }
];

export default function LineaTiempo() {
  return (
    <section className="timeline-section" style={{ marginTop: "4rem" }}>
      <div className="hitos-header" style={{ marginBottom: "3rem" }}>
        <h2 className="hitos-title">⏳ Trayectoria y Paradoja</h2>
        <p className="hitos-subtitle">Cronología del tuitero que se convirtió en Jefatura de Gabinete</p>
      </div>

      <div className="timeline-container">
        {EVENTOS.map((evento, index) => (
          <div key={index} className={`timeline-item ${evento.categoria}`} id={`timeline-event-${index}`}>
            <div className="timeline-badge">
              <span className="timeline-emoji">{evento.emoji}</span>
            </div>
            
            <div className="timeline-content">
              <div className="timeline-header">
                <span className="timeline-date">{evento.fecha}</span>
                <h3 className="timeline-title">{evento.titulo}</h3>
              </div>
              
              <p className="timeline-desc">{evento.descripcion}</p>
              
              <ul className="timeline-details">
                {evento.detalles.map((detalle, idx) => (
                  <li key={idx}>{detalle}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Contradicción final */}
      <div className="contradiction-box">
        <h3 className="contradiction-title">⚠️ Contradicción con su vida anterior</h3>
        <p className="contradiction-desc">
          Antes de 2023, Manuel Adorni se presentaba en conferencias y redes como un "ciudadano común, 
          laburante del sector privado" que denunciaba sistemáticamente los privilegios de la clase política 
          y exigía terminar con el "Estado derrochador". Tras su llegada al poder, se transformó en uno de los 
          funcionarios más influyentes del Poder Ejecutivo, con acceso directo a aviones oficiales, nombramientos de 
          familiares y decisiones discrecionales de gasto público. La posterior declaración de tenencia de ahorros 
          en negro, viajes de lujo sospechosos y adquisiciones patrimoniales terminaron por cristalizar una de las 
          mayores contradicciones políticas de la gestión.
        </p>
      </div>
    </section>
  );
}
