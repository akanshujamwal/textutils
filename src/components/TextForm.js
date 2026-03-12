// import React, { useState } from "react";

// export default function TextForm(props) {
//   const handleOnChange = (event) => {
//     console.log("on change");
//     setText(event.target.value);
//   };

//   const handleUpClick = () => {
//     console.log("Uppercase was clicked" + text);
//     let newText = text.toUpperCase();
//     setText(newText);
//   };
//   const handleLowClick = () => {
//     console.log("Lowercase was clicked" + text);
//     let newText = text.toLowerCase();
//     setText(newText);
//   };
//   const handleClearClick = () => {
//     console.log("Lowercase was clicked" + text);
//     let newText = "";
//     setText(newText);
//   };
//   const handleCopyClick = () => {
//     console.log("I am copy");
//     let text = document.getElementById("myBox");
//     text.select();
//     navigator.clipboard.writeText(text.value);
//   };

//   const handleExtraSpaces = () => {
//     let newText = text.split(/[ ]+/);
//     setText(newText.join(" "));
//   };

//   // 1. Capitalize Each Word
//   const handleCapitalizeEach = () => {
//     let newText = text.replace(/\b\w/g, (char) => char.toUpperCase());
//     setText(newText);
//   };

//   // 2. Sentence Case
//   const handleSentenceCase = () => {
//     let newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
//     setText(newText);
//   };

//   // 3. Reverse Entire Text
//   const handleReverseText = () => {
//     let newText = text.split("").reverse().join("");
//     setText(newText);
//   };

//   // 4. Reverse Each Word
//   const handleReverseWords = () => {
//     let newText = text
//       .split(" ")
//       .map((word) => word.split("").reverse().join(""))
//       .join(" ");
//     setText(newText);
//   };

//   // 5. Remove Numbers
//   const handleRemoveNumbers = () => {
//     let newText = text.replace(/[0-9]/g, "");
//     setText(newText);
//   };

//   // 6. Remove Special Characters
//   const handleRemoveSpecialChars = () => {
//     let newText = text.replace(/[^a-zA-Z0-9 ]/g, "");
//     setText(newText);
//   };

//   // 7. Fix Multiple Newlines
//   const handleFixNewLines = () => {
//     let newText = text.replace(/\n+/g, "\n");
//     setText(newText);
//   };

//   // 8. Alternating Case
//   const handleAlternatingCase = () => {
//     let newText = text
//       .split("")
//       .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
//       .join("");
//     setText(newText);
//   };

//   // 9. Title Case
//   const handleTitleCase = () => {
//     let newText = text
//       .toLowerCase()
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//     setText(newText);
//   };

//   // 10. Extract Numbers
//   const handleExtractNumbers = () => {
//     let newText = text.match(/\d+/g);
//     setText(newText ? newText.join(" ") : "");
//   };

//   // 11. Extract Alphabets
//   const handleExtractAlphabets = () => {
//     let newText = text.replace(/[^A-Za-z]/g, "");
//     setText(newText);
//   };

//   // 12. Sort Words Alphabetically
//   const handleSortWords = () => {
//     let newText = text.split(" ").sort().join(" ");
//     setText(newText);
//   };

//   // 13. Count Sentences (returns alert)
//   const handleCountSentences = () => {
//     let sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
//     alert("Total Sentences: " + sentenceCount);
//   };

//   // 14. Remove Duplicate Words
//   const handleRemoveDuplicates = () => {
//     let words = text.split(" ");
//     let uniqueWords = [...new Set(words)];
//     setText(uniqueWords.join(" "));
//   };

//   // 15. Find & Replace
//   // Usage: handleFindReplace("old","new")
//   const handleFindReplace = (findWord, replaceWord) => {
//     let newText = text.replaceAll(findWord, replaceWord);
//     setText(newText);
//   };

//   // 16. Trim Spaces (start + end)
//   const handleTrimSpaces = () => {
//     let newText = text.trim();
//     setText(newText);
//   };
//   const [text, setText] = useState("");
//   return (
//     <>
//       <div cllassName="container">
//         <h1>{props.heading}</h1>
//         <div className="mb-3">
//           <textarea
//             className="form-control"
//             value={text}
//             onChange={handleOnChange}
//             id="myBox"
//             rows="8"
//           ></textarea>
//         </div>
//         <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
//           Convert to Uppercase
//         </button>

//         <button className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>
//           Convert to Lowercase
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleClearClick}
//         >
//           Clear Text
//         </button>

//         <button className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>
//           Copy Text
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleExtraSpaces}
//         >
//           Remove Extra Spaces
//         </button>

//         {/* New Advanced Functions */}
//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleCapitalizeEach}
//         >
//           Capitalize Each Word
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleSentenceCase}
//         >
//           Sentence Case
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleReverseText}
//         >
//           Reverse Text
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleReverseWords}
//         >
//           Reverse Each Word
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleRemoveNumbers}
//         >
//           Remove Numbers
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleRemoveSpecialChars}
//         >
//           Remove Special Characters
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleFixNewLines}
//         >
//           Fix Line Breaks
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleAlternatingCase}
//         >
//           Alternating Case
//         </button>

