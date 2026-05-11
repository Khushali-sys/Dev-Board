/* ============================================================
   DEVBOARD — WIDGET TOGGLE MODULE
   Show/hide individual widgets from topbar buttons
   ============================================================ */

const WidgetToggle = (() => {
  const btns = document.querySelectorAll('.widget-toggle-btn');

  function apply(id, visible) {
    const widget = document.getElementById(`widget-${id}`);
    if (!widget) return;
    widget.classList.toggle('collapsed', !visible);
  }

  function toggle(id) {
    const btn      = document.querySelector(`.widget-toggle-btn[data-widget="${id}"]`);
    const isActive = btn?.classList.contains('active');
    const newState = !isActive;

    if (btn) btn.classList.toggle('active', newState);
    apply(id, newState);

    // Persist
    const saved = Store.get('widgetVisibility', {});
    saved[id] = newState;
    Store.set('widgetVisibility', saved);
  }

  function init() {
    // Restore saved visibility
    const saved = Store.get('widgetVisibility', {});
    Object.entries(saved).forEach(([id, visible]) => {
      const btn = document.querySelector(`.widget-toggle-btn[data-widget="${id}"]`);
      if (btn) btn.classList.toggle('active', visible);
      apply(id, visible);
    });

    btns.forEach(btn => {
      btn.addEventListener('click', () => toggle(btn.dataset.widget));
    });
  }

  return { init };
})();