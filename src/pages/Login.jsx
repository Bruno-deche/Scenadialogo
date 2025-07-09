// ✅ src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

/**
 * 🔐 Login
 * Pagina di accesso per utenti registrati. Supporta login simulato per ruoli `admin` e `community`.
 * Esegue validazioni lato client su email e password. Salva i dati su localStorage.
 */
function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * 📄 Lista utenti abilitati all'accesso (simulazione)
   */
  const USERS = [
    {
      role: "admin",
      email: "admin@streamnow.com",
      password: "admin123",
      displayName: "Administrator"
    },
    {
      role: "community",
      email: "user@streamnow.com",
      password: "user123",
      displayName: "Mario Rossi"
    }
  ];

  /**
   * 🔁 Gestisce le modifiche nei campi del form
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(""); // Rimuove errore in caso di modifica
  };

  /**
   * ✉️ Valida il formato email
   */
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * 🔒 Verifica che la password sia lunga tra 6 e 20 caratteri
   */
  const validatePassword = (password) => {
    return password.length >= 6 && password.length <= 20;
  };

  /**
   * 🚀 Login
   * Valida le credenziali, imposta il ruolo e reindirizza alla pagina corretta.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = form.username.trim().toLowerCase();
    const password = form.password.trim();

    // ✅ Validazione email e password
    if (!validateEmail(username)) {
      setErrorMessage("⚠️ Inserisci un'email valida (es. user@example.com)");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("⚠️ La password deve essere tra 6 e 20 caratteri.");
      return;
    }

    // 🔍 Verifica credenziali contro utenti registrati
    const matchedUser = USERS.find(
      (u) => u.email.toLowerCase() === username && u.password === password
    );

    // ✅ Login riuscito
    if (matchedUser) {
      dispatch(login({ user: matchedUser.displayName, role: matchedUser.role }));
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("role", matchedUser.role);
      localStorage.setItem("userPassword", matchedUser.password);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: matchedUser.displayName,
          email: matchedUser.email,
          role: matchedUser.role
        })
      );

      navigate(matchedUser.role === "admin" ? "/dashboard" : "/home");
    } else {
      // ❌ Credenziali errate
      setErrorMessage("❌ Nome utente o password errati.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#6668ac" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow w-100 text-center"
        style={{ maxWidth: "500px" }}
      >
        <div className="display-1 mb-4">🎬</div>
        <h2 className="mb-4">Accesso</h2>

        {/* ✉️ Campo email */}
        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">
            Email / Nome utente
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="user@streamnow.com"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* 🔒 Campo password */}
        <div className="mb-4 text-start">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="user123"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* ⚠️ Messaggio di errore */}
        {errorMessage && (
          <div className="mb-3 text-danger fw-semibold">{errorMessage}</div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Entra
        </button>
      </form>
    </div>
  );
}

export default Login;















