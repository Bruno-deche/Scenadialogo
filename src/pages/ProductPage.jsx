// ✅ src/pages/ProductPage.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { setFilmPage, setSeriesPage } from "../store/contentSlice";

/**
 * 🎬 ProductPage
 * Pagina generica per la visualizzazione di film o serie TV.
 * Include supporto alla paginazione, struttura responsive e card dinamiche.
 *
 * @param {string} title - Titolo visualizzato nella pagina (es. "Film" o "Serie TV")
 * @param {string} type - Tipo di contenuto ("film" o "series")
 */
const ProductPage = ({ title, type }) => {
  const dispatch = useDispatch();

  // Estrazione dello stato dal Redux store
  const {
    films,
    series,
    loading,
    error,
    filmPage,
    seriesPage,
  } = useSelector((state) => state.content);

  // Seleziona gli item da visualizzare in base al tipo (film o serie)
  const items = type === "film" ? films : series;
  const currentPage = type === "film" ? filmPage : seriesPage;

  // Gestione click "pagina precedente"
  const handlePrev = () => {
    if (currentPage > 1) {
      type === "film"
        ? dispatch(setFilmPage(currentPage - 1))
        : dispatch(setSeriesPage(currentPage - 1));
    }
  };

  // Gestione click "pagina successiva"
  const handleNext = () => {
    type === "film"
      ? dispatch(setFilmPage(currentPage + 1))
      : dispatch(setSeriesPage(currentPage + 1));
  };

  return (
    <div className="min-vh-100 bg-[#6668ac] text-white" style={{ fontFamily: "Verdana" }}>
      {/* Navbar fissa in alto */}
      <Navbar />

      {/* Contenitore principale */}
      <div className="container py-5" style={{ marginTop: "70px" }}>
        <h1 className="mb-4 text-center">{title}</h1>

        {/* Stato di caricamento */}
        {loading && <p className="text-white text-center">Caricamento in corso...</p>}

        {/* Errore API */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Rendering card */}
        <div className="row">
          {Array.isArray(items) &&
            items.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                <ProductCard item={item} type={type} />
              </div>
            ))}
        </div>

        {/* Paginazione */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-outline-light"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            ← Precedente
          </button>
          <button className="btn btn-outline-light" onClick={handleNext}>
            Successiva →
          </button>
        </div>
      </div>

      {/* Footer coerente e fisso in basso */}
      <Footer />
    </div>
  );
};

export default ProductPage;







