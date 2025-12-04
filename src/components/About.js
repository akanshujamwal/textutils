import React, { useState } from "react";

export default function About() {
  const [myStyle, setmyStyle] = useState({
    color: "black",
    backgroundColor: "white",
  });

  const [btnText, setBtnText] = useState("Enable Dark Mode");

  const toggleStyle = () => {
    if (myStyle.color === "black") {
      setmyStyle({
        color: "white",
        backgroundColor: "black",
        border: "1px solid white",
      });
      setBtnText("Enable Light Mode");
    } else {
      setmyStyle({
        color: "black",
        backgroundColor: "white",
      });
      setBtnText("Enable Dark Mode");
    }
  };
  return (
    <div className="container my-3" style={myStyle}>
      <h1 className="my-3">About TextUtils</h1>

      {/* Intro text before accordion */}
      <p className="lead">
        <strong>
          TextUtils is a lightweight and user-friendly text formatting tool
        </strong>
        designed to make editing and transforming text easier. Whether you want
        to convert text to uppercase or lowercase, remove extra spaces, count
        words and characters, or clean your text — TextUtils does it instantly.
        It works directly inside your browser, ensuring speed, privacy, and a
        smooth user experience.
      </p>

      <div className="accordion" id="accordionExample">
        {/* Accordion 1 */}
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              style={myStyle}
            >
              What is TextUtils?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <strong>
                TextUtils is a fast and simple text transformation tool.
              </strong>
              It helps you convert text to uppercase, lowercase, remove extra
              spaces, copy clean text, and analyze word/character count. Just
              paste your text, choose an action, and get instant results.
            </div>
          </div>
        </div>

        {/* Accordion 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={myStyle}
            >
              Why Use TextUtils?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <strong>Because it saves time and improves productivity.</strong>
              Instead of manually editing text, TextUtils allows you to perform
              common text operations in one click. It helps students,
              developers, writers, and content creators keep their work clean
              and formatted.
            </div>
          </div>
        </div>

        {/* Accordion 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={myStyle}
            >
              How Does TextUtils Work?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <strong>TextUtils works completely inside your browser.</strong>
              No data is uploaded to any server — everything is processed using
              JavaScript in real-time. This ensures speed, privacy, and
              security.
            </div>
          </div>
        </div>

        {/* Accordion 4 - FAQ */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
              style={myStyle}
            >
              Frequently Asked Questions (FAQ)
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <p>
                <strong>Is TextUtils free to use?</strong> Yes! It is completely
                free.
              </p>
              <p>
                <strong>Is my text saved anywhere?</strong> No, everything
                happens locally.
              </p>
              <p>
                <strong>Can I use it on mobile?</strong> Yes, it works on all
                screens.
              </p>
              <p>
                <strong>Who can use TextUtils?</strong> Anyone who works with
                text.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <button onClick={toggleStyle} type="button" class="btn btn-primary">
          {btnText}
        </button>
      </div>
    </div>
  );
}
