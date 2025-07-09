// ✅ src/pages/Landing.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/image/logo_scenadialogo_pulito.png";

/**
 * 🎬 Landing
 * Pagina iniziale con logo, pulsanti di navigazione e offerta promozionale.
 * Funziona come punto d'ingresso per utenti non autenticati.
 */
function Landing() {
  const navigate = useNavigate(); // Hook per la navigazione programmatica

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#6668ac] text-white px-4 pt-12">
      
      {/* 🎞️ Logo principale */}
      <img
        src={logo}
        alt="Logo ScenaDialogo"
        className="w-72 mb-4 drop-shadow-lg"
      />

      {/* 🔘 Pulsanti di azione principali */}
      <div className="flex justify-center mt-3">
        {[
          { label: "Registrati", route: "/register" },
          { label: "Login", route: "/login" },
          { label: "Abbonati", route: "/subscribe" }
        ].map(({ label, route }) => (
          <button
            key={label}
            onClick={() => navigate(route)}
            className="mx-4 rounded-full py-3 px-8 text-lg font-semibold
                       bg-[#6668ac] text-white border border-white
                       shadow-[6px_6px_12px_rgba(0,0,0,0.4)]
                       hover:shadow-[8px_8px_16px_rgba(0,0,0,0.5)]
                       transition-all duration-200"
          >
            {label}
          </button>
        ))}
      </div>

      {/* 🎁 Offerta promozionale */}
      <p className="mt-4 text-sm text-orange-200 text-center max-w-xs leading-relaxed">
        Offerta esclusiva: <strong>3 mesi a 1€</strong> per i nuovi iscritti!
      </p>
    </div>
  );
}

export default Landing;














