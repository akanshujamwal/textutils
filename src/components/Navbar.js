import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaFileAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const [theme, setTheme] = useState("light");
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  /* ── Load saved theme on mount ── */
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  /* ── Live clock ── */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ── Apply theme to BOTH <html> and <body> ── */
  const applyTheme = (t) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(t);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(t);
    localStorage.setItem("theme", t);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  };

  /* ── Formatted date / time ── */
  const date = time.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const clock = time.toLocaleTimeString("en-GB");

  /* ── Active route helper ── */
  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        theme === "dark" ? "navbar-dark" : "navbar-light"
      }`}
    >
      <div className="container">
        {/* ── Logo / Brand ── */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <FaFileAlt size={20} style={{ color: "#1a73e8" }} />
          <strong style={{ color: "#1a73e8" }}>{props.title}</strong>
        </Link>

        {/* ── Mobile toggler ── */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* ── Center nav links ── */}
          <ul className="navbar-nav mx-auto">
            {[
              { label: "Home", to: "/" },
              { label: "Tools", to: "/tools" },
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
            ].map(({ label, to }) => (
              <li className="nav-item" key={to}>
                <Link
                  className={`nav-link nav-link-custom${isActive(to) ? " nav-link-active" : ""}`}
                  to={to}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right: clock + theme toggle ── */}
          <div className="d-flex align-items-center gap-3">
            <span className="navbar-clock">
              {date}&nbsp;&nbsp;|&nbsp;&nbsp;{clock}
            </span>

            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline-secondary theme-toggle-btn"
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
};

Navbar.defaultProps = {
  title: "TextUtils",
};
