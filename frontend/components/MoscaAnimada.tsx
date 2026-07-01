"use client";

export default function MoscaAnimada() {
  return (
    <div className="mosca-container">
      <svg className="mosca-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Cuerpo de la mosca */}
        <ellipse cx="50" cy="55" rx="12" ry="18" fill="#0A0A0A" stroke="#00FF66" strokeWidth="3"/>
        <circle cx="50" cy="35" r="10" fill="#0A0A0A" stroke="#00FF66" strokeWidth="3"/>
        {/* Ojos de Anteojos Negros */}
        <ellipse cx="44" cy="33" rx="4" ry="3" fill="#00FF66" />
        <ellipse cx="56" cy="33" rx="4" ry="3" fill="#00FF66" />
        {/* Alitas con animación */}
        <ellipse className="ala ala-izq" cx="32" cy="48" rx="14" ry="7" fill="rgba(0, 255, 102, 0.2)" stroke="#00FF66" strokeWidth="1.5"/>
        <ellipse className="ala ala-der" cx="68" cy="48" rx="14" ry="7" fill="rgba(0, 255, 102, 0.2)" stroke="#00FF66" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}
