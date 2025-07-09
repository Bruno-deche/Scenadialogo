// ✅ Importa Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Import React e router
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ✅ Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';

// ✅ Protected Route
import ProtectedRoute from './components/ProtectedRoute.jsx';

// ✅ Import pagine
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Subscription from './pages/Subscription.jsx';
import CommunityRegister from './pages/CommunityRegister.jsx';

import Film from './pages/Film.jsx';
import Series from './pages/Series.jsx';
import FilmDetail from './pages/FilmDetail.jsx';
import SeriesDetail from './pages/SeriesDetail.jsx';

import CommunityGroupPage from './pages/CommunityGroupPage.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DashboardContent from './pages/DashboardContent.jsx'; // ✅ NUOVA PAGINA AGGIUNTA

import Logout from './pages/Logout.jsx';
import NotFound from './pages/NotFound.jsx';

// ✅ CSS globale
import './index.css';
import './styles/global.css';

// ✅ Rendering applicazione con Redux + Persist
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            {/* ✅ Pubbliche */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/subscribe" element={<Subscription />} />
            <Route path="/logout" element={<Logout />} />

            {/* ✅ Pagine protette (tutti i ruoli) */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/film" element={<ProtectedRoute><Film /></ProtectedRoute>} />
            <Route path="/series" element={<ProtectedRoute><Series /></ProtectedRoute>} />
            <Route path="/film/:id" element={<ProtectedRoute><FilmDetail /></ProtectedRoute>} />
            <Route path="/series/:id" element={<ProtectedRoute><SeriesDetail /></ProtectedRoute>} />

            {/* ✅ Community (solo community e admin) */}
            <Route
              path="/community-register"
              element={<ProtectedRoute allowedRoles={['community', 'admin']}><CommunityRegister /></ProtectedRoute>}
            />
            <Route
              path="/community/:groupName"
              element={<ProtectedRoute allowedRoles={['community', 'admin']}><CommunityGroupPage /></ProtectedRoute>}
            />

            {/* ✅ Profilo (tutti i ruoli loggati) */}
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

            {/* ✅ Admin */}
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/content" element={<ProtectedRoute allowedRoles={['admin']}><DashboardContent /></ProtectedRoute>} />

            {/* ✅ Pagina 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

















