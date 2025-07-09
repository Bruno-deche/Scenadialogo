// ✅ src/api/tmdb.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * 🔥 Recupera i film popolari
 * @returns {Promise<Array>} Lista di film
 */
export async function fetchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=it-IT&page=1`);
  if (!response.ok) throw new Error("Errore nel recupero dei film.");
  const data = await response.json();
  return data.results;
}

/**
 * 🔥 Recupera le serie TV popolari
 * @returns {Promise<Array>} Lista di serie
 */
export async function fetchPopularSeries() {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=it-IT&page=1`);
  if (!response.ok) throw new Error("Errore nel recupero delle serie.");
  const data = await response.json();
  return data.results;
}

/**
 * 🔍 Cerca un contenuto (film o serie) per titolo
 * @param {string} title - Titolo da cercare
 * @returns {Promise<Object>} Primo risultato trovato
 */
export async function searchItemByTitle(title) {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=it-IT&query=${encodeURIComponent(title)}`
  );
  if (!response.ok) throw new Error("Errore nella ricerca del contenuto.");
  const data = await response.json();
  return data.results[0];
}

/**
 * 🎥 Recupera i video (trailer) di un film
 * @param {number|string} id - ID del film
 * @returns {Promise<Array>} Lista di video
 */
export async function fetchMovieVideos(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=it-IT`);
  const data = await res.json();
  return data.results;
}

/**
 * 🎥 Recupera i video (trailer) di una serie
 * @param {number|string} id - ID della serie
 * @returns {Promise<Array>} Lista di video
 */
export async function fetchSeriesVideos(id) {
  const res = await fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=it-IT`);
  const data = await res.json();
  return data.results;
}

/**
 * 📄 Recupera i dettagli di un film
 * @param {number|string} id - ID del film
 * @returns {Promise<Object>} Dettagli del film
 */
export async function fetchMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=it-IT`);
  if (!res.ok) throw new Error("Errore nel recupero dei dettagli del film.");
  const data = await res.json();
  return data;
}

/**
 * 📄 Recupera i dettagli di una serie
 * @param {number|string} id - ID della serie
 * @returns {Promise<Object>} Dettagli della serie
 */
export async function fetchSeriesDetails(id) {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=it-IT`);
  if (!res.ok) throw new Error("Errore nel recupero dei dettagli della serie.");
  const data = await res.json();
  return data;
}

/**
 * 👥 Recupera i crediti (cast e crew) di un film
 * @param {number|string} id - ID del film
 * @returns {Promise<Object>} Oggetto con cast e crew
 */
export async function fetchMovieCredits(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=it-IT`);
  if (!res.ok) throw new Error("Errore nel recupero dei crediti del film.");
  const data = await res.json();
  return data;
}

/**
 * 👥 Recupera i crediti (cast e crew) di una serie
 * @param {number|string} id - ID della serie
 * @returns {Promise<Object>} Oggetto con cast e crew
 */
export async function fetchSeriesCredits(id) {
  const res = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=it-IT`);
  if (!res.ok) throw new Error("Errore nel recupero dei crediti della serie.");
  const data = await res.json();
  return data;
}

/**
 * 🎬 Recupera gli episodi di una stagione di una serie
 * @param {number|string} seriesId - ID della serie
 * @param {number} seasonNumber - Numero stagione
 * @returns {Promise<Array>} Lista episodi
 */
export async function fetchSeasonEpisodes(seriesId, seasonNumber) {
  const res = await fetch(`${BASE_URL}/tv/${seriesId}/season/${seasonNumber}?api_key=${API_KEY}&language=it-IT`);
  if (!res.ok) throw new Error("Errore nel recupero degli episodi.");
  const data = await res.json();
  return data.episodes;
}



