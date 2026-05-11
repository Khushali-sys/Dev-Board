# DevBoard — Developer Productivity Dashboard

A customizable, feature-rich developer dashboard built with pure HTML, CSS & JavaScript.  
**No frameworks. No build tools. Just open `index.html` and go.**

---

## 📁 File Structure

```
devboard/
├── index.html                  ← Main HTML (all widgets, modals)
├── css/
│   ├── reset.css               ← CSS reset & scrollbar styling
│   ├── tokens.css              ← Design tokens: colors, fonts, spacing
│   ├── layout.css              ← Topbar + CSS Grid dashboard layout
│   ├── widgets.css             ← All widget component styles
│   └── animations.css         ← Keyframes & entrance animations
├── js/
│   ├── config.js               ← API keys & app settings (edit this!)
│   ├── utils.js                ← Shared utilities: Store, Toast, helpers
│   ├── app.js                  ← Boot sequence & keyboard shortcuts
│   └── modules/
│       ├── clock.js            ← Real-time clock & greeting
│       ├── theme.js            ← Dark/light theme toggle + persistence
│       ├── tasks.js            ← Task CRUD, filter, priority, persistence
│       ├── weather.js          ← Weather API fetch with demo fallback
│       ├── news.js             ← News API fetch with demo fallback
│       ├── notes.js            ← Sticky notes with modal editor
│       ├── stats.js            ← Live productivity stats & counters
│       ├── pomodoro.js         ← Pomodoro timer with notifications
│       ├── dragdrop.js         ← HTML5 drag-and-drop widget reordering
│       └── widgetToggle.js     ← Show/hide widgets from topbar
└── README.md
```

---

## ✅ Features Implemented

| Feature | File | Status |
|---|---|---|
| ⏰ Live Clock + Greeting | `modules/clock.js` | ✅ |
| 🌙 Dark/Light Theme Toggle | `modules/theme.js` | ✅ |
| 📋 Task CRUD + Priority + Filter | `modules/tasks.js` | ✅ |
| 🌦 Weather Widget (API + Demo) | `modules/weather.js` | ✅ |
| 📰 Tech News Feed (API + Demo) | `modules/news.js` | ✅ |
| 📌 Sticky Notes + Modal Editor | `modules/notes.js` | ✅ |
| 📊 Productivity Stats + Progress Bar | `modules/stats.js` | ✅ |
| 🍅 Pomodoro Timer + Notifications | `modules/pomodoro.js` | ✅ |
| ⭐ Drag-and-Drop Widget Reorder | `modules/dragdrop.js` | ✅ |
| 👁 Show/Hide Widgets | `modules/widgetToggle.js` | ✅ |
| 💾 LocalStorage Persistence | `utils.js` (Store) | ✅ |
| 🔔 Toast Notifications | `utils.js` (Toast) | ✅ |
| ⌨ Keyboard Shortcuts | `app.js` | ✅ |

---

## 🚀 Getting Started

### 1. Run locally
```bash
# Option A — Python
python -m http.server 8080

# Option B — Node
npx serve .

# Option C — VS Code
# Right-click index.html → Open with Live Server
```

### 2. Configure API keys (optional — Demo Mode works without keys)

Open `js/config.js`:

```javascript
// Weather: https://openweathermap.org/api (free tier)
WEATHER_API_KEY: 'YOUR_OPENWEATHERMAP_API_KEY',

// News: https://newsapi.org (free tier, 100 req/day)
NEWS_API_KEY: 'YOUR_NEWSAPI_KEY',

// Set to false once you add real keys
DEMO_MODE: true,
```

---

## ⌨ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + K` | Focus task input |
| `Ctrl/Cmd + N` | Open new note modal |
| `Enter` | Submit task (when input focused) |
| `Ctrl/Cmd + S` | Save note (when modal open) |
| `Escape` | Close modal |

---

## 🎨 Customization

### Change accent color
In `css/tokens.css`, update `--accent` in `[data-theme="dark"]`:
```css
--accent: #7fff6e; /* Change to any color */
```

### Change Pomodoro duration
In `js/config.js`:
```javascript
POMODORO_FOCUS: 25,  // minutes
POMODORO_BREAK: 5,
```

### Add a new widget
1. Add the HTML widget section in `index.html`
2. Add a CSS entry in `css/widgets.css`
3. Set `grid-column: span N` in `css/layout.css`
4. Create `js/modules/yourwidget.js`
5. Import and call `YourWidget.init()` in `js/app.js`

---

## 💬 Resume Description

> Built a customizable developer productivity dashboard integrating weather API, news feed, task management, sticky notes, and a Pomodoro timer using vanilla JavaScript and REST APIs. Implemented drag-and-drop widget reordering, dark/light theme toggle, localStorage persistence, and a modular architecture with 10+ independent JS modules. Designed a fully responsive CSS Grid layout with skeleton loaders, toast notifications, and keyboard shortcuts.

---

## 🛠 Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom Properties, Grid, Flexbox, animations
- **Vanilla JS (ES2020+)** — Modules, async/await, IntersectionObserver, Drag & Drop API
- **Web APIs** — localStorage, Notifications API, Fetch API, Intl
- **External APIs** — OpenWeatherMap, NewsAPI (both with demo fallback)

---

## 🌐 Deploy

```bash
# Netlify (drag & drop)
# netlify.app → drag devboard/ folder

# GitHub Pages
git init && git add . && git commit -m "DevBoard v1"
git remote add origin https://github.com/YOU/devboard.git
git push -u origin main
# Settings → Pages → Deploy from main

# Vercel
npx vercel
```

---

Built to impress. Designed to be used. 🚀