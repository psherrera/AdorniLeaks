"use client";

import Link from "next/link";
import MoscaAnimada from "./MoscaAnimada";

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

          {/* Stats al estilo monitor CQC */}
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
    </header>
  );
}
