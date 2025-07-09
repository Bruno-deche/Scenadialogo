// ✅ src/pages/UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

/**
 * 👤 UserProfile
 * Pagina del profilo utente, mostra dati personali, cambio password, gestione gruppi e abbonamento.
 * Accesso consentito solo se esiste un oggetto `userData` in localStorage.
 */
const UserProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", role: "" });
  const navigate = useNavigate();

  // ✅ Recupera i dati dell’utente dal localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  /**
   * 🚪 Logout
   * Cancella tutti i dati salvati e reindirizza alla login.
   */
  const handleLogout = () => {
    localStorage.clear();
    alert("Sei stato disconnesso.");
    navigate("/login");
  };

  /**
   * 🔑 Cambio password
   * Valida la password attuale e salva la nuova se corretta.
   */
  const handlePasswordChange = (e) => {
    e.preventDefault();

    const oldPw = e.target.oldPassword.value.trim();
    const newPw = e.target.newPassword.value.trim();
    const confirmPw = e.target.confirmPassword.value.trim();
    const storedPassword = localStorage.getItem("userPassword");

    if (!oldPw || !newPw || !confirmPw) {
      alert("Tutti i campi sono obbligatori.");
      return;
    }
    if (oldPw !== storedPassword) {
      alert("❌ La password attuale non è corretta.");
      return;
    }
    if (newPw.length < 6) {
      alert("❌ La nuova password deve contenere almeno 6 caratteri.");
      return;
    }
    if (newPw !== confirmPw) {
      alert("❌ Le nuove password non coincidono.");
      return;
    }

    localStorage.setItem("userPassword", newPw);
    alert("✅ Password modificata con successo!");
    e.target.reset();
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#6668ac", fontFamily: "Verdana" }}
    >
      <Navbar />

      <div className="container flex-grow-1 pt-5 mt-5 text-white">
        <div className="row">
          {/* 📂 Menu laterale */}
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Menu Profilo</h5>
                <ul className="list-group list-group-flush">
                  <a href="#dati" className="list-group-item">Dati Personali</a>
                  <a href="#modifica" className="list-group-item">Modifica Profilo</a>
                  <a href="#password" className="list-group-item">Password</a>
                  <a href="#abbonamento" className="list-group-item">Abbonamento</a>
                  <a href="#gruppi" className="list-group-item">Gruppi</a>
                  <li className="list-group-item text-danger" role="button" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 🔍 Sezioni contenuto */}
          <div className="col-md-9">
            <div className="d-flex flex-column gap-4">

              {/* 📇 Dati utente */}
              <section id="dati" className="card shadow-sm">
                <div className="card-header bg-primary text-white">Dati Personali</div>
                <div className="card-body">
                  <p><strong>Nome:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Ruolo:</strong> {user.role}</p>
                </div>
              </section>

              {/* ✏️ Modifica (placeholder) */}
              <section id="modifica" className="card shadow-sm">
                <div className="card-header bg-primary text-white">Modifica Profilo</div>
                <div className="card-body">
                  <p>Qui potrai modificare i dati personali dell’utente.</p>
                </div>
              </section>

              {/* 🔒 Cambio password */}
              <section id="password" className="card shadow-sm">
                <div className="card-header bg-primary text-white">Password</div>
                <div className="card-body">
                  <form onSubmit={handlePasswordChange}>
                    <div className="mb-3">
                      <label className="form-label">Password attuale</label>
                      <input type="password" name="oldPassword" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nuova password</label>
                      <input type="password" name="newPassword" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Conferma nuova password</label>
                      <input type="password" name="confirmPassword" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-success">Salva nuova password</button>
                  </form>
                </div>
              </section>

              {/* 📦 Abbonamento (placeholder) */}
              <section id="abbonamento" className="card shadow-sm">
                <div className="card-header bg-primary text-white">Abbonamento</div>
                <div className="card-body">
                  <p>Dettagli e stato dell’abbonamento utente.</p>
                </div>
              </section>

              {/* 💬 Gruppi (placeholder) */}
              <section id="gruppi" className="card shadow-sm">
                <div className="card-header bg-primary text-white">Gruppi</div>
                <div className="card-body">
                  <p>Community, gruppi iscritti e gestione.</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;




