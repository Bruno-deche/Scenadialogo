// ✅ src/pages/Subscription.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 💳 Subscription
 * Pagina di scelta piano di abbonamento (radio button).
 * Al submit, mostra conferma e reindirizza al login.
 */
function Subscription() {
  const [piano, setPiano] = useState("");         // Stato del piano selezionato
  const navigate = useNavigate();                 // Hook per navigazione

  /**
   * 📥 handleChange
   * Aggiorna lo stato in base al piano selezionato
   */
  const handleChange = (e) => {
    setPiano(e.target.value);
  };

  /**
   * 📤 handleSubmit
   * Mostra conferma e reindirizza al login
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!piano) {
      alert("⚠️ Seleziona un piano di abbonamento");
      return;
    }

    console.log("Abbonamento selezionato:", piano);
    alert(`Hai scelto il piano: ${piano}`);

    // ✅ Dopo conferma → vai al login
    navigate("/login");
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#6668ac" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow w-100"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">Scegli un piano di abbonamento</h2>

        {/* 🎯 Opzioni di abbonamento */}
        <div className="mb-3">
          {/* Piano mensile */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="piano"
              id="mensile"
              value="Mensile - 9,99€"
              checked={piano === "Mensile - 9,99€"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="mensile">
              Mensile - 9,99€
            </label>
          </div>

          {/* Piano annuale */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="piano"
              id="annuale"
              value="Annuale - 99,99€"
              checked={piano === "Annuale - 99,99€"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="annuale">
              Annuale - 99,99€
            </label>
          </div>

          {/* Piano premium */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="piano"
              id="premium"
              value="Premium - 149,99€"
              checked={piano === "Premium - 149,99€"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="premium">
              Premium - 149,99€ (con extra)
            </label>
          </div>
        </div>

        {/* Pulsante di conferma */}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Conferma abbonamento
        </button>
      </form>
    </div>
  );
}

export default Subscription;


