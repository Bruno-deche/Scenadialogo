import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

/**
 * Componente ProductCard
 *
 * Visualizza una scheda prodotto (film o serie) con:
 * - Poster, titolo, overview breve
 * - Voto IMDb e stelline
 * - Pulsanti like/dislike con salvataggio in localStorage
 * - Pulsante per andare alla pagina dettagliata
 *
 * Props:
 * @param {Object} item - Oggetto contenente i dati del film o serie
 * @param {string} type - Tipo del contenuto ("film" o "series") usato per il routing
 */
const ProductCard = ({ item, type }) => {
  const navigate = useNavigate();

  // Stato iniziale: likes dal localStorage
  const [likes, setLikes] = useState(() => {
    return parseInt(localStorage.getItem(`${item.id}_likes`)) || 0;
  });

  // Stato iniziale: dislikes dal localStorage
  const [dislikes, setDislikes] = useState(() => {
    return parseInt(localStorage.getItem(`${item.id}_dislikes`)) || 0;
  });

  /**
   * Reindirizza alla pagina dettaglio del prodotto
   */
  const handleDetail = () => {
    navigate(`/${type}/${item.id}`);
  };

  /**
   * Aumenta i likes e aggiorna il localStorage
   */
  const handleLike = (e) => {
    e.stopPropagation(); // Evita il click sulla card
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`${item.id}_likes`, newLikes);
  };

  /**
   * Aumenta i dislikes e aggiorna il localStorage
   */
  const handleDislike = (e) => {
    e.stopPropagation();
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    localStorage.setItem(`${item.id}_dislikes`, newDislikes);
  };

  return (
    <div
      onClick={handleDetail}
      className="bg-dark rounded p-3 shadow h-100 d-flex flex-column"
      style={{
        overflow: "visible",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
    >
      {/* Poster del film o serie */}
      {item.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title || item.name}
          className="mb-3 rounded img-fluid"
          style={{ maxHeight: "360px", objectFit: "cover" }}
        />
      )}

      {/* Titolo del contenuto */}
      <h5 className="text-white">{item.title || item.name}</h5>

      {/* Breve descrizione */}
      <p className="text-light" style={{ minHeight: "3em" }}>
        {item.overview?.slice(0, 80)}...
      </p>

      {/* Voto IMDb */}
      <div className="text-light mb-1">
        Voto IMDb: {item.vote_average ? item.vote_average.toFixed(1) : "N/A"} / 10
      </div>

      {/* Stelle di valutazione */}
      <div style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}>
        <Rating
          name={`rating-${item.id}`}
          value={item.vote_average ? item.vote_average / 2 : 0}
          precision={0.5}
          readOnly
          size="small"
          sx={{ fontSize: "1.3rem", color: "#FFD700" }}
        />
      </div>

      {/* Pulsanti like/dislike */}
      <div className="d-flex justify-content-between mb-2">
        <button
          onClick={handleLike}
          className="btn btn-outline-success btn-sm"
        >
          <FaThumbsUp className="me-1" /> {likes}
        </button>
        <button
          onClick={handleDislike}
          className="btn btn-outline-danger btn-sm"
        >
          <FaThumbsDown className="me-1" /> {dislikes}
        </button>
      </div>

      {/* Pulsante accessibile per i dettagli */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDetail();
        }}
        className="btn btn-light mt-auto"
        style={{ cursor: "pointer" }}
      >
        Dettagli
      </button>
    </div>
  );
};

export default ProductCard;





