// import { useState, useRef } from "react";
// import {
//   FaGithub,
//   FaLinkedin,
//   FaEnvelope,
//   FaArrowRight,
//   FaCheck,
// } from "react-icons/fa";

// const SOCIAL = [
//   {
//     icon: <FaGithub size={20} />,
//     label: "GitHub",
//     handle: "@akanshujamwal",
//     href: "https://github.com/akanshujamwal",
//     color: "#24292e",
//     darkColor: "#f0f6fc",
//   },
//   {
//     icon: <FaLinkedin size={20} />,
//     label: "LinkedIn",
//     handle: "akanshu-jamwal",
//     href: "https://www.linkedin.com/in/akanshu-jamwal/",
//     color: "#0077b5",
//     darkColor: "#70b5f9",
//   },
//   {
//     icon: <FaEnvelope size={20} />,
//     label: "Email",
//     handle: "a.jamwal132@gmail.com",
//     href: "mailto:a.jamwal132@gmail.com",
//     color: "#1a73e8",
//     darkColor: "#6daef5",
//   },
// ];

// export default function Contact() {
//   const [fields, setFields] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [sent, setSent] = useState(false);
//   const [errors, setErrors] = useState({});
//   const formRef = useRef(null);

//   const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

//   const validate = () => {
//     const e = {};
//     if (!fields.name.trim()) e.name = "Name is required";
//     if (!fields.email.trim()) e.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(fields.email))
//       e.email = "Enter a valid email";
//     if (!fields.message.trim()) e.message = "Message is required";
//     return e;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length) {
//       setErrors(errs);
//       return;
//     }
//     setErrors({});

//     /* mailto — opens the user's email client with pre-filled fields */
//     const subject = encodeURIComponent(
//       fields.subject || `Message from ${fields.name} via TextUtils`,
//     );
//     const body = encodeURIComponent(
//       `Hi Akanshu,\n\n${fields.message}\n\n— ${fields.name}\n${fields.email}`,
//     );
//     window.location.href = `mailto:a.jamwal132@gmail.com?subject=${subject}&body=${body}`;
//     setSent(true);
//   };

//   return (
//     <div className="contact-page about-page">
//       {/* ── Hero ── */}
//       <section className="ct-hero">
//         <div className="ct-hero-eyebrow">
//           <span className="ab-eyebrow-line" />
//           Get in touch
//           <span className="ab-eyebrow-line" />
//         </div>
//         <h1 className="ct-hero-title">
//           Let's <em>talk</em>
//         </h1>
//         <p className="ct-hero-sub">
//           Have a question, a suggestion, or just want to say hello? I'd love to
//           hear from you.
//         </p>
//         <div className="ab-hero-rule" />
//       </section>

//       <div className="container ct-body">
//         <div className="ct-grid">
//           {/* ── Left: Social cards ── */}
//           <div className="ct-social-col">
//             <p className="ct-social-intro">
//               The quickest way to reach me is through any of these:
//             </p>

//             <div className="ct-social-cards">
//               {SOCIAL.map((s) => (
//                 <a
//                   key={s.label}
//                   href={s.href}
//                   target={s.label !== "Email" ? "_blank" : undefined}
//                   rel="noreferrer"
//                   className="ct-social-card"
//                   style={{ "--accent": s.color, "--accent-dark": s.darkColor }}
//                 >
//                   <span className="ct-social-icon">{s.icon}</span>
//                   <div className="ct-social-info">
//                     <strong className="ct-social-label">{s.label}</strong>
//                     <span className="ct-social-handle">{s.handle}</span>
//                   </div>
//                   <FaArrowRight size={12} className="ct-social-arrow" />
//                 </a>
//               ))}
//             </div>

//             <div className="ct-avail">
//               <span className="ct-avail-dot" />
//               <span className="ct-avail-text">
//                 Open to collaborations &amp; feedback
//               </span>
//             </div>
//           </div>

