import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <div className="container py-5">
      {/* Page Title */}

      <h2 className="mb-4">About TextUtils</h2>

      <p className="lead">
        TextUtils is a powerful web-based text utility platform designed to help
        users transform, clean, and analyze text quickly. Whether you're writing
        content, cleaning data, formatting text, or extracting important
        information, TextUtils provides a collection of smart tools that make
        working with text simple and efficient.
      </p>

      <p>
        Instead of manually editing large blocks of text, TextUtils allows you
        to perform complex transformations instantly with just one click.
        Everything runs directly inside your browser which ensures speed,
        privacy, and a seamless user experience.
      </p>

      {/* Key Features Table */}
      <h4 className="mt-5 mb-3">Key Features</h4>

      <ul>
        <li>
          <strong>Text Formatting:</strong> Convert text to uppercase,
          lowercase, title case, sentence case, and other formats instantly.
        </li>

        <li>
          <strong>Text Cleanup:</strong> Remove extra spaces, numbers, special
          characters, and HTML tags.
        </li>

        <li>
          <strong>Text Transformation:</strong> Reverse text, shuffle words,
          reorder sentences, and sort content alphabetically.
        </li>

        <li>
          <strong>Data Extraction:</strong> Extract useful information such as
          emails, URLs, phone numbers, hashtags, and numbers.
        </li>

        <li>
          <strong>Text Analysis:</strong> Instantly see word count, character
          count, reading time, and speaking time.
        </li>

        <li>
          <strong>Live Preview:</strong> View transformed results in real time
          without modifying the original input.
        </li>

        <li>
          <strong>Dark / Light Mode:</strong> Switch themes for a comfortable
          editing experience.
        </li>

        <li>
          <strong>Responsive Design:</strong> Works smoothly on desktop, tablet,
          and mobile devices.
        </li>
      </ul>
      {/* Technology Stack Table */}
      <h4 className="mt-5 mb-3">Technology Stack</h4>

      <ul>
        <li>
          <strong>React.js:</strong> Builds dynamic and reusable UI components.
        </li>

        <li>
          <strong>JavaScript (ES6+):</strong> Handles all text transformation
          and processing logic.
        </li>

        <li>
          <strong>Bootstrap:</strong> Provides responsive layout and
          ready-to-use UI components.
        </li>

        <li>
          <strong>React Router:</strong> Manages navigation between pages such
          as Home and About.
        </li>

        <li>
          <strong>CSS:</strong> Used for styling, layout improvements, and theme
          customization.
        </li>
      </ul>
      {/* Developer Section */}

      <h4 className="mt-5 mb-4">About the Developer</h4>

      <div className="row align-items-center">
        {/* Image */}

        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQFYvGdJw_-s0A/profile-displayphoto-scale_200_200/B56ZytkWXRG4Ac-/0/1772438519800?e=1775088000&v=beta&t=5YtgCrPHCmji8exji-owDrYvD1-PLSuQmolZL38-yms"
            alt="Akanshu Jamwal"
            className="img-fluid rounded-circle shadow"
            style={{ width: "180px", height: "180px", objectFit: "cover" }}
          />
        </div>

        {/* Text */}

        <div className="col-md-8">
          <p>
            Hello! I'm <strong>Akanshu Jamwal</strong>, a software developer
            with a passion for building useful digital tools and intuitive web
            applications. I enjoy solving real-world problems through clean
            code, modern UI design, and scalable architecture.
          </p>

          <p>
            TextUtils is one of the projects I built to improve my skills in
            React development and frontend architecture. The goal was to design
            a practical tool that demonstrates component-based design,
            responsive layouts, and efficient text-processing logic.
          </p>

          <p>
            I’m continuously learning and experimenting with new technologies to
            build better products and user experiences.
          </p>

          {/* Buttons */}

          <div className="mt-4 d-flex gap-3 flex-wrap">
            <a
              href="https://github.com/akanshujamwal"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              <FaGithub className="me-2" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akanshu-jamwal/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary me-2"
            >
              <FaLinkedin className="me-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
