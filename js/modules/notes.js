/* ============================================================
   DEVBOARD - NOTES MODULE
   ============================================================ */

const Notes = (() => {
  let notes = [];
  let editingId = null;
  let activeColor = 'yellow';

  const grid = document.getElementById('notesGrid');
  const emptyEl = document.getElementById('notesEmpty');
  const addBtn = document.getElementById('noteAddBtn');
  const modal = document.getElementById('noteModal');
  const closeBtn = document.getElementById('noteModalClose');
  const cancelBtn = document.getElementById('noteModalCancel');
  const saveBtn = document.getElementById('noteModalSave');
  const titleIn = document.getElementById('noteTitleInput');
  const bodyIn = document.getElementById('noteBodyInput');
  const colorBtns = document.querySelectorAll('.note-color');

  function save() {
    Store.set('notes', notes);
    emit('stats:update');
  }

  function load() {
    notes = Store.get('notes', []);
  }

  function openModal(note = null) {
    editingId = note ? note.id : null;
    activeColor = note ? note.color : 'yellow';

    if (titleIn) titleIn.value = note ? note.title : '';
    if (bodyIn) bodyIn.value = note ? note.body : '';

    colorBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === activeColor);
    });

    if (modal) modal.style.display = 'flex';
    if (titleIn) titleIn.focus();
  }

  function closeModal() {
    if (modal) modal.style.display = 'none';
    editingId = null;
  }

  function saveNote() {
    const title = (titleIn?.value || '').trim();
    const body = (bodyIn?.value || '').trim();

    if (!title && !body) {
      Toast.error('Add a title or body to save a note.');
      return;
    }

    if (editingId) {
      const index = notes.findIndex(note => note.id === editingId);
      if (index !== -1) {
        notes[index] = {
          ...notes[index],
          title,
          body,
          color: activeColor,
          updatedAt: new Date().toISOString(),
        };
      }
    } else {
      notes.unshift({
        id: genId(),
        title,
        body,
        color: activeColor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    save();
    render();
    closeModal();
    Toast.success(editingId ? 'Note updated.' : 'Note saved!');
  }

  function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    save();
    render();
    Toast.info('Note deleted.');
  }

  function render() {
    if (!grid) return;
    grid.innerHTML = '';

    if (emptyEl) emptyEl.style.display = notes.length === 0 ? 'flex' : 'none';

    notes.forEach((note, index) => {
      const card = document.createElement('div');
      card.className = `note-card ${note.color || 'yellow'}`;
      card.style.animationDelay = `${index * 50}ms`;

      card.innerHTML = `
        ${note.title ? `<div class="note-card__title">${sanitize(note.title)}</div>` : ''}
        ${note.body ? `<div class="note-card__body">${sanitize(note.body)}</div>` : ''}
        <div class="note-card__footer">
          <span class="note-card__date">${shortDate(new Date(note.updatedAt || note.createdAt))}</span>
          <button class="note-card__delete" data-id="${note.id}" title="Delete note" onclick="event.stopPropagation()">✕</button>
        </div>
      `;

      card.addEventListener('click', () => openModal(note));

      const deleteBtn = card.querySelector('.note-card__delete');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', event => {
          event.stopPropagation();
          deleteNote(note.id);
        });
      }

      grid.appendChild(card);
    });
  }

  function init() {
    load();
    render();

    if (addBtn) addBtn.addEventListener('click', () => openModal());
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (saveBtn) saveBtn.addEventListener('click', saveNote);

    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        activeColor = btn.dataset.color;
        colorBtns.forEach(item => item.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    if (modal) {
      modal.addEventListener('click', event => {
        if (event.target === modal) closeModal();
      });
    }

    document.addEventListener('keydown', event => {
      if (modal && modal.style.display === 'flex' && (event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        saveNote();
      }
      if (modal && modal.style.display === 'flex' && event.key === 'Escape') {
        closeModal();
      }
    });
  }

  function getCount() {
    return notes.length;
  }

  return { init, getCount };
})();
