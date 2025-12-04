import React, { useState } from "react";

export default function TextForm(props) {
  const handleOnChange = (event) => {
    console.log("on change");
    setText(event.target.value);
  };

  const handleUpClick = () => {
    console.log("Uppercase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
  };
  const handleLowClick = () => {
    console.log("Lowercase was clicked" + text);
    let newText = text.toLowerCase();
    setText(newText);
  };
  const handleClearClick = () => {
    console.log("Lowercase was clicked" + text);
    let newText = "";
    setText(newText);
  };
  const handleCopyClick = () => {
    console.log("I am copy");
    let text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };

  // 1. Capitalize Each Word
  const handleCapitalizeEach = () => {
    let newText = text.replace(/\b\w/g, (char) => char.toUpperCase());
    setText(newText);
  };

  // 2. Sentence Case
  const handleSentenceCase = () => {
    let newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    setText(newText);
  };

  // 3. Reverse Entire Text
  const handleReverseText = () => {
    let newText = text.split("").reverse().join("");
    setText(newText);
  };

  // 4. Reverse Each Word
  const handleReverseWords = () => {
    let newText = text
      .split(" ")
      .map((word) => word.split("").reverse().join(""))
      .join(" ");
    setText(newText);
  };

  // 5. Remove Numbers
  const handleRemoveNumbers = () => {
    let newText = text.replace(/[0-9]/g, "");
    setText(newText);
  };

  // 6. Remove Special Characters
  const handleRemoveSpecialChars = () => {
    let newText = text.replace(/[^a-zA-Z0-9 ]/g, "");
    setText(newText);
  };

  // 7. Fix Multiple Newlines
  const handleFixNewLines = () => {
    let newText = text.replace(/\n+/g, "\n");
    setText(newText);
  };

  // 8. Alternating Case
  const handleAlternatingCase = () => {
    let newText = text
      .split("")
      .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("");
    setText(newText);
  };

  // 9. Title Case
  const handleTitleCase = () => {
    let newText = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(newText);
  };

  // 10. Extract Numbers
  const handleExtractNumbers = () => {
    let newText = text.match(/\d+/g);
    setText(newText ? newText.join(" ") : "");
  };

  // 11. Extract Alphabets
  const handleExtractAlphabets = () => {
    let newText = text.replace(/[^A-Za-z]/g, "");
    setText(newText);
  };

  // 12. Sort Words Alphabetically
  const handleSortWords = () => {
    let newText = text.split(" ").sort().join(" ");
    setText(newText);
  };

  // 13. Count Sentences (returns alert)
  const handleCountSentences = () => {
    let sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
    alert("Total Sentences: " + sentenceCount);
  };

  // 14. Remove Duplicate Words
  const handleRemoveDuplicates = () => {
    let words = text.split(" ");
    let uniqueWords = [...new Set(words)];
    setText(uniqueWords.join(" "));
  };

  // 15. Find & Replace
  // Usage: handleFindReplace("old","new")
  const handleFindReplace = (findWord, replaceWord) => {
    let newText = text.replaceAll(findWord, replaceWord);
    setText(newText);
  };

  // 16. Trim Spaces (start + end)
  const handleTrimSpaces = () => {
    let newText = text.trim();
    setText(newText);
  };
  const [text, setText] = useState("");
  return (
    <>
      <div cllassName="container">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>
          Convert to Lowercase
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>
          Copy Text
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>

        {/* New Advanced Functions */}
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleCapitalizeEach}
        >
          Capitalize Each Word
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleSentenceCase}
        >
          Sentence Case
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleReverseText}
        >
          Reverse Text
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleReverseWords}
        >
          Reverse Each Word
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleRemoveNumbers}
        >
          Remove Numbers
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleRemoveSpecialChars}
        >
          Remove Special Characters
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleFixNewLines}
        >
          Fix Line Breaks
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleAlternatingCase}
        >
          Alternating Case
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleTitleCase}>
          Title Case
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtractNumbers}
        >
          Extract Numbers
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtractAlphabets}
        >
          Extract Alphabets
        </button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleSortWords}>
          Sort Words A–Z
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleCountSentences}
        >
          Count Sentences
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleRemoveDuplicates}
        >
          Remove Duplicate Words
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={() => handleFindReplace("old", "new")}
        >
          Find & Replace
        </button>

        <button
          className="btn btn-primary mx-1 my-1"
          onClick={handleTrimSpaces}
        >
          Trim Spaces
        </button>
      </div>
      <div className="container my-2 my-1">
        <h2>Your Text Summary</h2>
        <p>
          {(() => {
            const trimmed = text.trim();

            if (trimmed.length === 0) {
              return "0 words and 0 characters, approx 0 minutes read.";
            }

            const words = trimmed.split(/\s+/).length;
            const characters = text.length;
            const minutes = words * 0.008;

            return `${words} words and ${characters} characters, approx ${minutes.toFixed(
              2
            )} minutes read.`;
          })()}
        </p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}
