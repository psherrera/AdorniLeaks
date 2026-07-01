"use client";

import Link from "next/link";

interface HeaderProps {
  totalNotas?: number;
}

export default function Header({ totalNotas }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" className="logo" id="header-logo">
            <div className="logo-icon" aria-hidden="true">
              🗃️
            </div>
            <span>
              Adorni<span className="logo-leaks">Leaks</span>
            </span>
          </Link>

          {/* Stats */}
          {totalNotas !== undefined && (
            <div className="header-stats">
              <span className="header-stat">
                <strong>{totalNotas.toLocaleString("es-AR")}</strong> notas archivadas
              </span>
              <span className="header-stat">
                Actualizado{" "}
                <strong>diariamente</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
