// ✅ src/pages/SeriesDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeriesDetails } from "../store/contentSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Rating from "@mui/material/Rating";
import { FaUsers, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

/**
 * 📺 SeriesDetail
 * Pagina dettaglio per una serie TV selezionata.
 * Mostra info generali, trailer, cast, crew, stagioni, episodi e commenti.
 */
const SeriesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const series = useSelector((state) => state.content.selectedSeries);

  // Stato per trailer, cast/crew, stagioni ed episodi
  const [trailer, setTrailer] = useState(null);
  const [credits, setCredits] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [episodesBySeason, setEpisodesBySeason] = useState({});

  // Stato per like/dislike
  const [likes, setLikes] = useState(() => parseInt(localStorage.getItem(`${id}_likes`)) || 0);
  const [dislikes, setDislikes] = useState(() => parseInt(localStorage.getItem(`${id}_dislikes`)) || 0);

  // Stato per commenti
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const API = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    dispatch(fetchSeriesDetails(id));

    const fetchOtherData = async () => {
      try {
        // 🎬 Trailer
        const videoRes = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API}&language=it-IT`);
        const videoData = await videoRes.json();
        const trailerVideo = videoData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailer(trailerVideo);
      } catch (e) {
        console.warn("Errore trailer:", e);
      }

      try {
        // 👥 Cast & Crew
        const creditsRes = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API}&language=it-IT`);
        const creditsData = await creditsRes.json();
        setCredits(creditsData);
      } catch (e) {
        console.warn("Errore credits:", e);
      }

      try {
        // 📅 Stagioni & Episodi
        const seriesDetailsRes = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API}&language=it-IT`);
        const seriesData = await seriesDetailsRes.json();
        setSeasons(seriesData.seasons || []);

        const episodesMap = {};
        for (const season of seriesData.seasons) {
          const epRes = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${API}&language=it-IT`
          );
          const epData = await epRes.json();
          episodesMap[season.season_number] = epData.episodes || [];
        }
        setEpisodesBySeason(episodesMap);
      } catch (e) {
        console.warn("Errore episodi:", e);
      }
    };

    fetchOtherData();

    try {
      const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`));
      setChatMessages(Array.isArray(savedComments) ? savedComments : []);
    } catch {
      setChatMessages([]);
    }
  }, [dispatch, id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`${id}_likes`, newLikes);
  };

  const handleDislike = () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    localStorage.setItem(`${id}_dislikes`, newDislikes);
  };

  const handleSendComment = () => {
    if (inputMessage.trim() === "") return;
    const nuovo = { text: inputMessage.trim(), timestamp: new Date().toISOString() };
    const aggiornato = [...chatMessages, nuovo];
    localStorage.setItem(`comments_${id}`, JSON.stringify(aggiornato));
    setInputMessage("");
    setChatMessages(aggiornato);
  };

  if (!series) return <p className="text-center text-white mt-5">Caricamento...</p>;

  return (
    <div className="min-vh-100 bg-[#6668ac] text-white">
      <Navbar />

      <div className="container py-5">
        <div className="bg-dark p-4 rounded shadow">
          {/* 🔹 Intestazione */}
          <div className="row">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                className="img-fluid rounded shadow"
                alt={series.name}
              />
            </div>
            <div className="col-md-8">
              <h1>{series.name}</h1>
              <p>{series.overview}</p>
              <p>Voto IMDb: {series.vote_average.toFixed(1)} / 10</p>
              <Rating
                value={series.vote_average / 2}
                readOnly
                precision={0.5}
                sx={{ color: "#FFD700" }}
              />
              <div className="mt-3 d-flex gap-2">
                <button onClick={handleLike} className="btn btn-outline-success btn-sm">
                  <FaThumbsUp /> {likes}
                </button>
                <button onClick={handleDislike} className="btn btn-outline-danger btn-sm">
                  <FaThumbsDown /> {dislikes}
                </button>
              </div>

              {/* Trailer */}
              {trailer && (
                <div className="mt-4">
                  <h5>🎬 Trailer</h5>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          {/* 👥 Cast & Crew */}
          {credits && (
            <div className="mt-5">
              <h4>👥 Cast Principale</h4>
              <div className="d-flex gap-3 overflow-auto">
                {credits.cast.slice(0, 10).map(actor => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/150"}
                      alt={actor.name}
                      className="rounded shadow"
                      style={{ width: "100px", height: "150px", objectFit: "cover" }}
                    />
                    <div>{actor.name}</div>
                    <small className="text-muted">{actor.character}</small>
                  </div>
                ))}
              </div>

              <h5 className="mt-4">🎬 Regia & Crew</h5>
              <ul>
                {credits.crew.slice(0, 5).map(person => (
                  <li key={person.id}>{person.job}: {person.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 📅 Stagioni ed Episodi */}
          {seasons.length > 0 && (
            <div className="mt-5">
              <h4 className="fw-bold mb-3">📅 Stagioni</h4>
              <div className="d-flex flex-wrap gap-3">
                {seasons.map((season) => {
                  const poster = season.poster_path
                    ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                    : series.poster_path
                    ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image";

                  return (
                    <div
                      key={season.id}
                      className="bg-secondary rounded shadow p-2"
                      style={{ width: "180px" }}
                    >
                      <img src={poster} alt={season.name} className="img-fluid rounded mb-2" />
                      <h6 className="text-center fw-semibold">{season.name}</h6>
                      <p className="text-center small">{season.episode_count} episodi</p>
                      {episodesBySeason[season.season_number] && (
                        <div className="mt-2">
                          <h6 className="fw-semibold">Episodi:</h6>
                          <ul className="small" style={{ maxHeight: "150px", overflowY: "auto" }}>
                            {episodesBySeason[season.season_number].map(ep => (
                              <li key={ep.id}>
                                <strong>{ep.episode_number}.</strong> {ep.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 💬 Commenti utenti */}
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

          {/* 🔗 Community */}
          <div className="mt-5 bg-white text-dark p-4 rounded text-center shadow">
            <h4>
              <FaUsers className="me-2" />
              Unisciti al gruppo di <span className="text-primary">{series.name}</span>
            </h4>
            <p>Commenta con altri utenti, scopri teorie e condividi opinioni sulla serie!</p>
            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() => navigate(`/community/${encodeURIComponent(series.name)}`)}
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

export default SeriesDetail;














