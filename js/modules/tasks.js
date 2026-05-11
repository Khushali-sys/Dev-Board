/* ============================================================
   DEVBOARD - TASKS MODULE
   ============================================================ */

const Tasks = (() => {
  let tasks = [];
  let filter = 'all';

  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('taskAddBtn');
  const list = document.getElementById('taskList');
  const filterSel = document.getElementById('taskFilter');
  const badge = document.getElementById('tasksBadge');
  const countEl = document.getElementById('tasksCount');
  const clearDone = document.getElementById('clearDoneBtn');
  const prioritySel = document.getElementById('taskPriority');

  function save() {
    Store.set('tasks', tasks);
    emit('tasks:changed', { tasks });
  }

  function load() {
    tasks = Store.get('tasks', []);
  }

  function addTask() {
    const text = input?.value.trim();
    if (!text) {
      input?.classList.add('shake');
      input?.addEventListener('animationend', () => input.classList.remove('shake'), { once: true });
      return;
    }

    const task = {
      id: genId(),
      text,
      done: false,
      priority: prioritySel ? prioritySel.value : 'medium',
      createdAt: new Date().toISOString(),
    };

    tasks.unshift(task);
    save();
    render();

    if (input) {
      input.value = '';
      input.focus();
    }

    Toast.success('Task added!');
  }

  function toggleDone(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;

    task.done = !task.done;
    task.doneAt = task.done ? new Date().toISOString() : null;
    save();
    render();
  }

  function deleteTask(id) {
    const item = list?.querySelector(`[data-id="${id}"]`);
    if (!item) {
      tasks = tasks.filter(task => task.id !== id);
      save();
      render();
      return;
    }

    item.classList.add('removing');
    item.addEventListener('animationend', () => {
      tasks = tasks.filter(task => task.id !== id);
      save();
      render();
    }, { once: true });
  }

  function clearCompleted() {
    tasks = tasks.filter(task => !task.done);
    save();
    render();
    Toast.info('Completed tasks cleared.');
  }

  function getFiltered() {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.done);
      case 'done':
        return tasks.filter(task => task.done);
      default:
        return tasks;
    }
  }

  function render() {
    const filtered = getFiltered();
    const active = tasks.filter(task => !task.done).length;

    if (badge) badge.textContent = active || '';
    if (countEl) countEl.textContent = `${active} remaining`;
    if (!list) return;

    list.innerHTML = '';

    if (filtered.length === 0) {
      list.innerHTML = `
        <li style="text-align:center;padding:24px;color:var(--text-muted);font-family:var(--font-mono);font-size:0.75rem;">
          ${filter === 'done' ? '✓ No completed tasks.' : '📋 No tasks yet. Add one above!'}
        </li>
      `;
      emit('stats:update');
      return;
    }

    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item${task.done ? ' done' : ''}`;
      li.dataset.id = task.id;
      li.innerHTML = `
        <button class="task-check" data-action="toggle" data-id="${task.id}" title="${task.done ? 'Mark active' : 'Mark done'}">
          ${task.done ? '✓' : ''}
        </button>
        <span class="task-priority-dot ${sanitize(task.priority)}" title="${sanitize(task.priority)} priority"></span>
        <span class="task-text">${sanitize(task.text)}</span>
        <button class="task-delete" data-action="delete" data-id="${task.id}" title="Delete task">✕</button>
      `;
      list.appendChild(li);
    });

    emit('stats:update');
  }

  function onListClick(event) {
    const btn = event.target.closest('[data-action]');
    if (!btn) return;

    const { id, action } = btn.dataset;
    if (action === 'toggle') toggleDone(id);
    if (action === 'delete') deleteTask(id);
  }

  function init() {
    load();
    render();

    if (addBtn) addBtn.addEventListener('click', addTask);
    if (input) input.addEventListener('keydown', event => { if (event.key === 'Enter') addTask(); });
    if (filterSel) {
      filterSel.addEventListener('change', event => {
        filter = event.target.value;
        render();
      });
    }
    if (clearDone) clearDone.addEventListener('click', clearCompleted);
    if (list) list.addEventListener('click', onListClick);
  }

  function getStats() {
    return {
      total: tasks.length,
      done: tasks.filter(task => task.done).length,
      active: tasks.filter(task => !task.done).length,
    };
  }

  return { init, getStats };
})();
