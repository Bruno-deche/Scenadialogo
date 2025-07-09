// ✅ src/pages/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 🚪 Logout
 * Componente di disconnessione.
 * Cancella i dati salvati nel localStorage e reindirizza l'utente alla pagina di login.
 */
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Rimuove tutti i dati salvati (sessione, utente, ruoli, ecc.)
    localStorage.clear();

    // ✅ Reindirizza subito alla pagina di login (UX migliore)
    navigate("/login", { replace: true });

    // 🔸 Alternativa con delay:
    // setTimeout(() => {
    //   navigate("/login", { replace: true });
    // }, 1500);
  }, [navigate]);

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-[#6668ac] text-white">
      <h1 className="display-5 fw-bold">🚪 Disconnessione...</h1>
      <p className="mt-3">Sei stato disconnesso.</p>
    </div>
  );
};

export default Logout;


