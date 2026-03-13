// import { useState, useEffect } from "react";
// import { FaFileAlt, FaMoon, FaSun } from "react-icons/fa";
// import PropTypes from "prop-types";

// export default function Navbar({ title }) {
//   const [dark, setDark] = useState(false);
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const t = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(t);
//   }, []);

//   useEffect(() => {
//     document.body.className = dark ? "dark" : "light";
//   }, [dark]);

//   const date = time.toLocaleDateString("en-GB", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
//   const clock = time.toLocaleTimeString("en-GB", { hour12: false });

//   return (
//     <nav
//       className={`navbar navbar-expand-lg ${dark ? "navbar-dark bg-dark" : "navbar-light bg-white"} shadow-sm fixed-top`}
//     >
//       <div className="container-fluid">
//         <a className="navbar-brand d-flex align-items-center gap-2" href="/">
//           <FaFileAlt size={20} style={{ color: "#1a73e8" }} />

//           <strong style={{ color: "#1a73e8" }}>{title}</strong>
//         </a>

//         <button
//           className="navbar-toggler"
//           data-bs-toggle="collapse"
//           data-bs-target="#nav"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>

//         <div className="collapse navbar-collapse" id="nav">
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//               <a className="nav-link" href="/">
//                 Home
//               </a>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link" href="/about">
//                 About
//               </a>
//             </li>
//           </ul>

//           <div className="d-flex align-items-center gap-3">
//             <strong style={{ fontSize: 14 }}>
//               {date} | {clock}
//             </strong>

//             <button
//               className="btn btn-sm btn-outline-secondary"
//               onClick={() => setDark(!dark)}
//             >
//               {dark ? <FaSun /> : <FaMoon />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// Navbar.propTypes = { title: PropTypes.string };
// Navbar.defaultProps = { title: "TextUtils" };
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaFileAlt } from "react-icons/fa";
import PropTypes from "prop-types";

export default function Navbar(props) {
  const [theme, setTheme] = useState("light");

  const [time, setTime] = useState(new Date());

  /* Load saved theme */

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";

    setTheme(savedTheme);

    document.body.classList.add(savedTheme);
  }, []);

  /* Update time */

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* Toggle theme */

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    document.body.classList.remove(theme);

    document.body.classList.add(newTheme);

    localStorage.setItem("theme", newTheme);

    setTheme(newTheme);
  };

  /* Date format */

  const date = time.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const clock = time.toLocaleTimeString("en-GB");

  return (
    <nav
      className={`navbar navbar-expand-lg ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-white"} shadow-sm`}
    >
      <div className="container-fluid">
        {/* Logo */}

        <a className="navbar-brand d-flex align-items-center gap-2" href="/">
          <FaFileAlt size={20} style={{ color: "#1a73e8" }} />

          <strong style={{ color: "#1a73e8" }}>{props.title}</strong>
        </a>

        {/* Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Center links */}

          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>

          {/* Right side */}

          <div className="d-flex align-items-center gap-3">
            <strong style={{ fontSize: "14px" }}>
              {date} | {clock}
            </strong>

            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline-secondary"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
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