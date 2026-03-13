import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFont,
  FaBroom,
  FaRandom,
  FaCode,
  FaSearch,
  FaPen,
  FaCog,
  FaArrowRight,
} from "react-icons/fa";

const categories = [
  {
    key: "format",
    icon: <FaFont />,
    label: "Text Formatting",
    color: "cat-blue",
    desc: "Change case, style and structure of your text instantly.",
    tools: [
      "UPPERCASE",
      "lowercase",
      "Title Case",
      "Sentence Case",
      "Capitalize Words",
      "Alternating Case",
      "Invert Case",
      "camelCase",
      "snake_case",
      "PascalCase",
    ],
  },
  {
    key: "cleanup",
    icon: <FaBroom />,
    label: "Text Cleanup",
    color: "cat-green",
    desc: "Strip noise — spaces, numbers, HTML, punctuation and more.",
    tools: [
      "Remove Extra Spaces",
      "Remove Empty Lines",
      "Remove Numbers",
      "Remove Special Chars",
      "Remove Punctuation",
      "Remove HTML Tags",
      "Trim Lines",
      "Normalize Line Breaks",
      "Add Line Numbers",
      "Remove Line Numbers",
    ],
  },
  {
    key: "transform",
    icon: <FaRandom />,
    label: "Transform",
    color: "cat-purple",
    desc: "Reverse, sort, shuffle, and rearrange text in creative ways.",
    tools: [
      "Reverse Text",
      "Reverse Words",
      "Reverse Sentences",
      "Shuffle Words",
      "Sort Words A–Z",
      "Sort Words Z–A",
      "Sort Lines A–Z",
      "Sort Lines Z–A",
      "Shuffle Lines",
      "ROT13",
    ],
  },
  {
    key: "encode",
    icon: <FaCode />,
    label: "Encode / Decode",
    color: "cat-orange",
    desc: "Base64, URL, HTML encoding and binary conversion.",
    tools: [
      "Encode Base64",
      "Decode Base64",
      "Encode URL",
      "Decode URL",
      "Encode HTML",
      "Decode HTML",
      "Text → Binary",
      "Binary → Text",
    ],
  },
  {
    key: "extract",
    icon: <FaSearch />,
    label: "Data Extraction",
    color: "cat-red",
    desc: "Pull emails, URLs, phones, hashtags, @mentions and more.",
    tools: [
      "Extract Emails",
      "Extract URLs",
      "Extract Phones",
      "Extract Numbers",
      "Extract Hashtags",
      "Extract @Mentions",
      "Extract Sentences",
      "Extract Alphabets",
    ],
  },
  {
    key: "writing",
    icon: <FaPen />,
    label: "Writing Tools",
    color: "cat-teal",
    desc: "Fix duplicates, capitalization and stop words for clean copy.",
    tools: [
      "Remove Duplicate Words",
      "Remove Duplicate Lines",
      "Remove Repeated Sentences",
      "Fix Capitalization",
      "Remove Stop Words",
      "Count Vowels",
      "Count Consonants",
    ],
  },
  {
    key: "advanced",
    icon: <FaCog />,
    label: "Advanced",
    color: "cat-gray",
    desc: "Slug generator, JSON formatter, word frequency and more.",
    tools: [
      "Slug Generator",
      "Sentence Splitter",
      "Word Frequency",
      "JSON Prettify",
      "JSON Minify",
      "Wrap at 80 chars",
    ],
  },
];

const totalTools = categories.reduce((s, c) => s + c.tools.length, 0);

function highlight(text, query) {
  const idx = text.toLowerCase().indexOf(query);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="tools-highlight">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  const filtered = categories
    .map((cat) => ({
      ...cat,
      tools: q
        ? cat.tools.filter((t) => t.toLowerCase().includes(q))
        : cat.tools,
    }))
    .filter((cat) => (q ? cat.tools.length > 0 : true));

  const matchCount = filtered.reduce((s, c) => s + c.tools.length, 0);

  return (
    <div className="tools-page-v2">
      {/* ── Hero ── */}
      <div className="tp-hero">
        <div className="container tp-hero-inner">
          <span className="tp-eyebrow">
            <span className="tp-eyebrow-line" />
            Browse
            <span className="tp-eyebrow-line" />
          </span>
          <h1 className="tp-hero-title">
            All <em>Tools</em>
          </h1>
          <p className="tp-hero-sub">
            {totalTools} tools across {categories.length} categories — free,
            instant, private.
          </p>

          {/* Search */}
          <div className="tp-search-wrap">
            <FaSearch className="tp-search-icon" />
            <input
              className="tp-search-input"
              type="text"
              placeholder={`Search ${totalTools} tools…`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                className="tp-search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear"
              >
                ×
              </button>
            )}
          </div>
          {q && (
            <p className="tp-search-count">
              {matchCount} result{matchCount !== 1 ? "s" : ""} for &ldquo;
              {query}&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="container tp-grid-wrap">
        {filtered.length === 0 ? (
          <div className="tp-empty">
            <p>No tools match &ldquo;{query}&rdquo;</p>
            <button
              className="btn btn-sm tab-btn mt-2"
              onClick={() => setQuery("")}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="tp-grid">
            {filtered.map((cat, ci) => (
              <div
                className={`tp-card ${cat.color}`}
                key={cat.key}
                style={{ "--ci": ci }}
              >
                <div className="tp-card-head">
                  <span className="tp-card-icon">{cat.icon}</span>
                  <div>
                    <h3 className="tp-card-title">{cat.label}</h3>
                    <p className="tp-card-desc">{cat.desc}</p>
                  </div>
                </div>

                <ul className="tp-tool-list">
                  {cat.tools.map((tool) => (
                    <li key={tool} className="tp-tool-item">
                      <span className="tp-tool-dot" />
                      {q ? highlight(tool, q) : tool}
                    </li>
                  ))}
                </ul>

                <Link to={`/?tab=${cat.key}`} className="tp-card-cta">
                  Open {cat.label} <FaArrowRight size={10} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
