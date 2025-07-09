import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// 🔄 Thunk aggiornati con supporto paginazione
export const fetchPopularMovies = createAsyncThunk(
  'content/fetchPopularMovies',
  async (page = 1) => {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=it-IT&page=${page}`);
    if (!res.ok) throw new Error('Errore nel recupero dei film');
    const data = await res.json();
    return { results: data.results, page };
  }
);

export const fetchPopularSeries = createAsyncThunk(
  'content/fetchPopularSeries',
  async (page = 1) => {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=it-IT&page=${page}`);
    if (!res.ok) throw new Error('Errore nel recupero delle serie');
    const data = await res.json();
    return { results: data.results, page };
  }
);

// 🆕 Thunk per dettagli film e serie
export const fetchMovieDetails = createAsyncThunk(
  'content/fetchMovieDetails',
  async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=it-IT`);
    if (!res.ok) throw new Error('Errore nel caricamento dettagli film');
    return await res.json();
  }
);

export const fetchSeriesDetails = createAsyncThunk(
  'content/fetchSeriesDetails',
  async (id) => {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=it-IT`);
    if (!res.ok) throw new Error('Errore nel caricamento dettagli serie');
    return await res.json();
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    selectedMovie: null,
    selectedSeries: null,
    films: [],
    series: [],
    filmPage: 1,
    seriesPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ Azioni per dashboard admin
    removeFilm: (state, action) => {
      state.films = state.films.filter(f => f.id !== action.payload);
    },
    removeSeries: (state, action) => {
      state.series = state.series.filter(s => s.id !== action.payload);
    },
    addFilm: (state, action) => {
      state.films.unshift(action.payload);
    },
    addSeries: (state, action) => {
      state.series.unshift(action.payload);
    },

    // ✅ Azioni per gestire la paginazione manuale
    setFilmPage: (state, action) => {
      state.filmPage = action.payload;
    },
    setSeriesPage: (state, action) => {
      state.seriesPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      })
      .addCase(fetchSeriesDetails.fulfilled, (state, action) => {
        state.selectedSeries = action.payload;
      })

      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload.results;
        state.filmPage = action.payload.page;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPopularSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.series = action.payload.results;
        state.seriesPage = action.payload.page;
      })
      .addCase(fetchPopularSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ✅ Esporta le azioni
export const {
  removeFilm,
  removeSeries,
  addFilm,
  addSeries,
  setFilmPage,
  setSeriesPage,
} = contentSlice.actions;

export default contentSlice.reducer;





