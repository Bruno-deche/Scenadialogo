// ✅ src/pages/Dashboard.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * 📊 Dashboard Admin
 * Pagina accessibile solo agli amministratori.
 * Permette la gestione utenti (in sviluppo) e la gestione contenuti (attiva).
 */
const Dashboard = () => {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ fontFamily: "Verdana", backgroundColor: "#6668ac" }}
    >
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow-1 container text-white py-5 mt-5">
        <h1 className="text-center mb-5 fw-bold">Pannello di Controllo Admin</h1>

        {/* CARD SEZIONI ADMIN */}
        <div className="row justify-content-center gap-4 mb-5">
          {/* GESTIONE UTENTI - non implementata */}
          <div className="col-md-5 bg-dark rounded text-white p-4">
            <h4>👥 Gestione Utenti</h4>
            <p>Visualizza e gestisci gli utenti registrati (non implementato).</p>
            <button className="btn btn-outline-light" disabled>
              In sviluppo
            </button>
          </div>

          {/* GESTIONE CONTENUTI */}
          <div className="col-md-5 bg-dark rounded text-white p-4">
            <h4>🧾 Gestione Contenuti</h4>
            <p>Rimuovi film o serie dallo store Redux.</p>
            <a
              href="/dashboard/content"
              className="btn btn-outline-light rounded-pill px-4"
            >
              ➕ Vai alla Gestione Contenuti
            </a>
          </div>
        </div>

        {/* LINK ALLA HOME PUBBLICA */}
        <div className="text-center mt-4">
          <a
            href="/home"
            className="btn btn-outline-light rounded-pill px-4"
          >
            Visita la Home pubblica del sito
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;






