import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Tools", to: "/tools" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const TOOLS_QUICK = [
  { label: "UPPERCASE", to: "/?tab=format" },
  { label: "Slug Generator", to: "/?tab=advanced" },
  { label: "JSON Prettify", to: "/?tab=advanced" },
  { label: "Base64 Encode", to: "/?tab=encode" },
  { label: "Extract Emails", to: "/?tab=extract" },
  { label: "Word Frequency", to: "/?tab=advanced" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ft-footer">
      {/* ── Top rule ── */}
      <div className="ft-top-rule" />

      <div className="container ft-body">
        <div className="ft-grid">
          {/* ── Col 1: Brand ── */}
          <div className="ft-brand-col">
            <div className="ft-brand">
              <FaFileAlt size={18} style={{ color: "#1a73e8" }} />
              <span className="ft-brand-name">TextUtils</span>
            </div>
            <p className="ft-brand-desc">
              A browser-native text laboratory. 61 tools. Zero uploads.
              Everything runs locally — your text stays yours.
            </p>
            <div className="ft-social">
              <a
                href="https://github.com/akanshujamwal"
                target="_blank"
                rel="noreferrer"
                className="ft-social-link"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/akanshu-jamwal/"
                target="_blank"
                rel="noreferrer"
                className="ft-social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div className="ft-col">
            <h6 className="ft-col-heading">Navigation</h6>
            <ul className="ft-link-list">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="ft-link">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Quick tools ── */}
          <div className="ft-col">
            <h6 className="ft-col-heading">Quick Tools</h6>
            <ul className="ft-link-list">
              {TOOLS_QUICK.map((t) => (
                <li key={t.label}>
                  <Link to={t.to} className="ft-link">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Developer card ── */}
          <div className="ft-col">
            <h6 className="ft-col-heading">Developer</h6>
            <div className="ft-dev-card">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQFYvGdJw_-s0A/profile-displayphoto-scale_200_200/B56ZytkWXRG4Ac-/0/1772438519800?e=1775088000&v=beta&t=5YtgCrPHCmji8exji-owDrYvD1-PLSuQmolZL38-yms"
                alt="Akanshu Jamwal"
                className="ft-dev-avatar"
              />
              <div>
                <strong className="ft-dev-name">Akanshu Jamwal</strong>
                <span className="ft-dev-role">Software Developer</span>
              </div>
            </div>
            <p className="ft-dev-bio">
              Built with React, Bootstrap&nbsp;5, and a lot of curiosity.
            </p>
            <Link to="/contact" className="ft-contact-btn">
              Say hello →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <div className="container ft-bottom-inner">
          <span className="ft-copyright">
            © {year} TextUtils — All Rights Reserved
          </span>
          <span className="ft-privacy-note">
            No data is collected or transmitted. Ever.
          </span>
        </div>
      </div>
    </footer>
  );
}
