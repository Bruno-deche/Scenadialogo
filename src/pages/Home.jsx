// ✅ src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchPopularSeries } from "../store/contentSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

/**
 * 🏠 Home
 * Pagina principale dell'applicazione.
 * Mostra un'anteprima (hero) casuale tra i film popolari,
 * e due sezioni separate per Film e Serie TV con paginazione.
 */
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🎬 Stato globale gestito da Redux
  const {
    films,
    series,
    loading,
    error,
    filmPage,
    seriesPage
  } = useSelector((state) => state.content);

  // ⭐ Featured (hero random)
  const [featured, setFeatured] = useState(null);

  // 📡 Effetto per fetchare i dati da TMDB (Redux Thunk)
  useEffect(() => {
    dispatch(fetchPopularMovies(filmPage));
    dispatch(fetchPopularSeries(seriesPage));
  }, [dispatch, filmPage, seriesPage]);

  // 🔀 Seleziona un film casuale per l'hero
  useEffect(() => {
    if (films.length > 0) {
      const random = films[Math.floor(Math.random() * films.length)];
      setFeatured(random);
    }
  }, [films]);

  // 🔁 Gestione paginazione film e serie
  const handlePrevFilms = () => dispatch({ type: 'content/setFilmPage', payload: filmPage - 1 });
  const handleNextFilms = () => dispatch({ type: 'content/setFilmPage', payload: filmPage + 1 });
  const handlePrevSeries = () => dispatch({ type: 'content/setSeriesPage', payload: seriesPage - 1 });
  const handleNextSeries = () => dispatch({ type: 'content/setSeriesPage', payload: seriesPage + 1 });

  /**
   * 📦 Componente sezioni Film/Serie
   * @param {string} title - Titolo della sezione
   * @param {Array} items - Lista di film/serie da mostrare
   * @param {string} type - Tipo di contenuto (film o series)
   * @param {number} page - Pagina corrente
   * @param {Function} onPrev - Callback per pagina precedente
   * @param {Function} onNext - Callback per pagina successiva
   */
  const Section = ({ title, items, type, page, onPrev, onNext }) => (
    <div className="mb-5">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="row g-4">
        {items.slice(0, 3).map(item => (
          <div key={item.id} className="col-md-4">
            <ProductCard item={item} type={type} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-outline-light" onClick={onPrev} disabled={page === 1}>
          ← Precedente
        </button>
        <button className="btn btn-outline-light" onClick={onNext}>
          Successiva →
        </button>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* 🌌 Contenuto principale */}
      <main className="flex-grow-1 bg-[#6668ac] px-4 py-5" style={{ fontFamily: "Verdana", marginTop: "70px" }}>
        
        {/* 🎬 Hero dinamico */}
        {featured && (
          <div
            className="mb-5 d-flex flex-column align-items-center justify-content-center text-center bg-dark rounded shadow p-5"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${featured.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "400px",
              color: "#fff",
              textShadow: "1px 1px 5px rgba(0,0,0,0.8)"
            }}
          >
            <h1 className="display-4 fw-bold">{featured.title || featured.name}</h1>
            <p className="lead mb-3" style={{ maxWidth: "700px" }}>
              {featured.overview.length > 180 ? featured.overview.slice(0, 180) + "..." : featured.overview}
            </p>
            <button
              className="btn btn-light fw-semibold rounded-pill px-4 py-2"
              onClick={() =>
                navigate(`/${featured.title ? "film" : "series"}/${featured.id}`)
              }
            >
              ▶ Guarda ora
            </button>
          </div>
        )}

        {/* 🔄 Messaggi di stato */}
        {loading && <p className="text-white">Caricamento in corso...</p>}
        {error && <p className="text-danger">Errore: {error}</p>}

        {/* 🎞 Sezione Film */}
        <Section
          title="Film"
          items={films}
          type="film"
          page={filmPage}
          onPrev={handlePrevFilms}
          onNext={handleNextFilms}
        />

        {/* 📺 Sezione Serie */}
        <Section
          title="Serie TV"
          items={series}
          type="series"
          page={seriesPage}
          onPrev={handlePrevSeries}
          onNext={handleNextSeries}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Home;






















