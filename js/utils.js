/* ============================================================
   DEVBOARD - UTILITIES
   ============================================================ */

'use strict';

const Store = {
  _key: CONFIG.STORAGE_KEY,

  get(field, fallback = null) {
    try {
      const raw = localStorage.getItem(this._key);
      const data = raw ? JSON.parse(raw) : {};
      return field in data ? data[field] : fallback;
    } catch {
      return fallback;
    }
  },

  set(field, value) {
    try {
      const raw = localStorage.getItem(this._key);
      const data = raw ? JSON.parse(raw) : {};
      data[field] = value;
      localStorage.setItem(this._key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage write failed:', e);
    }
  },

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this._key) || '{}');
    } catch {
      return {};
    }
  },
};

const Toast = {
  show(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);
  },

  success(message) { this.show(message, 'success'); },
  error(message) { this.show(message, 'error'); },
  info(message) { this.show(message, 'info'); },
};

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime12(date = new Date()) {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function timeAgo(isoString) {
  if (!isoString) return '';

  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
}

function shortDate(date = new Date()) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function weatherIcon(code) {
  if (!code) return '🌡';

  const id = parseInt(code, 10);

  if (id >= 200 && id < 300) return '⛈';
  if (id >= 300 && id < 400) return '🌦';
  if (id >= 500 && id < 510) return '🌧';
  if (id === 511) return '🌨';
  if (id > 511 && id < 600) return '🌧';
  if (id >= 600 && id < 700) return '❄️';
  if (id >= 700 && id < 800) return '🌫';
  if (id === 800) return '☀️';
  if (id === 801) return '🌤';
  if (id === 802) return '⛅';
  if (id >= 803) return '☁️';

  return '🌡';
}

function emit(name, detail = {}) {
  document.dispatchEvent(new CustomEvent(name, { detail }));
}

function on(name, cb) {
  document.addEventListener(name, cb);
}
