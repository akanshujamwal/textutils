# ✍️ TextUtils — Browser-Native Text Laboratory

> **61 tools. Zero uploads. Everything runs in your browser — your text stays yours.**

TextUtils is a fast, free, and privacy-first **React text processing application** that helps you manipulate, format, analyze, and transform text instantly. All 61 tools run entirely on the client side — no data is ever sent to any server.

Built to demonstrate modern React patterns, editorial UI design, and component-driven architecture.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=flat)
![Tools](https://img.shields.io/badge/Tools-61-1a73e8?style=flat)
![Status](https://img.shields.io/badge/Status-Live-34a853?style=flat)

---

## ✨ Features

### 🔤 Text Formatting
- UPPERCASE, lowercase, Title Case, Sentence Case
- camelCase, snake_case, PascalCase
- Alternating Case, Invert Case, Capitalize Words

### 🧹 Text Cleanup
- Remove extra spaces, empty lines, numbers, punctuation
- Strip HTML tags, trim lines, normalize line breaks
- Add / remove line numbers

### 🔄 Transform
- Reverse text, words, and sentences
- Sort lines A–Z / Z–A, shuffle lines and words
- ROT13 cipher

### 🔐 Encode / Decode
- Base64 encode & decode
- URL encode & decode
- HTML entities encode & decode
- Text ↔ Binary conversion

### 🔍 Data Extraction
- Extract emails, URLs, phone numbers
- Extract hashtags, @mentions, sentences
- Extract numbers and alphabets only

### ✍️ Writing Tools
- Remove duplicate words and lines
- Fix capitalization, remove stop words
- Count vowels & consonants
- Word frequency analysis

### ⚙️ Advanced
- JSON Prettify & Minify
- Slug generator
- Sentence splitter
- Wrap text at 80 characters

### 📊 Live Stats
- Words, characters, characters (no spaces)
- Lines, sentences, paragraphs
- Unique words, longest word
- Estimated reading time & speaking time

### 🎨 Other
- 🌙 Dark / Light mode — persists across sessions, zero flash on load
- ↩️ Undo — last 20 operations stored in memory
- 📋 Paste from clipboard with one click
- ⛓️ Chain tools — feed output back as input with "← Use as Input"
- 💾 Download output as `.txt`
- 🔔 Toast notifications for every action
- 🔍 Search across all 61 tools on the Tools page

---

## 🧰 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework, functional components + hooks |
| **React Router v6** | Client-side routing, active nav detection |
| **Bootstrap 5** | Base layout utilities and grid |
| **CSS Custom Properties** | Full dark/light theming system |
| **react-icons/fa** | FontAwesome icon components |
| **Formspree** | Contact form email delivery — no backend |
| **Google Fonts** | Playfair Display for editorial typography |

---

## 📁 Project Structure

```
textutils/
│
├── public/
│   ├── index.html          # Inline theme init script, CDN links
│   └── favicon.svg         # SVG favicon
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Top nav — theme toggle + active route
│   │   ├── TextForm.jsx     # Main editor — all 61 tools + stats
│   │   ├── ToolsPage.jsx    # Browse & search all tools
│   │   ├── About.jsx        # Editorial about page
│   │   ├── Contact.jsx      # Formspree contact form
│   │   ├── Footer.jsx       # 4-column magazine footer
│   │   └── NotFound.jsx     # 404 typographic page
│   │
│   ├── App.jsx              # Root component + route definitions
│   └── App.css              # All styles (~2,600 lines, fully themed)
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/akanshujamwal/textutils.git
```

### 2️⃣ Navigate to Project Folder

```bash
cd textutils
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Start Development Server

```bash
npm start
```

The application will run at:

```
http://localhost:3000
```

### 5️⃣ Build for Production

```bash
npm run build
```

Output goes to `/build` — ready to deploy to any static host.

---

## ⚙️ Configuration

### Contact Form (Formspree)

Open `src/components/Contact.jsx` and replace the endpoint on line 10:

```js
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
```

Get your free endpoint at [formspree.io](https://formspree.io) — no backend needed, emails land directly in your inbox.

---

## ☁️ Deployment

After `npm run build`, drop the `/build` folder on any of these platforms:

| Platform | Free Tier | How to Deploy |
|----------|-----------|--------------|
| **Vercel** | ✅ Generous | `npx vercel` or connect GitHub repo — auto-deploys on every push |
| **Netlify** | ✅ Yes | Drag `/build` to [netlify.com/drop](https://netlify.com/drop) |
| **Render** | ✅ Yes | New → Static Site → connect repo, publish dir: `build` |
| **Cloudflare Pages** | ✅ Unlimited | Connect repo, framework preset: Create React App |

> ⚠️ **React Router fix required on static hosts** — add a redirect so page refreshes work:
> - **Netlify**: create `public/_redirects` with content `/* /index.html 200`
> - **Vercel**: create `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
> - **Cloudflare Pages**: handled automatically

---

## 🧠 Learning Objectives

This project covers:

- React Hooks (`useState`, `useRef`, `useCallback`)
- Component-based architecture with props
- React Router v6 — `useLocation`, nested routes
- CSS Custom Properties for theming
- Async/await with `fetch` API (Formspree)
- Form validation with per-field error states
- `IntersectionObserver` for scroll reveal animations
- `navigator.clipboard` API
- CSS-only infinite ticker animation
- Dark/light mode without flash (inline script before hydration)

---

## 🔮 Future Enhancements

- [ ] Keyboard shortcuts (Ctrl+U uppercase, Ctrl+L lowercase, etc.)
- [ ] Diff tool — compare two texts and highlight changes
- [ ] Character / word limit detector (Twitter, LinkedIn, etc.)
- [ ] Persist last-used tab in localStorage
- [ ] Speech-to-text input
- [ ] Export as PDF / DOCX

---

## 🤝 Contributing

Pull requests are welcome!

### Steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

## 👨‍💻 Author

**Akanshu Jamwal**
Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-akanshujamwal-181717?style=flat&logo=github)](https://github.com/akanshujamwal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-akanshu--jamwal-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/akanshu-jamwal/)

---

<p align="center">Made with ❤️ and React</p>
