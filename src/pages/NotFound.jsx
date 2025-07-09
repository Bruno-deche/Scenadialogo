// ✅ src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * 🛑 NotFound
 * Pagina 404 mostrata quando l'utente visita un URL inesistente.
 * Fornisce un messaggio d'errore e un pulsante per tornare alla home.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 bg-[#6668ac] text-white"
      style={{ fontFamily: "Verdana" }}
    >
      {/* Navbar sempre visibile in alto */}
      <Navbar />

      {/* Corpo principale con messaggio 404 */}
      <div className="container d-flex flex-column justify-content-center align-items-center py-5">
        <h1 className="display-1 fw-bold">404</h1>
        <h2 className="mb-3">Pagina non trovata</h2>
        <p className="text-center mb-4">
          La pagina che stai cercando non esiste o è stata rimossa.<br />
          Controlla l'URL oppure torna alla Home.
        </p>

        {/* Pulsante per tornare alla home */}
        <button
          className="btn btn-light rounded-pill px-4"
          onClick={() => navigate("/home")}
        >
          ← Torna alla Home
        </button>
      </div>

      {/* Footer coerente su tutte le pagine */}
      <Footer />
    </div>
  );
};

export default NotFound;


