"use client";

import Link from "next/link";
import MoscaAnimada from "./MoscaAnimada";
import MusicaFondo from "./MusicaFondo";

interface HeaderProps {
  totalNotas?: number;
}

export default function Header({ totalNotas }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          {/* Logo con la Mosca CQC */}
          <Link href="/" className="logo" id="header-logo">
            <MoscaAnimada />
            <div className="logo-text">
              Adorni<span>Leaks</span>
              <span className="logo-sub">Archivo de actualidad</span>
            </div>
          </Link>

          {/* Enlace al Especial CQC */}
          <nav className="header-nav" style={{ display: "flex", gap: "12px" }}>
            <Link href="/especial" className="special-nav-link" id="nav-especial-link">
              📺 Especial "El Ciclo"
            </Link>
            <Link href="/archivo" className="special-nav-link" id="nav-archivo-link">
              🗃️ El Archivo Clasificado
            </Link>
          </nav>



          {/* Stats al estilo monitor CQC y control de música */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <MusicaFondo />
            
            {totalNotas !== undefined && (
              <div className="header-right">
                <span className="header-tag">
                  {totalNotas.toLocaleString("es-AR")} crónicas
                </span>
                <span className="header-status">
                  Agente IA // ONLINE
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
