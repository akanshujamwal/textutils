import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer border-top mt-5 py-4">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT */}

          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h6 className="mb-1">TextUtils</h6>

            <p style={{ fontSize: "13px", margin: 0 }}>
              Smart text processing tool built with React
            </p>
          </div>

          {/* CENTER NAVIGATION */}

          <div className="col-md-4 text-center mb-3 mb-md-0">
            {/* <a href="/" className="mx-2 text-decoration-none">
              Home
            </a> */}

            <div className="text-center mt-3" style={{ fontSize: "12px" }}>
              © {year} TextUtils — All Rights Reserved
            </div>
            {/* <a href="/about" className="mx-2 text-decoration-none">
              About
            </a> */}
          </div>

          {/* RIGHT PROFILE */}

          <div className="col-md-4 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-2">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQFYvGdJw_-s0A/profile-displayphoto-scale_200_200/B56ZytkWXRG4Ac-/0/1772438519800?e=1775088000&v=beta&t=5YtgCrPHCmji8exji-owDrYvD1-PLSuQmolZL38-yms"
                alt="profile"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                }}
              />

              <div style={{ fontSize: "13px" }}>
                <div>
                  <a
                    href="https://github.com/akanshujamwal"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none mx-1"
                  >
                    GitHub
                  </a>
                  |
                  <a
                    href="https://www.linkedin.com/in/akanshu-jamwal/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-decoration-none mx-1"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
