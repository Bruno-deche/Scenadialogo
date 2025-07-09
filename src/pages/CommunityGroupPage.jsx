// ✅ src/pages/CommunityGroupPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 💬 Commenti predefiniti (fallback se non ci sono ancora chat salvate)
const fakeComments = {
  "Dune": [
    { user: "ArrakisFan", text: "La spezia è vita! 🔥", date: "2025-07-01" },
    { user: "Muad'Dib", text: "Paul è il prescelto? O solo una pedina?", date: "2025-07-02" }
  ],
  "Breaking Bad": [
    { user: "Heisenberg", text: "Jesse, dobbiamo cucinare.", date: "2025-07-03" },
    { user: "JessePinkman", text: "Serie da 10 stelle!", date: "2025-07-04" }
  ],
  "The Boys": [
    { user: "Butcher", text: "Homelander è fuori controllo!", date: "2025-07-03" },
    { user: "StarlightFan", text: "La scena finale 😱", date: "2025-07-02" }
  ],
  "Stranger Things": [
    { user: "Eleven", text: "Mind Flayer da paura!", date: "2025-07-01" },
    { user: "Dustin", text: "Che ansia il Sottosopra...", date: "2025-07-03" }
  ],
  "Interstellar": [
    { user: "Cooper", text: "Il tempo è relativo!", date: "2025-07-05" },
    { user: "Murph", text: "Pianto assicurato 😢", date: "2025-07-04" }
  ]
};

const CommunityGroupPage = () => {
  const navigate = useNavigate();
  const { groupName } = useParams(); // 🔁 gruppo selezionato via URL

  // 🎯 Stato componenti
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [ratings, setRatings] = useState({});

  // 🔁 Carica chat e gruppi all'avvio
  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("joinedGroups")) || [];

    // 🔐 Se l'utente prova ad accedere a un gruppo non unito, torna alla community
    if (!savedGroups.includes(groupName)) {
      navigate("/community-register");
    }
    setJoinedGroups(savedGroups);

    // ⭐ Voti salvati
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(savedRatings);

    // 💬 Messaggi salvati o fallback
    const stored = JSON.parse(localStorage.getItem(`chat_${groupName}`));
    if (stored && stored.length > 0) {
      setChatMessages(stored);
    } else {
      const fallback = fakeComments[groupName] || [];
      localStorage.setItem(`chat_${groupName}`, JSON.stringify(fallback));
      setChatMessages(fallback);
    }
  }, [groupName]);

  // 📩 Invia un nuovo messaggio
  const handleSend = () => {
    if (inputMessage.trim() === "") return;

    const newMessages = [
      ...chatMessages,
      {
        text: inputMessage,
        timestamp: new Date().toISOString(),
        user: "Utente"
      }
    ];

    setChatMessages(newMessages);
    localStorage.setItem(`chat_${groupName}`, JSON.stringify(newMessages));
    setInputMessage("");
  };

  // ⭐ Salva voto utente al gruppo
  const handleRating = (value) => {
    const updatedRatings = { ...ratings, [groupName]: value };
    setRatings(updatedRatings);
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));
  };

  return (
    <div className="min-vh-100 bg-[#6668ac] text-white d-flex flex-column" style={{ fontFamily: "Verdana" }}>
      <Navbar />

      <div className="container-fluid flex-grow-1 py-4">
        <div className="row">

          {/* 📌 Colonna sinistra: Lista gruppi uniti */}
          <div className="col-md-2 mb-3">
            <div className="bg-dark rounded p-3 h-100">
              <h6 className="text-white">I miei gruppi</h6>
              <ul className="list-unstyled">
                {joinedGroups.map((g) => (
                  <li
                    key={g}
                    className={`mb-2 ${g === groupName ? "fw-bold text-primary" : "text-white"}`}
                    onClick={() => navigate(`/community/${g}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 💬 Colonna centrale: Chat */}
          <div className="col-md-7 mb-3">
            <div
              className="bg-dark rounded p-3 mb-3"
              style={{ minHeight: "400px", maxHeight: "400px", overflowY: "auto" }}
            >
              {chatMessages.length === 0 ? (
                <p className="text-muted">Nessun messaggio ancora.</p>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div key={idx} className="mb-2">
                    <span className="text-info">{msg.user || "Utente"}:</span> {msg.text}
                    <br />
                    <small className="text-muted">
                      {msg.date || new Date(msg.timestamp).toLocaleTimeString()}
                    </small>
                  </div>
                ))
              )}
            </div>

            {/* 📥 Input messaggio */}
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Scrivi un messaggio..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSend}>
                Invia
              </button>
            </div>
          </div>

          {/* ⭐ Colonna destra: Voto gruppo */}
          <div className="col-md-3 mb-3">
            <div className="bg-dark rounded p-3 h-100">
              <h6 className="text-white mb-3">Vota il gruppo</h6>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`btn btn-sm me-1 ${ratings[groupName] >= star ? "btn-warning" : "btn-outline-light"}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </button>
              ))}
              {ratings[groupName] && (
                <p className="mt-2">Hai votato: {ratings[groupName]} ★</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CommunityGroupPage;