//           {/* ── Right: Form ── */}
//           <div className="ct-form-col">
//             {sent ? (
//               <div className="ct-success">
//                 <div className="ct-success-icon">
//                   <FaCheck size={28} />
//                 </div>
//                 <h3 className="ct-success-title">Email client opened!</h3>
//                 <p className="ct-success-sub">
//                   Your message has been pre-filled in your email app. Just hit
//                   send.
//                 </p>
//                 <button
//                   className="ct-form-submit"
//                   onClick={() => {
//                     setSent(false);
//                     setFields({
//                       name: "",
//                       email: "",
//                       subject: "",
//                       message: "",
//                     });
//                   }}
//                 >
//                   Send another
//                 </button>
//               </div>
//             ) : (
//               <form
//                 ref={formRef}
//                 onSubmit={handleSubmit}
//                 className="ct-form"
//                 noValidate
//               >
//                 <div className="ct-form-row">
//                   <div className="ct-field">
//                     <label className="ct-label" htmlFor="ct-name">
//                       Name
//                     </label>
//                     <input
//                       id="ct-name"
//                       className={`ct-input${errors.name ? " ct-input--error" : ""}`}
//                       type="text"
//                       placeholder="Your name"
//                       value={fields.name}
//                       onChange={set("name")}
//                       autoComplete="name"
//                     />
//                     {errors.name && (
//                       <span className="ct-error">{errors.name}</span>
//                     )}
//                   </div>
//                   <div className="ct-field">
//                     <label className="ct-label" htmlFor="ct-email">
//                       Email
//                     </label>
//                     <input
//                       id="ct-email"
//                       className={`ct-input${errors.email ? " ct-input--error" : ""}`}
//                       type="email"
//                       placeholder="you@example.com"
//                       value={fields.email}
//                       onChange={set("email")}
//                       autoComplete="email"
//                     />
//                     {errors.email && (
//                       <span className="ct-error">{errors.email}</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="ct-field">
//                   <label className="ct-label" htmlFor="ct-subject">
//                     Subject <span className="ct-optional">(optional)</span>
//                   </label>
//                   <input
//                     id="ct-subject"
//                     className="ct-input"
//                     type="text"
//                     placeholder="What's this about?"
//                     value={fields.subject}
//                     onChange={set("subject")}
//                   />
//                 </div>

//                 <div className="ct-field">
//                   <label className="ct-label" htmlFor="ct-message">
//                     Message
//                   </label>
//                   <textarea
//                     id="ct-message"
//                     className={`ct-input ct-textarea${errors.message ? " ct-input--error" : ""}`}
//                     placeholder="Your message…"
//                     value={fields.message}
//                     onChange={set("message")}
//                     rows={5}
//                   />
//                   {errors.message && (
//                     <span className="ct-error">{errors.message}</span>
//                   )}
//                 </div>

//                 <button type="submit" className="ct-form-submit">
//                   Open in email app <FaArrowRight size={13} />
//                 </button>

//                 <p className="ct-form-note">
//                   This opens your default email client with the message
//                   pre-filled. No data is sent to any server.
//                 </p>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";

/* ── Your Formspree endpoint ── */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdawdklw";

const SOCIAL = [
  {
    icon: <FaGithub size={20} />,
    label: "GitHub",
    handle: "@akanshujamwal",
    href: "https://github.com/akanshujamwal",
    color: "#24292e",
    darkColor: "#f0f6fc",
  },
  {
    icon: <FaLinkedin size={20} />,
    label: "LinkedIn",
    handle: "akanshu-jamwal",
    href: "https://www.linkedin.com/in/akanshu-jamwal/",
    color: "#0077b5",
    darkColor: "#70b5f9",
  },
  {
    icon: <FaEnvelope size={20} />,
    label: "Email",
    handle: "a.jamwal132@gmail.com",
    href: "mailto:a.jamwal132@gmail.com",
    color: "#1a73e8",
    darkColor: "#6daef5",
  },
];

