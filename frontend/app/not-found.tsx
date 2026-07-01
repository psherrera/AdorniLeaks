import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nota no encontrada",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div style={{ fontSize: "3rem" }}>🗃️</div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--text-primary)",
        }}
      >
        Esta nota no está en el archivo
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
        Puede que haya sido eliminada o que el enlace sea incorrecto.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "1rem",
          padding: "0.7rem 1.5rem",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          color: "var(--text-primary)",
          fontSize: "0.9rem",
          fontWeight: 600,
        }}
      >
        ← Volver al archivo
      </Link>
    </main>
  );
}
