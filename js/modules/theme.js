/* ============================================================
   DEVBOARD - THEME MODULE
   ============================================================ */

const Theme = (() => {
  const btn = document.getElementById('themeToggle');
  const iconEl = document.getElementById('themeIcon');
  const html = document.documentElement;

  const ICONS = { dark: 'Sun', light: 'Moon' };

  function apply(theme) {
    html.setAttribute('data-theme', theme);
    if (iconEl) iconEl.textContent = ICONS[theme] || ICONS.light;
    Store.set('theme', theme);
  }

  function toggle() {
    const current = html.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    const saved = Store.get('theme', 'light');
    apply(saved);

    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, apply };
})();
