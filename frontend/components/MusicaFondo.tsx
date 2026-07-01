"use client";

import { useState } from "react";

export default function MusicaFondo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="musica-control" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Botón de reproducción de la cortina */}
      <button
        onClick={toggleMusic}
        className={`filter-btn ${isPlaying ? "active" : ""}`}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.68rem",
          fontWeight: 900,
          letterSpacing: "0.08em",
          padding: "5px 12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          border: isPlaying ? "1px solid var(--green)" : "1px solid var(--border)",
          color: isPlaying ? "#000" : "var(--text-muted)",
        }}
        title="Activar música de fondo (Cortina CQC)"
      >
        <span>{isPlaying ? "🔊" : "🔇"}</span>
        <span>{isPlaying ? "MÚSICA: ON" : "MÚSICA: OFF"}</span>
      </button>

      {/* Reproductor oculto de YouTube */}
      {isPlaying && (
        <iframe
          width="1"
          height="1"
          src="https://www.youtube.com/embed/-ibOErExfKQ?autoplay=1&loop=1&playlist=-ibOErExfKQ"
          title="Cortina Musical CQC"
          allow="autoplay"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        />
      )}
    </div>
  );
}
