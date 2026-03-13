import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

/* ── Intersection Observer hook for staggered reveal ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Reusable reveal wrapper ── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Data ── */
const stats = [
  { value: "61", label: "Tools" },
  { value: "7", label: "Categories" },
  { value: "0", label: "Data sent" },
  { value: "100%", label: "Free forever" },
];

const features = [
  {
    num: "01",
    title: "Text Formatting",
    desc: "Ten case transformations — from UPPERCASE to snake_case and PascalCase — applied in one click.",
  },
  {
    num: "02",
    title: "Cleanup",
    desc: "Strip noise: extra spaces, HTML tags, numbers, punctuation, and empty lines disappear instantly.",
  },
  {
    num: "03",
    title: "Transform",
    desc: "Reverse, sort, shuffle, ROT13 — rearrange text in ways you never thought to do by hand.",
  },
  {
    num: "04",
    title: "Encode / Decode",
    desc: "Base64, URL, HTML encoding and binary conversion. No external service required.",
  },
  {
    num: "05",
    title: "Data Extraction",
    desc: "Pull emails, URLs, phone numbers, hashtags, @mentions, and sentences out of any block of text.",
  },
  {
    num: "06",
    title: "Advanced",
    desc: "JSON prettify, slug generator, word frequency analysis, wrap at 80 chars and more.",
  },
];

const stack = [
  { name: "React 18", color: "#61dafb" },
  { name: "React Router 6", color: "#f44250" },
  { name: "Bootstrap 5", color: "#7952b3" },
  { name: "JavaScript ES6+", color: "#f7df1e" },
  { name: "CSS Variables", color: "#1a73e8" },
  { name: "Vite / CRA", color: "#646cff" },
];

export default function About() {
  return (
    <div className="about-page about-v2">
      {/* ══════════════════════════════
          HERO — full-bleed editorial header
          ══════════════════════════════ */}
      <section className="ab-hero">
        <div className="ab-hero-eyebrow">
          <span className="ab-eyebrow-line" />
          About the project
          <span className="ab-eyebrow-line" />
        </div>

        <h1 className="ab-hero-title">
          Text&thinsp;<em>Utils</em>
        </h1>

        <p className="ab-hero-tagline">
          A browser-native text laboratory. No accounts, no uploads, no
          telemetry — just your text and 61 tools that work at the speed of
          thought.
        </p>

        <div className="ab-hero-cta">
          <Link to="/" className="ab-cta-primary">
            Open the editor <FaArrowRight size={12} />
          </Link>
          <Link to="/tools" className="ab-cta-ghost">
            Browse all tools
          </Link>
        </div>

        {/* decorative ruled line */}
        <div className="ab-hero-rule" />
      </section>

      {/* ══════════════════════════════
          STATS ROW
          ══════════════════════════════ */}
      <section className="ab-stats-row container">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="ab-stat">
              <span className="ab-stat-value">{s.value}</span>
              <span className="ab-stat-label">{s.label}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ══════════════════════════════
          PHILOSOPHY — large pull quote
          ══════════════════════════════ */}
      <section className="ab-quote-section container">
        <Reveal>
          <blockquote className="ab-quote">
            "The best tool is the one that gets out of your way. TextUtils runs
            entirely in your browser — your text never touches a server."
          </blockquote>
        </Reveal>
      </section>

      {/* ══════════════════════════════
          FEATURES GRID — editorial numbered list
          ══════════════════════════════ */}
      <section className="ab-features container">
        <Reveal>
          <div className="ab-section-header">
            <span className="ab-section-label">What it does</span>
            <h2 className="ab-section-title">
              Six categories. Sixty-one tools.
            </h2>
          </div>
        </Reveal>

        <div className="ab-features-grid">
          {features.map((f, i) => (
            <Reveal key={f.num} delay={i * 60}>
              <div className="ab-feature-card">
                <span className="ab-feature-num">{f.num}</span>
                <div className="ab-feature-body">
                  <h3 className="ab-feature-title">{f.title}</h3>
                  <p className="ab-feature-desc">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          TECH STACK — horizontal pill ticker
          ══════════════════════════════ */}
      <section className="ab-stack-section">
        <Reveal>
          <div
            className="container ab-section-header"
            style={{ marginBottom: "28px" }}
          >
            <span className="ab-section-label">Built with</span>
            <h2 className="ab-section-title">Technology stack</h2>
          </div>
        </Reveal>
        <div className="ab-stack-ticker-wrap">
          {/* duplicate for seamless loop */}
          {[...stack, ...stack].map((s, i) => (
            <span
              key={i}
              className="ab-stack-pill"
              style={{ "--accent": s.color }}
            >
              <span className="ab-stack-dot" />
              {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          DEVELOPER — magazine asymmetric spread
          ══════════════════════════════ */}
      <section className="ab-dev-section container">
        <Reveal>
          <div className="ab-section-header">
            <span className="ab-section-label">The human behind it</span>
            <h2 className="ab-section-title">Developer</h2>
          </div>
        </Reveal>

        <div className="ab-dev-grid">
          {/* left — photo column */}
          <Reveal delay={0} className="ab-dev-photo-col">
            <div className="ab-dev-photo-wrap">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQFYvGdJw_-s0A/profile-displayphoto-scale_200_200/B56ZytkWXRG4Ac-/0/1772438519800?e=1775088000&v=beta&t=5YtgCrPHCmji8exji-owDrYvD1-PLSuQmolZL38-yms"
                alt="Akanshu Jamwal"
                className="ab-dev-photo"
              />
              {/* floating name card */}
              <div className="ab-dev-namecard">
                <strong>Akanshu Jamwal</strong>
                <span>Software Developer</span>
              </div>
            </div>
          </Reveal>

          {/* right — bio column */}
          <Reveal delay={100} className="ab-dev-bio-col">
            <p className="ab-dev-intro">
              I build digital tools that are fast, private, and genuinely
              useful.
            </p>
            <p className="ab-dev-body">
              TextUtils started as a React learning project and grew into a
              real-world utility I use daily. The goal was simple: demonstrate
              what clean component architecture, thoughtful UX, and
              zero-dependency design can produce together.
            </p>
            <p className="ab-dev-body">
              I'm continuously shipping, experimenting with new patterns, and
              pushing toward better products and user experiences.
            </p>

            <div className="ab-dev-links">
              <a
                href="https://github.com/akanshujamwal"
                target="_blank"
                rel="noreferrer"
                className="ab-dev-link ab-dev-link--github"
              >
                <FaGithub size={15} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/akanshu-jamwal/"
                target="_blank"
                rel="noreferrer"
                className="ab-dev-link ab-dev-link--linkedin"
              >
                <FaLinkedin size={15} />
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      
    </div>
  );
}
