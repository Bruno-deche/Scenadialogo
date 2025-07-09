// ✅ src/pages/DashboardContent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * 📂 DashboardContent
 * Pagina di amministrazione che permette la rimozione simulata di film e serie TV.
 */
const DashboardContent = () => {
  const navigate = useNavigate();

  // 🎥 Stato locale per i film pre-caricati (simulazione Redux store)
  const [films, setFilms] = useState([
    {
      id: 1,
      title: "Interstellar",
      overview: "Viaggio tra i buchi neri per salvare l’umanità.",
      poster: "https://image.tmdb.org/t/p/w500/nCbkOyOMTePnpkSnGD2l4j8wI2x.jpg",
    },
    {
      id: 2,
      title: "Dune: Parte Due",
      overview: "Il destino di Arrakis e dei suoi abitanti.",
      poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    },
    {
      id: 3,
      title: "Inception",
      overview: "Un viaggio nei sogni e nella mente.",
      poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    },
  ]);

  // 📺 Stato locale per le serie TV pre-caricate
  const [series, setSeries] = useState([
    {
      id: 1,
      title: "Stranger Things",
      overview: "Una cittadina americana e un mondo parallelo terrificante.",
      poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    },
    {
      id: 2,
      title: "Breaking Bad",
      overview: "Un professore di chimica diventa produttore di metanfetamina.",
      poster: "https://image.tmdb.org/t/p/w500/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg",
    },
    {
      id: 3,
      title: "The Last of Us",
      overview: "Una ragazza immune. Un mondo in rovina. Una missione.",
      poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    },
  ]);

  /**
   * 🗑 Funzione per rimuovere un elemento dallo stato locale (film o serie)
   * @param {string} type - "film" o "series"
   * @param {number} id - id dell'elemento da rimuovere
   */
  const removeItem = (type, id) => {
    if (type === "film") {
      setFilms((prev) => prev.filter((f) => f.id !== id));
    } else {
      setSeries((prev) => prev.filter((s) => s.id !== id));
    }
  };

  /**
   * 💳 Componente Card singola per ogni contenuto
   * @param {object} item - dati del film o serie
   * @param {string} type - tipo di contenuto ("film" o "series")
   */
  const renderCard = (item, type) => (
    <div key={item.id} className="col-md-6 col-lg-4 mb-4">
      <div className="bg-dark text-white rounded shadow p-3 h-100 d-flex flex-column">
        <div className="d-flex gap-3">
          {/* Immagine poster con fallback */}
          <img
            src={item.poster}
            alt={item.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
            }}
            style={{
              width: "100px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
          <div>
            <h5 className="fw-bold mb-1">
              {item.title} {type === "film" ? "🎬" : "📺"}
            </h5>
            <p className="mb-2" style={{ fontSize: "0.9rem" }}>
              {item.overview}
            </p>
          </div>
        </div>

        {/* Bottone rimozione */}
        <button
          className="btn btn-outline-danger rounded-pill mt-3 w-100"
          onClick={() => removeItem(type, item.id)}
        >
          🗑 Rimuovi
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="min-vh-100 bg-[#6668ac] text-white"
      style={{ fontFamily: "Verdana" }}
    >
      <Navbar />

      <div className="container py-4" style={{ marginTop: "70px" }}>
        <h1 className="fw-bold display-5 text-center mb-5">📂 Gestione Contenuti</h1>

        {/* FILM */}
        <h3 className="mb-3">🎬 Film</h3>
        <div className="row">
          {films.length > 0 ? (
            films.map((film) => renderCard(film, "film"))
          ) : (
            <p className="text-center">📭 Nessun film da mostrare.</p>
          )}
        </div>

        {/* SERIE TV */}
        <h3 className="mt-5 mb-3">📺 Serie TV</h3>
        <div className="row">
          {series.length > 0 ? (
            series.map((serie) => renderCard(serie, "series"))
          ) : (
            <p className="text-center">📭 Nessuna serie da mostrare.</p>
          )}
        </div>

        {/* 🔙 Pulsante per tornare alla dashboard */}
        <div className="text-center mt-5">
          <button
            onClick={() => navigate("/dashboard")}
            className="border border-white text-white rounded-pill px-4 py-2 fw-medium"
            style={{
              backgroundColor: "transparent",
              boxShadow: "0 0 0.4rem rgba(255, 255, 255, 0.25)",
              transition: "all 0.2s ease",
            }}
          >
            ← Torna alla Dashboard
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardContent;





