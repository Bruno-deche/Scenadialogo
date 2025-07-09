// ✅ src/pages/Series.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularSeries } from "../store/contentSlice";
import ProductPage from "./ProductPage";

/**
 * 📺 Series
 * Pagina dedicata alla visualizzazione delle Serie TV.
 * Utilizza Redux per fetch e paginazione dei contenuti.
 */
const Series = () => {
  const dispatch = useDispatch();

  // 🔄 Numero di pagina corrente per le serie TV (dallo store)
  const seriesPage = useSelector((state) => state.content.seriesPage);

  // 📦 Fetch dati dalla TMDB API ogni volta che cambia la pagina
  useEffect(() => {
    dispatch(fetchPopularSeries(seriesPage));
  }, [dispatch, seriesPage]);

  // ✅ Rende la pagina generica passando i dati specifici delle Serie
  return <ProductPage title="Serie TV" type="series" />;
};

export default Series;





