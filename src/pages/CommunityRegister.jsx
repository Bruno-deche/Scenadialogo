// ✅ src/pages/CommunityRegister.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CommunityRegister = () => {
  const navigate = useNavigate();
  const [joinedGroups, setJoinedGroups] = useState([]); // 🎯 Gruppi uniti dall’utente
  const [searchTerm, setSearchTerm] = useState("");     // 🔍 Testo per ricerca

  // 🎞️ Contenuti disponibili dal Redux store
  const { films, series } = useSelector((state) => state.content);
  const allItems = [...films, ...series]; // Unione film e serie

  // ✅ Controlli all'accesso e caricamento gruppi salvati
  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    const role = localStorage.getItem("role");

    // 🔐 Se non loggato o non community, rimanda al login
    if (isLogged !== "true" || role !== "community") {
      navigate("/login");
    }

    // 🔄 Carica i gruppi uniti (se presenti)
    const saved = JSON.parse(localStorage.getItem("joinedGroups")) || [];
    setJoinedGroups(saved);
  }, [navigate]);

  // 🛡️ Valida il titolo del gruppo prima di salvarlo
  const validateTitle = (title) => {
    if (!title || title.length < 2) {
      alert("⚠️ Il titolo del gruppo è troppo corto.");
      return false;
    }
    if (/[<>\\/]/.test(title)) {
      alert("⚠️ Il titolo contiene caratteri non ammessi (< > \\ /).");
      return false;
    }
    return true;
  };

  // ➕ Unisciti al gruppo selezionato
  const handleJoin = (title) => {
    if (!validateTitle(title)) return;

    const current = JSON.parse(localStorage.getItem("joinedGroups")) || [];

    if (!current.includes(title)) {
      const updated = [...current, title];
      localStorage.setItem("joinedGroups", JSON.stringify(updated));
      setJoinedGroups(updated);
    }

    // 🔁 Vai alla pagina del gruppo
    navigate(`/community/${encodeURIComponent(title)}`);
  };

  // 🔍 Filtro contenuti in base al testo inserito
  const filteredItems = allItems.filter((item) =>
    (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* MAIN */}
      <main
        className="flex-grow-1 bg-[#6668ac] text-white px-4"
        style={{ fontFamily: "Verdana", marginTop: "70px" }}
      >
        {/* Barra ricerca */}
        <div className="container py-4">
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cerca un gruppo (es. Dune, Breaking Bad)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-light text-dark" disabled>
              Cerca
            </button>
          </div>
        </div>

        {/* Lista risultati */}
        <div className="container py-2">
          <div className="row">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-md-6 mb-4">
                <div className="bg-dark text-white rounded shadow p-3 h-100 d-flex flex-column justify-content-between">
                  <div className="d-flex gap-3">
                    {/* Locandina */}
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : "https://via.placeholder.com/500x750?text=Nessuna+immagine"
                      }
                      alt={item.title || item.name}
                      style={{
                        width: "100px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "4px"
                      }}
                    />

                    {/* Titolo e descrizione */}
                    <div>
                      <h5 className="fw-bold">{item.title || item.name}</h5>
                      <p className="mb-3" style={{ fontSize: "0.9rem" }}>
                        {item.overview || "Nessuna descrizione disponibile."}
                      </p>
                    </div>
                  </div>

                  {/* Pulsante "Unisciti" */}
                  <button
                    onClick={() => handleJoin(item.title || item.name)}
                    className="border border-white text-white rounded-pill px-4 py-2 fw-semibold mt-3 mx-auto d-block"
                    style={{
                      backgroundColor: "transparent",
                      transition: "all 0.3s ease",
                      boxShadow: "0 0 0.5rem rgba(255, 255, 255, 0.4)"
                    }}
                  >
                    Unisciti
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityRegister;