//         <button className="btn btn-primary mx-1 my-1" onClick={handleTitleCase}>
//           Title Case
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleExtractNumbers}
//         >
//           Extract Numbers
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleExtractAlphabets}
//         >
//           Extract Alphabets
//         </button>

//         <button className="btn btn-primary mx-1 my-1" onClick={handleSortWords}>
//           Sort Words A–Z
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleCountSentences}
//         >
//           Count Sentences
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleRemoveDuplicates}
//         >
//           Remove Duplicate Words
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={() => handleFindReplace("old", "new")}
//         >
//           Find & Replace
//         </button>

//         <button
//           className="btn btn-primary mx-1 my-1"
//           onClick={handleTrimSpaces}
//         >
//           Trim Spaces
//         </button>
//       </div>
//       <div className="container my-2 my-1">
//         <h2>Your Text Summary</h2>
//         <p>
//           {(() => {
//             const trimmed = text.trim();

//             if (trimmed.length === 0) {
//               return "0 words and 0 characters, approx 0 minutes read.";
//             }

//             const words = trimmed.split(/\s+/).length;
//             const characters = text.length;
//             const minutes = words * 0.008;

//             return `${words} words and ${characters} characters, approx ${minutes.toFixed(
//               2
//             )} minutes read.`;
//           })()}
//         </p>
//         <h2>Preview</h2>
//         <p>{text}</p>
//       </div>
//     </>
//   );
// }
import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const updateText = (newText) => setText(newText);

  const handleChange = (e) => updateText(e.target.value);

  /* ---------------- TEXT FORMATTING ---------------- */

  const toUpper = () => updateText(text.toUpperCase());

  const toLower = () => updateText(text.toLowerCase());

  const titleCase = () =>
    updateText(
      text
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    );

  const sentenceCase = () =>
    updateText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());

  const capitalizeEach = () =>
    updateText(text.replace(/\b\w/g, (c) => c.toUpperCase()));

  const alternatingCase = () =>
    updateText(
      text
        .split("")
        .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
    );

  const invertCase = () =>
    updateText(
      text
        .split("")
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
    );

  /* ---------------- CLEANUP ---------------- */

  const removeExtraSpaces = () => updateText(text.replace(/\s+/g, " ").trim());

  const removeEmptyLines = () => updateText(text.replace(/\n\s*\n/g, "\n"));

  const removeNumbers = () => updateText(text.replace(/[0-9]/g, ""));

  const removeSpecialChars = () =>
    updateText(text.replace(/[^a-zA-Z0-9 ]/g, ""));

  const removeHTMLTags = () => updateText(text.replace(/<[^>]*>?/gm, ""));

  const trimSpaces = () => updateText(text.trim());

  const normalizeLineBreaks = () => updateText(text.replace(/\n+/g, "\n"));

  /* ---------------- TRANSFORM ---------------- */

  const reverseText = () => updateText(text.split("").reverse().join(""));

  const reverseWords = () =>
    updateText(
      text
        .split(" ")
        .map((w) => w.split("").reverse().join(""))
        .join(" "),
    );

  const reverseSentenceOrder = () => {
    const sentences = text.match(/[^.!?]+[.!?]*/g);
    updateText(sentences ? sentences.reverse().join(" ") : "");
  };

  const shuffleWords = () => {
    const words = text.split(" ");
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    updateText(words.join(" "));
  };

  const sortWordsAZ = () => updateText(text.split(" ").sort().join(" "));

  const sortWordsZA = () =>
    updateText(text.split(" ").sort().reverse().join(" "));

  /* ---------------- EXTRACTION ---------------- */

  const extractEmails = () => {
    const emails = text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi);
    updateText(emails ? emails.join("\n") : "");
  };

  const extractURLs = () => {
    const urls = text.match(/https?:\/\/[^\s]+/gi);
    updateText(urls ? urls.join("\n") : "");
  };

  const extractPhones = () => {
    const phones = text.match(/\+?\d[\d -]{8,}\d/g);
    updateText(phones ? phones.join("\n") : "");
  };

  const extractNumbers = () => {
    const nums = text.match(/\d+/g);
    updateText(nums ? nums.join(" ") : "");
  };

  const extractAlphabets = () => updateText(text.replace(/[^A-Za-z]/g, ""));

  const extractHashtags = () => {
    const tags = text.match(/#\w+/g);
    updateText(tags ? tags.join(" ") : "");
  };

  /* ---------------- WRITING TOOLS ---------------- */

  const removeDuplicateWords = () => {
    const words = [...new Set(text.split(" "))];
    updateText(words.join(" "));
  };

  const removeRepeatedSentences = () => {
    const sentences = [...new Set(text.split(/[.!?]+/))];
    updateText(sentences.join(". "));
  };

  const fixCapitalization = () =>
    updateText(text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));

  /* ---------------- TEXT ANALYSIS ---------------- */

  const trimmed = text.trim();

  const words = trimmed === "" ? [] : trimmed.split(/\s+/);

  const wordCount = words.length;

  const charCount = text.length;

  const charNoSpaces = text.replace(/\s/g, "").length;

  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;

  const paragraphCount = text.split(/\n+/).filter(Boolean).length;

  const readingTime = (wordCount * 0.008).toFixed(2);

  const speakingTime = (wordCount * 0.02).toFixed(2);

  const avgWordLength =
    wordCount === 0
      ? 0
      : (words.reduce((sum, w) => sum + w.length, 0) / wordCount).toFixed(2);

  const longestWord =
    words.length > 0
      ? words.reduce((a, b) => (a.length > b.length ? a : b))
      : "";

  /* ---------------- UI ---------------- */

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <h1 className="text-center fw-bold mb-4">
        {props.heading || "Text Utility Pro"}
      </h1>

      <div className="container">
        <div className="row g-4">
          {/* Editor */}

          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <textarea
                  className="form-control"
                  rows="10"
                  value={text}
                  onChange={handleChange}
                  placeholder="Start typing your text..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Statistics */}

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="fw-bold">Text Statistics</h5>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Words: {wordCount}</li>

                  <li className="list-group-item">Characters: {charCount}</li>

                  <li className="list-group-item">
                    Characters (no spaces): {charNoSpaces}
                  </li>

                  <li className="list-group-item">
                    Sentences: {sentenceCount}
                  </li>

                  <li className="list-group-item">
                    Paragraphs: {paragraphCount}
                  </li>

                  <li className="list-group-item">
                    Reading Time: {readingTime} min
                  </li>

                  <li className="list-group-item">
                    Speaking Time: {speakingTime} min
                  </li>

                  <li className="list-group-item">
                    Average Word Length: {avgWordLength}
                  </li>

                  <li className="list-group-item">
                    Longest Word: {longestWord}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* TOOLS */}

        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="fw-bold">Formatting</h5>

            <button className="btn btn-primary m-1" onClick={toUpper}>
              Upper
            </button>
            <button className="btn btn-primary m-1" onClick={toLower}>
              Lower
            </button>
            <button className="btn btn-primary m-1" onClick={titleCase}>
              Title
            </button>
            <button className="btn btn-primary m-1" onClick={sentenceCase}>
              Sentence
            </button>
            <button className="btn btn-primary m-1" onClick={alternatingCase}>
              Alt Case
            </button>
            <button className="btn btn-primary m-1" onClick={invertCase}>
              Invert
            </button>

            <hr />

            <h5 className="fw-bold">Cleanup</h5>

            <button
              className="btn btn-secondary m-1"
              onClick={removeExtraSpaces}
            >
              Spaces
            </button>
            <button className="btn btn-secondary m-1" onClick={removeNumbers}>
              Numbers
            </button>
            <button
              className="btn btn-secondary m-1"
              onClick={removeSpecialChars}
            >
              Special
            </button>
            <button className="btn btn-secondary m-1" onClick={removeHTMLTags}>
              HTML
            </button>
            <button className="btn btn-secondary m-1" onClick={trimSpaces}>
              Trim
            </button>

            <hr />

            <h5 className="fw-bold">Transform</h5>

            <button className="btn btn-success m-1" onClick={reverseText}>
              Reverse
            </button>
            <button className="btn btn-success m-1" onClick={reverseWords}>
              Rev Words
            </button>
            <button className="btn btn-success m-1" onClick={shuffleWords}>
              Shuffle
            </button>
            <button className="btn btn-success m-1" onClick={sortWordsAZ}>
              Sort A-Z
            </button>
            <button className="btn btn-success m-1" onClick={sortWordsZA}>
              Sort Z-A
            </button>

            <hr />

            <h5 className="fw-bold">Extract</h5>

            <button className="btn btn-warning m-1" onClick={extractEmails}>
              Emails
            </button>
            <button className="btn btn-warning m-1" onClick={extractURLs}>
              URLs
            </button>
            <button className="btn btn-warning m-1" onClick={extractPhones}>
              Phones
            </button>
            <button className="btn btn-warning m-1" onClick={extractNumbers}>
              Numbers
            </button>
            <button className="btn btn-warning m-1" onClick={extractHashtags}>
              Hashtags
            </button>

            <hr />

            <h5 className="fw-bold">Writing</h5>

            <button
              className="btn btn-danger m-1"
              onClick={removeDuplicateWords}
            >
              Duplicate Words
            </button>

            <button
              className="btn btn-danger m-1"
              onClick={removeRepeatedSentences}
            >
              Duplicate Sentences
            </button>

            <button className="btn btn-danger m-1" onClick={fixCapitalization}>
              Fix Caps
            </button>
          </div>
        </div>

        {/* Preview */}

        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="fw-bold">Preview</h5>

            <div className="border rounded p-3 bg-white">
              {text || "Nothing to preview"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
