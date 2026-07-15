"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center px-6 py-32 text-center" style={{ fontFamily: "Georgia, serif", background: "#F8F5EF", color: "#2C2C27" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#625F57", marginBottom: "1.5rem" }}>
          Something went wrong
        </p>
        <h1 style={{ fontSize: "2rem", lineHeight: 1.2, fontStyle: "italic", color: "#2D4A3E", marginBottom: "1rem" }}>
          The page lost its way.
        </h1>
        <p style={{ fontSize: "1rem", color: "#625F57", maxWidth: 320, marginBottom: "2.5rem" }}>
          An unexpected error occurred. Please try again or return home.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{ fontFamily: "inherit", fontSize: "0.625rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#2D4A3E", border: "1px solid #8A9A6A", padding: "0.75rem 1.5rem", borderRadius: "2px", background: "transparent", cursor: "pointer" }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{ fontFamily: "inherit", fontSize: "0.625rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#2D4A3E", border: "1px solid #8A9A6A", padding: "0.75rem 1.5rem", borderRadius: "2px", textDecoration: "none" }}
          >
            Return home
          </Link>
        </div>
      </body>
    </html>
  );
}
