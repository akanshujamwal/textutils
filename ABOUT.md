# 📖 About TextUtils

**TextUtils** is a browser-native React application with 61 text processing tools — from case conversion and cleanup to Base64 encoding, JSON formatting, data extraction, and more.

Everything runs **locally in your browser**. No server. No uploads. No tracking. You paste your text, pick a tool, get your result — that's it.

---

## 🎯 What Problem Does It Solve?

Developers, writers, and students constantly need to do small but tedious text operations:

- Converting a string to `snake_case` before pasting it into code
- Stripping HTML tags from copied web content
- Extracting all email addresses from a document
- Quickly checking word count before hitting a character limit
- Encoding a URL or decoding a Base64 string

These tasks are scattered across dozens of different websites — most of which send your text to a server, show you ads, or require an account. **TextUtils brings all of them into one clean, fast, privacy-respecting interface.**

---

## 💡 What Makes It Different?

| Feature | TextUtils | Most Online Tools |
|---------|:---------:|:-----------------:|
| Runs fully offline | ✅ | ❌ |
| Zero data sent to server | ✅ | ❌ |
| 61 tools in one place | ✅ | ❌ |
| Dark mode | ✅ | Sometimes |
| Undo support | ✅ | ❌ |
| Chain tools together | ✅ | ❌ |
| No ads, no accounts | ✅ | Rarely |
| Works on any device | ✅ | Sometimes |

---

## 🗺️ Pages

### 🏠 Home — The Editor
The main workspace. An editorial hero header sits above a split editor/preview layout. Pick a category tab, click a tool chip, and the result appears instantly in the preview. Stats update live as you type — words, characters, sentences, paragraphs, reading time, speaking time, and more.

### 🧰 Tools Directory
A searchable, browsable grid of all 61 tools organized into 7 color-coded categories. Live search highlights matching substrings across every category simultaneously. Each card links directly into the editor with that tab pre-selected.

### 👤 About
An editorial magazine-style page featuring animated stats, a pull quote, a feature grid with decorative numbering, an infinite CSS ticker showing the tech stack, and a developer profile section with scroll-reveal animations powered by `IntersectionObserver`.

### 📬 Contact
A split layout with GitHub, LinkedIn, and Email social cards on the left and a validated contact form on the right. Submissions are delivered to the developer's inbox via **Formspree** — no backend required. The form has a full status machine: `idle → sending → success/error`.

### 🚫 404
A typographic art page with oversized Playfair Display numerals, a witty italic headline, and navigation back to the editor and tools directory. A ghost `NOT FOUND` watermark sits behind the content.

---

## 🏗️ How It's Built

The app is a single **Create React App** project with no global state manager — all state is local to components via React hooks. The CSS is a single themed file (~2,635 lines) using custom properties for dark/light mode.

### Theme System
The theme applies classes to both `<html>` and `<body>` via an **inline synchronous script** that runs before React hydrates. This eliminates the flash-of-wrong-theme (FWOT) that plagues most dark mode implementations.

### Tool Architecture
Every text tool is a **pure function** — input string in, output string out. They're stored in a plain object keyed by category. Adding a new tool is a single line.

```js
const run = (fn) => {
  setHistory((h) => [...h.slice(-19), inputText]); // push to undo stack
  setOutputText(fn(inputText));                     // apply transformation
};
```

### Privacy
There are zero API calls for text operations. The only network request in the entire app is the Formspree `fetch` POST when a user submits the contact form — and that's entirely opt-in.

---

## 📦 Built With

`React 18` &nbsp;·&nbsp; `React Router v6` &nbsp;·&nbsp; `Bootstrap 5` &nbsp;·&nbsp; `CSS Custom Properties` &nbsp;·&nbsp; `Formspree` &nbsp;·&nbsp; `Playfair Display` &nbsp;·&nbsp; `react-icons/fa`

---

## 👨‍💻 Developer

**Akanshu Jamwal** — Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-akanshujamwal-181717?style=flat&logo=github)](https://github.com/akanshujamwal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-akanshu--jamwal-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/akanshu-jamwal/)
[![Email](https://img.shields.io/badge/Email-a.jamwal132@gmail.com-1a73e8?style=flat&logo=gmail&logoColor=white)](mailto:a.jamwal132@gmail.com)

---

<p align="center">
  <strong>TextUtils v2.0</strong> &nbsp;·&nbsp; MIT License &nbsp;·&nbsp; Made with ❤️ and React
</p>