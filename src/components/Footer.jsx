import React from "react";

/**
 * Componente Footer
 *
 * Mostra un piè di pagina fisso con:
 * - Branding "stream now"
 * - Collegamenti informativi (termini, aiuto, cookie, feedback)
 * - Copyright
 *
 * Il footer è centrato, con sfondo scuro e testo chiaro.
 * Posizionato in fondo alla pagina (non fixed).
 */
const Footer = () => {
  return (
    <footer
      className="text-center text-white py-4 mt-5"
      style={{
        backgroundColor: "#111",
        marginTop: "auto",
      }}
    >
      {/* Branding */}
      <div className="fw-bold mb-2">stream now</div>

      {/* Collegamenti informativi */}
      <div className="text-muted small">
        <a href="#" className="text-info me-3 text-decoration-none">
          Termini di utilizzo e privacy
        </a>
        <a href="#" className="text-info me-3 text-decoration-none">
          Invia commenti
        </a>
        <a href="#" className="text-info me-3 text-decoration-none">
          Aiuto
        </a>
        <a href="#" className="text-info text-decoration-none">
          Informativa sui cookie
        </a>
      </div>

      {/* Copyright */}
      <div className="text-muted small mt-2">
        &copy; 2025 StreamNow, Inc. o società affiliate
      </div>
    </footer>
  );
};

export default Footer;



