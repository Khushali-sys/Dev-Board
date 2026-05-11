/* ============================================================
   DEVBOARD — DRAG & DROP MODULE
   Widget reordering via HTML5 Drag & Drop API
   ============================================================ */

const DragDrop = (() => {
  const dashboard = document.getElementById('dashboard');
  let draggedEl   = null;
  let savedOrder  = [];

  function saveOrder() {
    const widgets = [...dashboard.querySelectorAll('.widget[data-widget-id]')];
    const order   = widgets.map(w => w.dataset.widgetId);
    Store.set('widgetOrder', order);
  }

  function restoreOrder() {
    const order = Store.get('widgetOrder', []);
    if (!order.length) return;

    order.forEach(id => {
      const el = dashboard.querySelector(`[data-widget-id="${id}"]`);
      if (el) dashboard.appendChild(el);
    });
  }

  function onDragStart(e) {
    draggedEl = e.currentTarget;
    draggedEl.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedEl.dataset.widgetId || '');
  }

  function onDragEnd(e) {
    if (draggedEl) draggedEl.classList.remove('dragging');
    document.querySelectorAll('.widget.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });
    draggedEl = null;
    saveOrder();
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const target = e.currentTarget;
    if (target !== draggedEl) {
      target.classList.add('drag-over');
    }
  }

  function onDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
  }

  function onDrop(e) {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.remove('drag-over');

    if (!draggedEl || draggedEl === target) return;

    // Determine insertion position
    const allWidgets = [...dashboard.querySelectorAll('.widget')];
    const dragIdx    = allWidgets.indexOf(draggedEl);
    const dropIdx    = allWidgets.indexOf(target);

    if (dragIdx < dropIdx) {
      target.after(draggedEl);
    } else {
      target.before(draggedEl);
    }
  }

  function init() {
    restoreOrder();

    // Attach listeners to all draggable widgets
    const attachToDraggable = () => {
      const draggables = dashboard.querySelectorAll('.widget[draggable="true"]');
      draggables.forEach(w => {
        // Remove old listeners to prevent duplicates
        w.removeEventListener('dragstart', onDragStart);
        w.removeEventListener('dragend',   onDragEnd);
        w.removeEventListener('dragover',  onDragOver);
        w.removeEventListener('dragleave', onDragLeave);
        w.removeEventListener('drop',      onDrop);

        w.addEventListener('dragstart', onDragStart);
        w.addEventListener('dragend',   onDragEnd);
        w.addEventListener('dragover',  onDragOver);
        w.addEventListener('dragleave', onDragLeave);
        w.addEventListener('drop',      onDrop);
      });
    };

    attachToDraggable();

    // Handle mobile: touch-based "drag"
    // On mobile, drag handles act as visual affordance only.
    // Full touch drag is complex — use native browser support where available.
  }

  return { init };
})();