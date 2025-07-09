import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import logger from 'redux-logger';

import authReducer from './authSlice';
import contentReducer from './contentSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // salviamo solo auth (utente/ruolo)
};

const rootReducer = combineReducers({
  auth: authReducer,
  content: contentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // compatibilità con redux-persist
    }).concat(logger), // thunk è già incluso
});

export const persistor = persistStore(store);
export default store;


