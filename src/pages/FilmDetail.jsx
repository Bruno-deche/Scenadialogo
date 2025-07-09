// ✅ src/pages/FilmDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../store/contentSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "@mui/material/Rating";
import { FaUsers, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

/**
 * 📽 FilmDetail
 * Pagina dettaglio per un singolo film.
 * Include poster, descrizione, trailer, cast, crew, voti utente e commenti.
 */
const FilmDetail = () => {
  const { id } = useParams(); // 📌 Ottiene l'ID del film dai parametri URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const film = useSelector((state) => state.content.selectedMovie);

  // 💾 Stato per likes/dislikes/commenti/valutazioni locali
  const [likes, setLikes] = useState(() => parseInt(localStorage.getItem(`${id}_likes`)) || 0);
  const [dislikes, setDislikes] = useState(() => parseInt(localStorage.getItem(`${id}_dislikes`)) || 0);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // 🔄 Caricamento dati iniziali
  useEffect(() => {
    dispatch(fetchMovieDetails(id)); // Carica i dettagli del film selezionato

    // 🎭 Carica cast e crew
    const fetchCredits = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=it-IT`);
        if (!res.ok) throw new Error("Errore nella richiesta dei credits");
        const data = await res.json();
        setCast(data.cast || []);
        setCrew(data.crew || []);
      } catch (err) {
        console.error("Errore nel caricamento del cast e crew:", err);
      }
    };

    // 🎬 Carica trailer (YouTube)
    const fetchTrailer = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=it-IT`);
        if (!res.ok) throw new Error("Errore nella richiesta del trailer");
        const data = await res.json();
        const trailerVideo = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(trailerVideo);
      } catch (err) {
        console.error("Errore nel caricamento del trailer:", err);
      }
    };

    // 💬 Carica commenti da localStorage
    try {
      const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];
      setChatMessages(savedComments);
    } catch (err) {
      console.warn("Errore nel parsing dei commenti salvati:", err);
      setChatMessages([]);
    }

    fetchCredits();
    fetchTrailer();
  }, [dispatch, id]);

  // 👍 Gestione like
  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`${id}_likes`, newLikes);
  };

  // 👎 Gestione dislike
  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    localStorage.setItem(`${id}_dislikes`, newDislikes);
  };

  // 💬 Invia un nuovo commento
  const handleSendComment = () => {
    if (inputMessage.trim() === "") return;
    const newMessages = [...chatMessages, { text: inputMessage, timestamp: new Date().toISOString() }];
    setChatMessages(newMessages);
    localStorage.setItem(`comments_${id}`, JSON.stringify(newMessages));
    setInputMessage("");
  };

  // ⏳ Loading
  if (!film) return <p className="text-center text-white mt-5">Caricamento in corso...</p>;

  return (
    <div className="min-vh-100 bg-[#6668ac] text-white">
      <Navbar />
      <div className="container py-5">
        <div className="bg-dark p-4 rounded shadow">
          <div className="row">
            {/* Poster film */}
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                className="img-fluid rounded shadow"
              />
            </div>

            {/* Info film */}
            <div className="col-md-8">
              <h1 className="fw-bold">{film.title}</h1>
              <p className="mb-3">{film.overview}</p>
              <p className="mb-1">Voto IMDb: {film.vote_average.toFixed(1)} / 10</p>
              <Rating
                value={film.vote_average / 2}
                readOnly
                precision={0.5}
                sx={{ fontSize: "1.6rem", color: "#FFD700" }}
              />
              <div className="d-flex gap-2 mt-3">
                <button onClick={handleLike} className="btn btn-outline-success btn-sm">
                  <FaThumbsUp /> {likes}
                </button>
                <button onClick={handleDislike} className="btn btn-outline-danger btn-sm">
                  <FaThumbsDown /> {dislikes}
                </button>
              </div>
              <button className="btn btn-light mt-4" onClick={() => navigate(-1)}>
                ← Torna indietro
              </button>
            </div>
          </div>

          {/* Trailer */}
          {trailer && (
            <div className="mt-5">
              <h4 className="fw-bold mb-3">🎬 Trailer</h4>
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Cast */}
          {cast.length > 0 && (
            <div className="mt-5">
              <h4 className="fw-bold mb-3">🎭 Cast</h4>
              <div className="d-flex gap-3 overflow-auto">
                {cast.slice(0, 10).map(actor => (
                  <div key={actor.id} style={{ minWidth: "120px" }}>
                    <img
                      src={actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/120x180?text=No+Image"}
                      alt={actor.name}
                      className="rounded img-fluid mb-2"
                    />
                    <div className="text-center small fw-semibold">{actor.name}</div>
                    <div className="text-center text-muted small">{actor.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Crew */}
          {crew.length > 0 && (
            <div className="mt-4">
              <h5 className="fw-semibold mb-2">👥 Crew</h5>
              <div className="d-flex flex-wrap gap-3">
                {crew
                  .filter(person => ["Director", "Producer", "Writer"].includes(person.job))
                  .map(person => (
                    <div
                      key={person.id}
                      className="bg-secondary text-white p-2 rounded"
                      style={{ width: "180px" }}
                    >
                      <div className="fw-semibold">{person.name}</div>
                      <div className="small">{person.job}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Commenti utenti */}
          <div className="mt-5">
            <h4 className="fw-bold mb-3">💬 Commenti degli utenti</h4>
            <div className="bg-light rounded p-3 text-dark mb-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {chatMessages.length > 0 ? (
                chatMessages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <strong className="text-primary">Utente:</strong> {msg.text}
                    <br />
                    <small className="text-muted">{new Date(msg.timestamp).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p className="text-muted">Nessun commento ancora. Scrivi tu il primo!</p>
              )}
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Scrivi un commento..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSendComment}>
                Invia
              </button>
            </div>
          </div>

          {/* Accesso alla community */}
          <div className="mt-5 bg-white text-dark p-4 rounded text-center shadow">
            <h4 className="fw-bold mb-2">
              <FaUsers className="me-2" />
              Unisciti al gruppo di <span className="text-primary">{film.title}</span>
            </h4>
            <p>Commenta con altri utenti, scopri teorie e condividi opinioni sul film!</p>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() => navigate(`/community/${encodeURIComponent(film.title)}`)}
            >
              Vai al gruppo
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FilmDetail;









