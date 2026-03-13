import { useState, useRef, useCallback } from "react";
import {
  FaCopy,
  FaTrash,
  FaUndo,
  FaClipboard,
  FaDownload,
  FaCheck,
} from "react-icons/fa";

function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  }, []);
  return [toast, show];
}

export default function TextForm() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("format");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);
  const [toast, showToast] = useToast();
  const textareaRef = useRef(null);

  const run = (fn) => {
    setHistory((h) => [...h.slice(-19), inputText]);
    setOutputText(fn(inputText));
  };

  const applyOutput = () => {
    if (!outputText) return;
    setHistory((h) => [...h.slice(-19), inputText]);
    setInputText(outputText);
    setOutputText("");
    showToast("Output moved to editor");
  };

  const undo = () => {
    if (!history.length) return;
    setInputText(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
    showToast("Undone");
  };

  const clear = () => {
    setHistory((h) => [...h.slice(-19), inputText]);
    setInputText("");
    setOutputText("");
    showToast("Cleared");
  };

  /* Auto-clear preview whenever the editor is manually emptied */
  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (e.target.value === "") setOutputText("");
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setHistory((h) => [...h.slice(-19), inputText]);
      setInputText(text);
      showToast("Pasted from clipboard");
    } catch {
      showToast("Clipboard access denied", "error");
    }
  };

  const copyOutput = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      showToast("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Copy failed", "error");
    }
  };

  const downloadOutput = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "textutils-output.txt";
    a.click();
    showToast("Downloaded");
  };

  /* ── TOOLS ── */
  const toUpper = (t) => t.toUpperCase();
  const toLower = (t) => t.toLowerCase();
  const titleCase = (t) =>
    t
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  const sentenceCase = (t) =>
    t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  const capitalizeEachWord = (t) => t.replace(/\b\w/g, (c) => c.toUpperCase());
  const alternatingCase = (t) =>
    t
      .split("")
      .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
      .join("");
  const invertCase = (t) =>
    t
      .split("")
      .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
      .join("");
  const camelCase = (t) =>
    t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
  const snakeCase = (t) =>
    t
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
  const pascalCase = (t) =>
    t.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\s+/g, "");

  const removeExtraSpaces = (t) => t.replace(/\s+/g, " ").trim();
  const removeEmptyLines = (t) => t.replace(/\n\s*\n/g, "\n");
  const removeNumbers = (t) => t.replace(/[0-9]/g, "");
  const removeSpecialChars = (t) => t.replace(/[^a-zA-Z0-9 \n]/g, "");
  const removeHTMLTags = (t) => t.replace(/<[^>]*>?/gm, "");
  const removePunctuation = (t) =>
    t.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "");
  const trimLines = (t) =>
    t
      .split("\n")
      .map((l) => l.trim())
      .join("\n");
  const normalizeLineBreaks = (t) =>
    t.replace(/\r\n|\r/g, "\n").replace(/\n+/g, "\n");
  const addLineNumbers = (t) =>
    t
      .split("\n")
      .map((l, i) => `${String(i + 1).padStart(3, " ")}  ${l}`)
      .join("\n");
  const removeLineNumbers = (t) => t.replace(/^\s*\d+\s+/gm, "");

  const reverseText = (t) => t.split("").reverse().join("");
  const reverseWords = (t) =>
    t
      .split(" ")
      .map((w) => w.split("").reverse().join(""))
      .join(" ");
  const reverseSentenceOrder = (t) => {
    const s = t.match(/[^.!?]+[.!?]*/g);
    return s ? s.reverse().join(" ") : "";
  };
  const shuffleWords = (t) => {
    const a = t.split(" ");
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.join(" ");
  };
  const sortWordsAZ = (t) => t.split(" ").sort().join(" ");
  const sortWordsZA = (t) => t.split(" ").sort().reverse().join(" ");
  const sortLinesAZ = (t) => t.split("\n").sort().join("\n");
  const sortLinesZA = (t) => t.split("\n").sort().reverse().join("\n");
  const shuffleLines = (t) => {
    const a = t.split("\n");
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.join("\n");
  };
  const rot13 = (t) =>
    t.replace(/[a-zA-Z]/g, (c) => {
      const b = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - b + 13) % 26) + b);
    });

  const encodeBase64 = (t) => {
    try {
      return btoa(unescape(encodeURIComponent(t)));
    } catch {
      return "Error: invalid input";
    }
  };
  const decodeBase64 = (t) => {
    try {
      return decodeURIComponent(escape(atob(t.trim())));
    } catch {
      return "Error: invalid Base64";
    }
  };
  const encodeURL = (t) => encodeURIComponent(t);
  const decodeURL = (t) => {
    try {
      return decodeURIComponent(t);
    } catch {
      return "Error: invalid encoding";
    }
  };
  const encodeHTML = (t) =>
    t
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  const decodeHTML = (t) =>
    t
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  const textToBinary = (t) =>
    t
      .split("")
      .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  const binaryToText = (t) => {
    try {
      return t
        .trim()
        .split(/\s+/)
        .map((b) => String.fromCharCode(parseInt(b, 2)))
        .join("");
    } catch {
      return "Error: invalid binary";
    }
  };

  const extractEmails = (t) =>
    (t.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi) || []).join("\n");
  const extractURLs = (t) => (t.match(/https?:\/\/[^\s]+/gi) || []).join("\n");
  const extractPhones = (t) => (t.match(/\+?\d[\d -]{8,}\d/g) || []).join("\n");
  const extractNumbers = (t) => (t.match(/\d+(\.\d+)?/g) || []).join(" ");
  const extractHashtags = (t) => (t.match(/#\w+/g) || []).join(" ");
  const extractMentions = (t) => (t.match(/@\w+/g) || []).join(" ");
  const extractAlphabets = (t) => t.replace(/[^A-Za-z]/g, "");
  const extractSentences = (t) =>
    (t.match(/[^.!?]+[.!?]+/g) || []).map((s) => s.trim()).join("\n");

  const removeDuplicateWords = (t) => [...new Set(t.split(/\s+/))].join(" ");
  const removeDuplicateLines = (t) => [...new Set(t.split("\n"))].join("\n");
  const removeRepeatedSentences = (t) =>
    [...new Set(t.split(/[.!?]+/))].join(". ");
  const fixCapitalization = (t) =>
    t.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const slugGenerator = (t) =>
    t
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  const removeStopWords = (t) => {
    const sw = new Set([
      "the",
      "is",
      "a",
      "an",
      "of",
      "in",
      "on",
      "at",
      "to",
      "for",
      "and",
      "or",
      "but",
      "with",
      "by",
      "from",
      "as",
      "be",
      "was",
      "are",
      "were",
      "has",
      "have",
      "had",
      "it",
      "its",
      "that",
      "this",
    ]);
    return t
      .split(/\s+/)
      .filter((w) => !sw.has(w.toLowerCase()))
      .join(" ");
  };
  const sentenceSplitter = (t) =>
    (t.match(/[^.!?]+[.!?]*/g) || []).map((s) => s.trim()).join("\n");
  const wordFrequency = (t) => {
    const words = t
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    const freq = {};
    words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([w, c]) => `${w.padEnd(20)} × ${c}`)
      .join("\n");
  };
  const jsonPrettify = (t) => {
    try {
      return JSON.stringify(JSON.parse(t), null, 2);
    } catch {
      return "Error: invalid JSON";
    }
  };
  const jsonMinify = (t) => {
    try {
      return JSON.stringify(JSON.parse(t));
    } catch {
      return "Error: invalid JSON";
    }
  };
  const wrapText = (t) => {
    const width = 80;
    return t
      .split("\n")
      .map((line) => {
        if (line.length <= width) return line;
        const words = line.split(" ");
        let cur = "",
          result = [];
        words.forEach((w) => {
          if ((cur + " " + w).trim().length > width) {
            result.push(cur.trim());
            cur = w;
          } else cur = (cur + " " + w).trim();
        });
        if (cur) result.push(cur);
        return result.join("\n");
      })
      .join("\n");
  };
  const countVowels = (t) =>
    `Vowels: ${(t.match(/[aeiouAEIOU]/g) || []).length}`;
  const countConsonants = (t) =>
    `Consonants: ${(t.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length}`;

  /* ── STATS ── */
  const words = inputText.trim() ? inputText.trim().split(/\s+/) : [];
  const wordCount = words.length;
  const charCount = inputText.length;
  const charNoSpaces = inputText.replace(/\s/g, "").length;
  const lineCount = inputText ? inputText.split("\n").length : 0;
  const sentCount = (inputText.match(/[^.!?]+[.!?]+/g) || []).length;
  const paraCount = inputText.trim()
    ? inputText.trim().split(/\n\s*\n/).length
    : 0;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase())).size;
  const longestWord = words.length
    ? words.reduce((a, b) => (a.length > b.length ? a : b))
    : "—";
  const readingTime = (wordCount * 0.008).toFixed(2);
  const speakingTime = (wordCount * 0.02).toFixed(2);

  const tools = {
    format: [
      ["UPPERCASE", () => run(toUpper)],
      ["lowercase", () => run(toLower)],
      ["Title Case", () => run(titleCase)],
      ["Sentence Case", () => run(sentenceCase)],
      ["Capitalize Words", () => run(capitalizeEachWord)],
      ["Alternating Case", () => run(alternatingCase)],
      ["Invert Case", () => run(invertCase)],
      ["camelCase", () => run(camelCase)],
      ["snake_case", () => run(snakeCase)],
      ["PascalCase", () => run(pascalCase)],
    ],
    cleanup: [
      ["Remove Extra Spaces", () => run(removeExtraSpaces)],
      ["Remove Empty Lines", () => run(removeEmptyLines)],
      ["Remove Numbers", () => run(removeNumbers)],
      ["Remove Special Chars", () => run(removeSpecialChars)],
      ["Remove Punctuation", () => run(removePunctuation)],
      ["Remove HTML Tags", () => run(removeHTMLTags)],
      ["Trim Lines", () => run(trimLines)],
      ["Normalize Line Breaks", () => run(normalizeLineBreaks)],
      ["Add Line Numbers", () => run(addLineNumbers)],
      ["Remove Line Numbers", () => run(removeLineNumbers)],
    ],
    transform: [
      ["Reverse Text", () => run(reverseText)],
      ["Reverse Words", () => run(reverseWords)],
      ["Reverse Sentences", () => run(reverseSentenceOrder)],
      ["Shuffle Words", () => run(shuffleWords)],
      ["Sort Words A–Z", () => run(sortWordsAZ)],
      ["Sort Words Z–A", () => run(sortWordsZA)],
      ["Sort Lines A–Z", () => run(sortLinesAZ)],
      ["Sort Lines Z–A", () => run(sortLinesZA)],
      ["Shuffle Lines", () => run(shuffleLines)],
      ["ROT13", () => run(rot13)],
    ],
    encode: [
      ["Encode Base64", () => run(encodeBase64)],
      ["Decode Base64", () => run(decodeBase64)],
      ["Encode URL", () => run(encodeURL)],
      ["Decode URL", () => run(decodeURL)],
      ["Encode HTML", () => run(encodeHTML)],
      ["Decode HTML", () => run(decodeHTML)],
      ["Text → Binary", () => run(textToBinary)],
      ["Binary → Text", () => run(binaryToText)],
    ],
    extract: [
      ["Extract Emails", () => run(extractEmails)],
      ["Extract URLs", () => run(extractURLs)],
      ["Extract Phones", () => run(extractPhones)],
      ["Extract Numbers", () => run(extractNumbers)],
      ["Extract Hashtags", () => run(extractHashtags)],
      ["Extract @Mentions", () => run(extractMentions)],
      ["Extract Sentences", () => run(extractSentences)],
      ["Extract Alphabets", () => run(extractAlphabets)],
    ],
    writing: [
      ["Remove Duplicate Words", () => run(removeDuplicateWords)],
      ["Remove Duplicate Lines", () => run(removeDuplicateLines)],
      ["Remove Repeated Sentences", () => run(removeRepeatedSentences)],
      ["Fix Capitalization", () => run(fixCapitalization)],
      ["Remove Stop Words", () => run(removeStopWords)],
      ["Count Vowels", () => run(countVowels)],
      ["Count Consonants", () => run(countConsonants)],
    ],
    advanced: [
      ["Slug Generator", () => run(slugGenerator)],
      ["Sentence Splitter", () => run(sentenceSplitter)],
      ["Word Frequency", () => run(wordFrequency)],
      ["JSON Prettify", () => run(jsonPrettify)],
      ["JSON Minify", () => run(jsonMinify)],
      ["Wrap at 80 chars", () => run(wrapText)],
    ],
  };

  const statItems = [
    { val: wordCount, lbl: "words" },
    { val: charCount, lbl: "chars" },
    { val: charNoSpaces, lbl: "no spaces" },
    { val: lineCount, lbl: "lines" },
    { val: sentCount, lbl: "sentences" },
    { val: paraCount, lbl: "paragraphs" },
    { val: uniqueWords, lbl: "unique" },
    { val: readingTime, lbl: "min read" },
    { val: speakingTime, lbl: "min speak" },
    { val: longestWord, lbl: "longest" },
  ];

  return (
    <div className="home-page">
      {/* ── Toast ── */}
      {toast && (
        <div
          className={`textutils-toast textutils-toast-${toast.type}`}
          role="alert"
          aria-live="polite"
        >
          {toast.type === "success" ? <FaCheck size={11} /> : "⚠"}&nbsp;&nbsp;
          {toast.msg}
        </div>
      )}

      {/* ── Editorial Hero ── */}
      <div className="home-hero">
        <div className="container home-hero-inner">
          <span className="home-hero-eyebrow">
            <span className="home-hero-eyebrow-line" />
            Text processing, reimagined
            <span className="home-hero-eyebrow-line" />
          </span>
          <h1 className="home-hero-title">
            Your text.
            <br />
            <em>Your tools.</em>
          </h1>
          <p className="home-hero-sub">
            61 tools. Zero uploads. Everything runs in your browser.
          </p>
        </div>
      </div>

      <div className="container pb-5">
        {/* ── Stats Bar ── */}
        <div className="home-stats-wrap">
          <div className="home-stats-bar">
            {statItems.map((s) => (
              <div key={s.lbl} className="home-stat-item">
                <strong>{s.val}</strong>
                <small>{s.lbl}</small>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tab row ── */}
        <div className="d-flex gap-2 mb-2 flex-wrap mt-3">
          {Object.keys(tools).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn btn-sm ${activeTab === tab ? "tab-btn-active" : "tab-btn"}`}
              style={{ textTransform: "capitalize" }}
            >
              {tab}
              <span className="tab-count">{tools[tab].length}</span>
            </button>
          ))}
        </div>

        {/* ── Tool Chips ── */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {tools[activeTab].map(([name, fn]) => (
            <button
              key={name}
              onClick={fn}
              className="tool-chip"
              disabled={!inputText}
              title={inputText ? `Apply: ${name}` : "Enter some text first"}
            >
              {name}
            </button>
          ))}
        </div>

        {/* ── Editor + Preview ── */}
        <div className="row g-3">
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="mb-0 editor-panel-label">Text Editor</h6>
                  <div className="d-flex gap-2">
                    <button
                      className="editor-action-btn"
                      onClick={pasteFromClipboard}
                      title="Paste from clipboard"
                    >
                      <FaClipboard size={12} /> Paste
                    </button>
                    <button
                      className="editor-action-btn"
                      onClick={undo}
                      disabled={!history.length}
                      title="Undo"
                    >
                      <FaUndo size={11} /> Undo
                    </button>
                    <button
                      className="editor-action-btn editor-action-btn--danger"
                      onClick={clear}
                      disabled={!inputText && !outputText}
                      title="Clear all"
                    >
                      <FaTrash size={11} /> Clear
                    </button>
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  className="form-control flex-grow-1"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Type or paste text here…"
                  style={{ minHeight: "320px", resize: "vertical" }}
                  spellCheck
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="mb-0 editor-panel-label">Preview</h6>
                  {outputText && (
                    <div className="d-flex gap-2">
                      <button
                        className="editor-action-btn"
                        onClick={applyOutput}
                        title="Use as input"
                      >
                        ← Use as Input
                      </button>
                      <button
                        className="editor-action-btn"
                        onClick={copyOutput}
                        title="Copy output"
                      >
                        {copied ? <FaCheck size={11} /> : <FaCopy size={11} />}
                        {copied ? " Copied!" : " Copy"}
                      </button>
                      <button
                        className="editor-action-btn"
                        onClick={downloadOutput}
                        title="Download as .txt"
                      >
                        <FaDownload size={11} /> Save
                      </button>
                    </div>
                  )}
                </div>
                <div className="preview-box flex-grow-1">
                  {outputText || (
                    <span className="preview-placeholder">
                      Select a tool above to see the result here
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
