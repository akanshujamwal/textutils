import { useState } from "react";

export default function TextForm() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("format");

  const run = (fn) => setOutputText(fn(inputText));

  /* ---------------- TEXT FORMATTING ---------------- */

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

  /* ---------------- CLEANUP ---------------- */

  const removeExtraSpaces = (t) => t.replace(/\s+/g, " ").trim();

  const removeEmptyLines = (t) => t.replace(/\n\s*\n/g, "\n");

  const removeNumbers = (t) => t.replace(/[0-9]/g, "");

  const removeSpecialChars = (t) => t.replace(/[^a-zA-Z0-9 ]/g, "");

  const removeHTMLTags = (t) => t.replace(/<[^>]*>?/gm, "");

  const trimSpaces = (t) => t.trim();

  const normalizeLineBreaks = (t) => t.replace(/\n+/g, "\n");

  /* ---------------- TRANSFORM ---------------- */

  const reverseText = (t) => t.split("").reverse().join("");

  const reverseWords = (t) =>
    t
      .split(" ")
      .map((w) => w.split("").reverse().join(""))
      .join(" ");

  const reverseSentenceOrder = (t) => {
    const sentences = t.match(/[^.!?]+[.!?]*/g);
    return sentences ? sentences.reverse().join(" ") : "";
  };

  const shuffleWords = (t) => {
    const arr = t.split(" ");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join(" ");
  };

  const sortWordsAZ = (t) => t.split(" ").sort().join(" ");

  const sortWordsZA = (t) => t.split(" ").sort().reverse().join(" ");

  /* ---------------- EXTRACTION ---------------- */

  const extractEmails = (t) =>
    (t.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi) || []).join("\n");

  const extractURLs = (t) => (t.match(/https?:\/\/[^\s]+/gi) || []).join("\n");

  const extractPhones = (t) => (t.match(/\+?\d[\d -]{8,}\d/g) || []).join("\n");

  const extractNumbers = (t) => (t.match(/\d+/g) || []).join(" ");

  const extractHashtags = (t) => (t.match(/#\w+/g) || []).join(" ");

  const extractAlphabets = (t) => t.replace(/[^A-Za-z]/g, "");

  /* ---------------- WRITING ---------------- */

  const removeDuplicateWords = (t) => [...new Set(t.split(" "))].join(" ");

  const removeRepeatedSentences = (t) => {
    const sentences = [...new Set(t.split(/[.!?]+/))];
    return sentences.join(". ");
  };

  const fixCapitalization = (t) =>
    t.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  /* ---------------- NEW TOOLS ---------------- */

  const slugGenerator = (t) =>
    t
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

  const removeStopWords = (t) => {
    const stopWords = ["the", "is", "a", "an", "of"];
    return t
      .split(" ")
      .filter((w) => !stopWords.includes(w.toLowerCase()))
      .join(" ");
  };

  const sentenceSplitter = (t) => t.split(/[.!?]+/).join("\n");

  const highlightWordFrequency = (t) => {
    const words = t.toLowerCase().split(/\s+/);
    const freq = {};
    words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
    return Object.entries(freq)
      .map(([w, c]) => `${w}: ${c}`)
      .join("\n");
  };
  const words = inputText.trim() ? inputText.trim().split(/\s+/) : [];

  const wordCount = words.length;
  const charCount = inputText.length;
  const charNoSpaces = inputText.replace(/\s/g, "").length;

  const longestWord = words.length
    ? words.reduce((a, b) => (a.length > b.length ? a : b))
    : "";

  const readingTime = (wordCount * 0.008).toFixed(2);
  const speakingTime = (wordCount * 0.02).toFixed(2);
  /* ---------------- TOOL GROUPS ---------------- */

  const tools = {
    format: [
      ["UPPERCASE", () => run(toUpper)],
      ["lowercase", () => run(toLower)],
      ["Title Case", () => run(titleCase)],
      ["Sentence Case", () => run(sentenceCase)],
      ["Capitalize Each Word", () => run(capitalizeEachWord)],
      ["Alternating Case", () => run(alternatingCase)],
      ["Invert Case", () => run(invertCase)],
    ],

    cleanup: [
      ["Remove Extra Spaces", () => run(removeExtraSpaces)],
      ["Remove Empty Lines", () => run(removeEmptyLines)],
      ["Remove Numbers", () => run(removeNumbers)],
      ["Remove Special Characters", () => run(removeSpecialChars)],
      ["Remove HTML Tags", () => run(removeHTMLTags)],
      ["Trim Spaces", () => run(trimSpaces)],
      ["Normalize Line Breaks", () => run(normalizeLineBreaks)],
    ],

    transform: [
      ["Reverse Text", () => run(reverseText)],
      ["Reverse Words", () => run(reverseWords)],
      ["Reverse Sentence Order", () => run(reverseSentenceOrder)],
      ["Shuffle Words", () => run(shuffleWords)],
      ["Sort Words A-Z", () => run(sortWordsAZ)],
      ["Sort Words Z-A", () => run(sortWordsZA)],
    ],

    extract: [
      ["Extract Emails", () => run(extractEmails)],
      ["Extract URLs", () => run(extractURLs)],
      ["Extract Phone Numbers", () => run(extractPhones)],
      ["Extract Numbers", () => run(extractNumbers)],
      ["Extract Hashtags", () => run(extractHashtags)],
      ["Extract Alphabets", () => run(extractAlphabets)],
    ],

    writing: [
      ["Remove Duplicate Words", () => run(removeDuplicateWords)],
      ["Remove Repeated Sentences", () => run(removeRepeatedSentences)],
      ["Fix Capitalization", () => run(fixCapitalization)],
    ],

    advanced: [
      ["Slug Generator", () => run(slugGenerator)],
      ["Remove Stop Words", () => run(removeStopWords)],
      ["Sentence Splitter", () => run(sentenceSplitter)],
      ["Word Frequency", () => run(highlightWordFrequency)],
    ],
  };

  return (
    <div className="container py-4">
      <div className="card mb-3 shadow-sm">
        <div className="card-body stats-bar">
          <span>
            <strong>Words:</strong> {wordCount}
          </span>

          <span>
            <strong>Characters:</strong> {charCount}
          </span>

          <span>
            <strong>No Spaces:</strong> {charNoSpaces}
          </span>

          <span>
            <strong>Reading:</strong> {readingTime} min
          </span>

          <span>
            <strong>Speaking:</strong> {speakingTime} min
          </span>

          <span>
            <strong>Longest Word:</strong> {longestWord}
          </span>
        </div>
      </div>
      {/* Tabs */}

      <div className="d-flex gap-2 mb-2 flex-wrap">
        {Object.keys(tools).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn btn-sm ${
              activeTab === tab ? "btn-primary" : "btn-light"
            }`}
            style={{ textTransform: "capitalize" }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chips */}

      <div className=" d-flex flex-wrap gap-3 mb-2">
        {tools[activeTab].map(([name, fn]) => (
          <button
            key={name}
            onClick={fn}
            className="tool-chip"
            disabled={!inputText}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Editor + Preview */}
      {/* Editor + Preview */}

      <div className="row g-3">
        {/* Editor */}

        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <h6 className="mb-3">Text Editor</h6>

              <textarea
                className="form-control flex-grow-1"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste text here..."
                style={{
                  minHeight: "320px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

        {/* Preview */}

        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <h6 className="mb-3">Preview</h6>

              <div
                className="flex-grow-1"
                style={{
                  whiteSpace: "pre-wrap",
                  minHeight: "320px",
                }}
              >
                {outputText || "Apply a tool to preview result"}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row g-3">
        <div className="col-lg-6">
          <textarea
            className="form-control"
            rows="12"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste text here..."
          />
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h6>Preview</h6>

              <div style={{ whiteSpace: "pre-wrap" }}>
                {outputText || "Apply a tool to preview result"}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
