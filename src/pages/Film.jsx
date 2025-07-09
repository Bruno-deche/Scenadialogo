// ✅ src/pages/Film.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../store/contentSlice";
import ProductPage from "./ProductPage";

/**
 * 🎬 Film
 * Pagina dedicata alla visualizzazione dei film, con paginazione dinamica.
 * Utilizza lo stato Redux per gestire la pagina corrente e i dati caricati.
 * 
 * - All'avvio o al cambio pagina (`filmPage`), viene effettuato un fetch dei film popolari tramite thunk.
 * - Viene poi renderizzata la pagina generica `ProductPage` con `type="film"` e titolo appropriato.
 */
const Film = () => {
  const dispatch = useDispatch();

  // 🔄 Recupera dal Redux store la pagina corrente dei film
  const filmPage = useSelector((state) => state.content.filmPage);

  // 📦 Esegue il fetch dei film popolari quando cambia la pagina o al primo caricamento
  useEffect(() => {
    dispatch(fetchPopularMovies(filmPage));
  }, [dispatch, filmPage]);

  // 🎬 Restituisce la pagina generica per visualizzare i film
  return <ProductPage title="Film" type="film" />;
};

export default Film;



