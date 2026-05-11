/* ============================================================
   DEVBOARD - APP ENTRY POINT
   Bootstraps all modules in the correct order.
   ============================================================ */

'use strict';

(function initApp() {
  function boot() {
    Theme.init();
    Clock.init();

    const usernameEl = document.getElementById('usernameDisplay');
    if (usernameEl) {
      const savedName = Store.get('username', 'Developer');
      usernameEl.textContent = savedName;

      usernameEl.addEventListener('blur', () => {
        const name = usernameEl.textContent.trim() || 'Developer';
        usernameEl.textContent = name;
        Store.set('username', name);
      });

      usernameEl.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          usernameEl.blur();
        }
      });
    }

    Tasks.init();
    Notes.init();
    Stats.init();
    Pomodoro.init();
    Weather.init();
    News.init();
    DragDrop.init();
    WidgetToggle.init();
    initShortcuts();

    console.log(
      '%c DevBoard v' + CONFIG.APP_VERSION + ' %c Loaded ✓ ',
      'background:#7fff6e;color:#0d0d14;font-weight:700;padding:4px 8px;border-radius:4px 0 0 4px',
      'background:#1e1e2a;color:#7fff6e;padding:4px 8px;border-radius:0 4px 4px 0',
    );

    if (CONFIG.DEMO_MODE) {
      console.log('%c DEMO MODE active. Add API keys in js/config.js ', 'background:#ffb86e;color:#0d0d14;padding:2px 8px;border-radius:4px');
    }
  }

  function initShortcuts() {
    document.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const taskInput = document.getElementById('taskInput');
        if (taskInput) {
          taskInput.focus();
          taskInput.select();
        }
        Toast.info('⌨ Task input focused (Ctrl+K)');
      }

      if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
        const modal = document.getElementById('noteModal');
        if (modal && modal.style.display !== 'flex') {
          event.preventDefault();
          document.getElementById('noteAddBtn')?.click();
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
