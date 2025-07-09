// ✅ src/pages/Subscription.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 💳 Subscription
 * Pagina per selezionare un piano di abbonamento e inserire i dati di pagamento.
 */
function Subscription() {
  // Stato del form
  const [form, setForm] = useState({
    plan: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Stato per errori di validazione
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Piani disponibili
  const plans = [
    { value: "basic", label: "Basic – €5/mese" },
    { value: "standard", label: "Standard – €10/mese" },
    { value: "premium", label: "Premium – €15/mese" },
  ];

  // Aggiornamento dinamico del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validazione del form
  const validate = () => {
    const errs = {};
    if (!form.plan) errs.plan = "Seleziona un piano.";
    if (!/^\d{16}$/.test(form.cardNumber))
      errs.cardNumber = "Numero carta non valido (16 cifre).";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry))
      errs.expiry = "Scadenza non valida (MM/YY).";
    if (!/^\d{3,4}$/.test(form.cvv))
      errs.cvv = "CVV non valido (3 o 4 cifre).";

    return errs;
  };

  // Gestione invio form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // ✅ Simulazione avvenuta con successo
    alert(`Abbonamento ${form.plan} attivato con successo!`);
    navigate("/home");
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
        <h2 className="text-center mb-4">Scegli il tuo piano</h2>

        {/* 🔘 Selezione del piano */}
        <div className="mb-3 text-start">
          <label className="form-label">Piano</label>
          <select
            name="plan"
            value={form.plan}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">-- Seleziona un piano --</option>
            {plans.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          {errors.plan && <div className="text-danger">{errors.plan}</div>}
        </div>

        {/* 🔢 Numero della carta */}
        <div className="mb-3 text-start">
          <label className="form-label">Numero Carta</label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            className="form-control"
            placeholder="1234123412341234"
          />
          {errors.cardNumber && <div className="text-danger">{errors.cardNumber}</div>}
        </div>

        {/* 📆 Scadenza e CVV */}
        <div className="mb-3 row">
          <div className="col text-start">
            <label className="form-label">Scadenza (MM/YY)</label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              className="form-control"
              placeholder="08/26"
            />
            {errors.expiry && <div className="text-danger">{errors.expiry}</div>}
          </div>
          <div className="col text-start">
            <label className="form-label">CVV</label>
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              className="form-control"
              placeholder="123"
            />
            {errors.cvv && <div className="text-danger">{errors.cvv}</div>}
          </div>
        </div>

        {/* 🟦 Pulsante conferma */}
        <button type="submit" className="btn btn-primary w-100">
          Attiva Abbonamento
        </button>
      </form>
    </div>
  );
}

export default Subscription;






