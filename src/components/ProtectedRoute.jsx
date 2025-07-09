// ✅ src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * 🔐 ProtectedRoute
 *
 * Componente per proteggere le route private in base allo stato di login e ruolo utente.
 * Verifica se l'utente è autenticato e autorizzato ad accedere alla pagina richiesta.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Il contenuto (componente) da visualizzare se autorizzato
 * @param {Array<string>} props.allowedRoles - Lista di ruoli ammessi per accedere alla route
 *
 * @returns {JSX.Element} - Il componente autorizzato oppure un <Navigate /> verso login o home
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const isLogged = localStorage.getItem("isLogged") === "true";
  const role = localStorage.getItem("role");

  // 🚫 Se l'utente non è autenticato → reindirizza al login
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Se autenticato ma il ruolo non è tra quelli autorizzati → reindirizza a home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
    // In alternativa:
    // return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Autenticazione e ruolo validi → mostra i children
  return children;
};

export default ProtectedRoute;


