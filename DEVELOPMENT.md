# 🛠️ Development Documentation

> Technical reference for contributors and maintainers of **TextUtils v2.0**

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Theme System](#5-theme-system)
6. [TextForm Architecture](#6-textform-architecture)
7. [Tool System](#7-tool-system)
8. [Contact Form — Formspree](#8-contact-form--formspree)
9. [CSS Architecture](#9-css-architecture)
10. [Routing](#10-routing)
11. [Deployment](#11-deployment)
12. [Known Issues & Bug Log](#12-known-issues--bug-log)
13. [Future Improvements](#13-future-improvements)

---

## 1. Project Overview

TextUtils is a browser-native text processing application built with React 18. All 61 tools execute entirely on the client side — no data is transmitted to any server at any point.

**Core design principles:**

| Principle | Implementation |
|-----------|---------------|
| Privacy first | Zero server-side processing, zero analytics, zero data collection |
| Performance | All operations are synchronous O(n) string transforms |
| No-flash theming | Inline script applies theme before React hydrates |
| Accessibility | Semantic HTML, ARIA labels, keyboard navigable |
| Maintainability | Every tool is a one-line pure function |

---

## 2. Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18 | UI framework, functional components + hooks |
| **React Router** | v6 | Client-side routing, `useLocation` for active nav |
| **Bootstrap** | 5 (CDN) | Base layout utilities, grid, card components |
| **CSS Custom Properties** | — | Dark/light theme variables, animation stagger delays |
| **react-icons/fa** | latest | FontAwesome icon components |
| **Formspree** | free tier | Contact form email delivery — no backend needed |
| **Google Fonts** | — | Playfair Display for editorial typography |

> Bootstrap is loaded via CDN in `index.html` — not installed as an npm package.

---

## 3. Project Structure

```
textutils/
│
├── public/
│   ├── index.html           # Theme init script, Bootstrap CDN, Google Fonts
│   └── favicon.svg          # SVG favicon (FaFileAlt path, #1a73e8 blue)
│
├── src/
│   ├── App.jsx              # Root component — BrowserRouter + route definitions
│   ├── App.css              # All styles (~2,635 lines, fully dark/light themed)
│   │
│   └── components/
│       ├── Navbar.jsx        # Top nav — theme toggle, active route via useLocation()
│       ├── TextForm.jsx      # Main editor — 61 tools, stats, undo, clipboard, toasts
│       ├── ToolsPage.jsx     # Browse & search all tools by category
│       ├── About.jsx         # Editorial about — ticker, stats, IntersectionObserver
│       ├── Contact.jsx       # Formspree contact form with full validation
│       ├── Footer.jsx        # 4-column magazine footer
│       └── NotFound.jsx      # 404 typographic page
│
├── package.json
├── README.md
├── ABOUT.md
└── DEVELOPMENT.md
```

---

## 4. Getting Started

### Prerequisites
- Node.js **16+**
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/akanshujamwal/textutils.git
cd textutils

# 2. Install dependencies
npm install

# 3. Start dev server
npm start
# → http://localhost:3000

# 4. Production build
npm run build
# → /build folder ready to deploy
```

---

## 5. Theme System

The theme system is the most critical piece of infrastructure in the app. Getting it wrong causes a **flash of wrong theme (FWOT)** on page load — the page briefly shows light mode before React mounts and applies dark mode.

### 5.1 How It Works

Three layers work together:

```
index.html inline script  →  applies class before React mounts
Navbar.jsx applyTheme()   →  updates class on toggle
App.css dual selectors    →  styles respond to class on html AND body
```

### 5.2 Initialization — `index.html`

A **synchronous** inline script in `<head>` reads `localStorage` and applies the theme class before the browser paints anything:

```html
<script>
  (function() {
    const t = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(t);
    document.body.classList.add(t);
  })();
</script>
```

> ⚠️ This must be synchronous (not `defer`, not `async`) and must be in `<head>` before any stylesheets. Moving it will reintroduce the flash.

### 5.3 Toggle — `Navbar.jsx`

```js
const applyTheme = (theme) => {
  document.documentElement.classList.remove('light', 'dark');
  document.body.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  document.body.classList.add(theme);
  localStorage.setItem('theme', theme);
};
```

> ⚠️ Both `documentElement` **and** `body` must receive the class. Bootstrap 5 scopes many rules to `body`, while custom overrides target `html`. Applying to only one breaks half the theme.

### 5.4 CSS Selector Convention

Every themed rule must use the dual-selector pattern:

```css
/* ✅ Correct */
html.dark .component,
body.dark .component {
  background: #1e1e1e;
  color: #e8eaed;
}

/* ❌ Wrong — misses Bootstrap-scoped elements */
body.dark .component { ... }
```

---

## 6. TextForm Architecture

`TextForm.jsx` is the core page component (~325 lines). All state is local — no global state manager.

### 6.1 State Reference

| State | Type | Purpose |
|-------|------|---------|
| `inputText` | `string` | Contents of the editor textarea |
| `outputText` | `string` | Result of the last applied tool |
| `activeTab` | `string` | Currently selected tool category |
| `history` | `string[]` | Undo stack, capped at 20 entries |
| `copied` | `boolean` | Copy button feedback — shows `FaCheck` for 2s |
| `toast` | `object \| null` | `{ msg, type }` — auto-dismisses after 2000ms |

### 6.2 Tool Execution Pattern

Every tool calls `run(fn)` where `fn` is a **pure string → string function**:

```js
const run = (fn) => {
  setHistory((h) => [...h.slice(-19), inputText]); // push current to undo stack
  setOutputText(fn(inputText));                     // apply transformation
};

// Usage — every tool is one line:
const toUpper = (t) => t.toUpperCase();
// ...
<button onClick={() => run(toUpper)}>UPPERCASE</button>
```

### 6.3 Preview Auto-Clear (Bug Fix)

The textarea uses `handleInputChange` instead of a plain `setInputText` setter. When the editor is **manually emptied**, the preview clears automatically:

```js
const handleInputChange = (e) => {
  setInputText(e.target.value);
  if (e.target.value === '') setOutputText(''); // ← the fix
};
```

> Without this, a user could: type text → apply tool → manually delete all text → preview still shows stale output. Now preview always stays in sync with editor state.

### 6.4 Stats Computation

All 10 stats are derived inline on every render. No `useEffect`, no memoization — string operations are fast enough for typical text lengths:

| Stat | Formula |
|------|---------|
| `wordCount` | `inputText.trim().split(/\s+/).length` |
| `charCount` | `inputText.length` |
| `charNoSpaces` | `inputText.replace(/\s/g, '').length` |
| `lineCount` | `inputText.split('\n').length` |
| `sentCount` | `(inputText.match(/[^.!?]+[.!?]+/g) \|\| []).length` |
| `paraCount` | `inputText.trim().split(/\n\s*\n/).length` |
| `uniqueWords` | `new Set(words.map(w => w.toLowerCase())).size` |
| `longestWord` | `words.reduce((a, b) => a.length > b.length ? a : b)` |
| `readingTime` | `(wordCount * 0.008).toFixed(2)` mins @ 125 wpm |
| `speakingTime` | `(wordCount * 0.02).toFixed(2)` mins @ 130 wpm |

### 6.5 Toast System

```js
function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  }, []);
  return [toast, show];
}
```

Renders a fixed bottom-center notification. `type` is either `"success"` or `"error"` — each maps to a different CSS class for color.

---

## 7. Tool System

### 7.1 Tool Categories

| Tab | Count | Description |
|-----|-------|-------------|
| `format` | 10 | Case conversion — UPPER, lower, Title, Sentence, camel, snake, Pascal, Alternating, Invert, Capitalize |
| `cleanup` | 10 | Strip spaces, empty lines, numbers, punctuation, HTML tags, trim, line numbers |
| `transform` | 10 | Reverse, shuffle, sort, ROT13 |
| `encode` | 8 | Base64, URL, HTML encoding, binary conversion |
| `extract` | 8 | Emails, URLs, phones, numbers, hashtags, @mentions, sentences, alphabets |
| `writing` | 7 | Duplicates, capitalization fix, stop words, vowels, consonants, word frequency |
| `advanced` | 6 | Slug, sentence splitter, word frequency, JSON prettify/minify, wrap at 80 |

### 7.2 Adding a New Tool

1. Write a pure function at the top of `TextForm.jsx`:
```js
const myTool = (t) => t.split('').reverse().join('');
```

2. Add it to the correct category array:
```js
const tools = {
  transform: [
    // ...existing tools
    ["My Tool Name", () => run(myTool)],
  ],
};
```

That's it. The tab count badge, tool chip, and disabled state are all automatic.

---

## 8. Contact Form — Formspree

### 8.1 Endpoint Configuration

```js
// src/components/Contact.jsx — line 10
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdklw";
```

Replace `mdklw` with your own form ID from [formspree.io](https://formspree.io).

### 8.2 Status Machine

The form uses a single `status` string instead of multiple boolean flags:

```
idle  ──→  sending  ──→  success
                  └──→  error
```

| Status | UI State |
|--------|----------|
| `idle` | Form ready, submit button active |
| `sending` | All inputs disabled, spinner on button, no double-submit possible |
| `success` | Form replaced by green success card |
| `error` | Red error banner shown above form, form remains editable |

### 8.3 Validation

- Runs **before** the `fetch` call — no network request on invalid input
- Errors are stored as `{ fieldName: "error message" }` — each field shows its own inline error
- Per-field errors **clear as the user types** (not all at once on re-submit)

```js
const set = (k) => (e) => {
  setFields((f) => ({ ...f, [k]: e.target.value }));
  if (errors[k]) setErrors((prev) => { const n = { ...prev }; delete n[k]; return n; });
};
```

### 8.4 First Submission

> ⚠️ Formspree sends a **verification email** to your registered address when the first submission arrives. Until you click the confirmation link, messages are held. Always test after deploying and check spam.

---

## 9. CSS Architecture

All styles live in a single `App.css` file (~2,635 lines). Bootstrap is loaded via CDN — all custom styles extend or override it.

### 9.1 File Sections (in order)

| Section | Prefix | Description |
|---------|--------|-------------|
| Base / reset | — | Root variables, body defaults |
| Navbar | `.navbar-*` | Theme overrides, active link pill |
| Main content | `.main-content` | Page wrapper padding |
| Tab buttons | `.tab-btn`, `.tab-btn-active` | Custom pill buttons replacing Bootstrap |
| Stats bar | `.home-stats-*` | Stat strip below hero on home page |
| Tool chips | `.tool-chip` | Tool button in the editor |
| Editor actions | `.editor-action-btn` | Paste / Undo / Clear toolbar |
| Preview box | `.preview-box` | Output preview panel |
| Toast | `.textutils-toast` | Fixed bottom-center notification |
| Home hero | `.home-hero` | Graph-paper grid texture + Playfair heading |
| Tools page | `.tp-*` | Category cards, search input, grid |
| 404 page | `.nf-*` | Typographic 404 layout |
| Contact page | `.ct-*` | Form, social cards, success state |
| Footer | `.ft-*` | 4-column magazine footer |
| About page | `.about-page`, `.ab-*` | Editorial about layout |

### 9.2 Custom Keyframes

| Name | Used On | Effect |
|------|---------|--------|
| `fadeSlideUp` | Hero sections, card grids | `opacity: 0, translateY(18px)` → natural position |
| `ticker` | About page tech stack strip | Infinite horizontal scroll, pauses on hover |
| `toast-in` | Toast notification | Slides up from bottom of viewport |
| `pulse-dot` | Contact page availability dot | Gentle box-shadow pulse |
| `ct-spin` | Contact submit button spinner | Continuous 360° rotation |

### 9.3 CSS Custom Properties

| Property | Where set | Purpose |
|----------|-----------|---------|
| `--ci` | Inline on grid cards | Integer for staggered animation delay: `calc(var(--ci) * 60ms)` |
| `--accent` | Inline on social cards | Per-card color for icon bg and border highlight |
| `--accent-dark` | Inline on social cards | Dark mode variant of `--accent` |
| `--delay` | Inline on Reveal wrappers | IntersectionObserver reveal stagger timing |

### 9.4 Bootstrap Override Strategy

- Use `!important` only where Bootstrap uses it first
- Use higher specificity (`.container .navbar`) before reaching for `!important`
- Always test overrides in both light and dark mode

---

## 10. Routing

```jsx
// App.jsx
<Routes>
  <Route path="/"        element={<TextForm />} />
  <Route path="/tools"   element={<ToolsPage />} />
  <Route path="/about"   element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="*"        element={<NotFound />} />
</Routes>
```

### Active Nav Detection

```js
// Navbar.jsx
const location = useLocation();
const isActive = (path) =>
  path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
```

---

## 11. Deployment

### 11.1 Build

```bash
npm run build
```

Output in `/build` — static files, no server required.

### 11.2 Platform Guide

| Platform | Free | Deploy Command | React Router Fix |
|----------|------|---------------|-----------------|
| **Vercel** | ✅ | `npx vercel` or connect GitHub | Automatic |
| **Netlify** | ✅ | Drag `/build` to netlify.com/drop | `public/_redirects` |
| **Render** | ✅ | New → Static Site → connect repo | Dashboard rewrite rule |
| **Cloudflare Pages** | ✅ | Connect repo, preset: CRA | Automatic |

### 11.3 React Router Fix (Required on Most Hosts)

React Router uses the HTML5 History API. On a static host, refreshing `/about` returns a 404 because the server looks for a file at that path. Fix per platform:

**Netlify** — create `public/_redirects`:
```
/* /index.html 200
```

**Vercel** — create `vercel.json` at project root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Render** — in the Static Site dashboard, add a Rewrite Rule: `/*` → `/index.html` with status `200`.

**Cloudflare Pages** — no action needed, handles automatically.

---

## 12. Known Issues & Bug Log

### ✅ Fixed in v2

| Bug | Root Cause | Fix Applied |
|-----|-----------|-------------|
| Preview shows stale output after manually clearing editor | `onChange` only updated `inputText`, never cleared `outputText` | `handleInputChange` clears `outputText` when `e.target.value === ''` |
| Theme flash on page load | React applied theme class after first paint | Inline sync script in `<head>` applies class before browser paints |
| Bootstrap navbar background not overriding in dark mode | Custom selector only targeted `body.dark`, Bootstrap targeted `html` | Dual selector: `html.dark .navbar, body.dark .navbar` |

---

## 13. Future Improvements

- [ ] **Keyboard shortcuts** — `Ctrl+U` uppercase, `Ctrl+L` lowercase, `Ctrl+Z` undo
- [ ] **Diff tool** — paste two texts, highlight additions and deletions
- [ ] **Character limit detector** — Twitter (280), LinkedIn (700), SMS (160) presets
- [ ] **Persist last-used tab** — save active category to `localStorage`
- [ ] **URL tab parameter** — `/` with `?tab=encode` pre-selects a tab, making Tools page deep-links actually work
- [ ] **Speech-to-text input** — `SpeechRecognition` API for voice input into the editor

---

<p align="center">
  <strong>TextUtils v2.0</strong> &nbsp;·&nbsp; MIT License &nbsp;·&nbsp;
  <a href="https://github.com/akanshujamwal/textutils">github.com/akanshujamwal/textutils</a>
</p>