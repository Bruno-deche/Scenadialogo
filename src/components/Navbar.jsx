import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import logo from "../assets/image/logo_scenadialogo.png"; // ✅ Logo importato

/**
 * Componente Navbar
 *
 * Barra di navigazione fissa in alto con:
 * - Logo cliccabile
 * - Collegamenti principali (Home, Film, Serie, Community)
 * - Area utente con dropdown (Profilo, Abbonamento, Gruppi, Logout)
 * 
 * La navbar è visibile in tutte le pagine e si adatta in base al ruolo utente.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  /**
   * Mostra o nasconde il menu a tendina se l'utente è loggato,
   * altrimenti reindirizza alla pagina di login.
   */
  const handleUserClick = () => {
    if (user) {
      setShowDropdown((prev) => !prev);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav
      className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "70px",
        backgroundColor: "#6668ac",
        zIndex: 1050,
      }}
    >
      {/* LOGO */}
      <Link to="/home" className="d-flex align-items-center text-decoration-none">
        <img
          src={logo}
          alt="Logo ScenaDialogo"
          className="me-2"
          style={{ height: "40px", width: "auto" }}
        />
      </Link>

      {/* NAV LINKS */}
      <div className="d-flex gap-4">
        <Link to="/home" className="text-white text-decoration-none fw-medium">Home</Link>
        <Link to="/film" className="text-white text-decoration-none fw-medium">Film</Link>
        <Link to="/series" className="text-white text-decoration-none fw-medium">Serie</Link>
        {(role === "community" || role === "admin") && (
          <Link to="/community-register" className="text-white text-decoration-none fw-medium">Community</Link>
        )}
      </div>

      {/* USER AREA */}
      <div className="position-relative">
        <div
          className="d-flex align-items-center gap-2 text-white fw-medium"
          style={{ cursor: "pointer" }}
          onClick={handleUserClick}
        >
          {user && <>Ciao, {user}. Benvenuto!</>}
          <span className="fs-5">👤</span>
        </div>

        {/* DROPDOWN MENU */}
        {showDropdown && (
          <div
            className="position-absolute end-0 mt-2 bg-white rounded shadow-sm"
            style={{ zIndex: 2000 }}
          >
            <ul className="list-unstyled m-0 p-2">
              <li>
                <Link to="/profile" className="dropdown-item text-dark" onClick={() => setShowDropdown(false)}>
                  📄 Profilo
                </Link>
              </li>
              <li>
                <Link to="/subscribe" className="dropdown-item text-dark" onClick={() => setShowDropdown(false)}>
                  🧾 Abbonamento
                </Link>
              </li>
              {(role === "community" || role === "admin") && (
                <li>
                  <Link to="/community-register" className="dropdown-item text-dark" onClick={() => setShowDropdown(false)}>
                    📂 Gruppi
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/"
                  className="dropdown-item text-danger"
                  onClick={() => {
                    dispatch(logout());
                    localStorage.clear();
                    setShowDropdown(false);
                    navigate("/");
                  }}
                >
                  🚪 Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;