export default function Contact() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const set = (k) => (e) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    // clear field error as user types
    if (errors[k])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[k];
        return n;
      });
  };

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(fields.email))
      e.email = "Enter a valid email";
    if (!fields.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError("");
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          subject:
            fields.subject || `Message from ${fields.name} via TextUtils`,
          message: fields.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFields({ name: "", email: "", subject: "", message: "" });
      } else {
        const msg =
          data?.errors?.map((err) => err.message).join(", ") ||
          "Something went wrong. Please try again.";
        setServerError(msg);
        setStatus("error");
      }
    } catch {
      setServerError(
        "Network error — please check your connection and try again.",
      );
      setStatus("error");
    }
  };

  return (
    <div className="contact-page about-page">
      {/* ── Hero ── */}
      <section className="ct-hero">
        <div className="ct-hero-eyebrow">
          <span className="ab-eyebrow-line" />
          Get in touch
          <span className="ab-eyebrow-line" />
        </div>
        <h1 className="ct-hero-title">
          Let's <em>talk</em>
        </h1>
        <p className="ct-hero-sub">
          Have a question, a suggestion, or just want to say hello? I'd love to
          hear from you.
        </p>
        <div className="ab-hero-rule" />
      </section>

      <div className="container ct-body">
        <div className="ct-grid">
          {/* ── Left: Social cards ── */}
          <div className="ct-social-col">
            <p className="ct-social-intro">
              The quickest way to reach me is through any of these:
            </p>

            <div className="ct-social-cards">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label !== "Email" ? "_blank" : undefined}
                  rel="noreferrer"
                  className="ct-social-card"
                  style={{ "--accent": s.color, "--accent-dark": s.darkColor }}
                >
                  <span className="ct-social-icon">{s.icon}</span>
                  <div className="ct-social-info">
                    <strong className="ct-social-label">{s.label}</strong>
                    <span className="ct-social-handle">{s.handle}</span>
                  </div>
                  <FaArrowRight size={12} className="ct-social-arrow" />
                </a>
              ))}
            </div>

            <div className="ct-avail">
              <span className="ct-avail-dot" />
              <span className="ct-avail-text">
                Open to collaborations &amp; feedback
              </span>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="ct-form-col">
            {/* ── Success state ── */}
            {status === "success" ? (
              <div className="ct-success">
                <div className="ct-success-icon">
                  <FaCheck size={28} />
                </div>
                <h3 className="ct-success-title">Message sent!</h3>
                <p className="ct-success-sub">
                  Thanks for reaching out. I'll get back to you as soon as
                  possible.
                </p>
                <button
                  className="ct-form-submit"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="ct-form" noValidate>
                {/* Server error banner */}
                {status === "error" && serverError && (
                  <div className="ct-server-error" role="alert">
                    <strong>Error:</strong> {serverError}
                  </div>
                )}

                <div className="ct-form-row">
                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-name">
                      Name
                    </label>
                    <input
                      id="ct-name"
                      className={`ct-input${errors.name ? " ct-input--error" : ""}`}
                      type="text"
                      placeholder="Your name"
                      value={fields.name}
                      onChange={set("name")}
                      autoComplete="name"
                      disabled={status === "sending"}
                    />
                    {errors.name && (
                      <span className="ct-error">{errors.name}</span>
                    )}
                  </div>
                  <div className="ct-field">
                    <label className="ct-label" htmlFor="ct-email">
                      Email
                    </label>
                    <input
                      id="ct-email"
                      className={`ct-input${errors.email ? " ct-input--error" : ""}`}
                      type="email"
                      placeholder="you@example.com"
                      value={fields.email}
                      onChange={set("email")}
                      autoComplete="email"
                      disabled={status === "sending"}
                    />
                    {errors.email && (
                      <span className="ct-error">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-subject">
                    Subject <span className="ct-optional">(optional)</span>
                  </label>
                  <input
                    id="ct-subject"
                    className="ct-input"
                    type="text"
                    placeholder="What's this about?"
                    value={fields.subject}
                    onChange={set("subject")}
                    disabled={status === "sending"}
                  />
                </div>

                <div className="ct-field">
                  <label className="ct-label" htmlFor="ct-message">
                    Message
                  </label>
                  <textarea
                    id="ct-message"
                    className={`ct-input ct-textarea${errors.message ? " ct-input--error" : ""}`}
                    placeholder="Your message…"
                    value={fields.message}
                    onChange={set("message")}
                    rows={5}
                    disabled={status === "sending"}
                  />
                  {errors.message && (
                    <span className="ct-error">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="ct-form-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <FaSpinner className="ct-spinner" size={13} /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <FaArrowRight size={13} />
                    </>
                  )}
                </button>

                <p className="ct-form-note">
                  Powered by Formspree. Your message goes directly to my inbox —
                  no spam, no sharing.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
