/* ============================================================
   DEVBOARD — STATS MODULE
   ============================================================ */

const Stats = (() => {
  const totalEl   = document.getElementById('statTasksTotal');
  const doneEl    = document.getElementById('statTasksDone');
  const notesEl   = document.getElementById('statNotes');
  const streakEl  = document.getElementById('statStreak');
  const tasksBar  = document.getElementById('statTasksBar');
  const doneBar   = document.getElementById('statDoneBar');
  const fillEl    = document.getElementById('progressFill');
  const pctEl     = document.getElementById('progressPct');

  function updateStreak() {
    const today    = new Date().toDateString();
    const lastDay  = Store.get('lastActiveDay', '');
    let streak     = Store.get('streak', 1);

    if (lastDay !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      streak = (lastDay === yesterday) ? streak + 1 : 1;
      Store.set('streak', streak);
      Store.set('lastActiveDay', today);
    }

    return streak;
  }

  function animateTo(el, value) {
    if (!el) return;
    const start   = parseInt(el.textContent) || 0;
    const dur     = 600;
    const t0      = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 2);
      el.textContent = Math.round(start + (value - start) * ease);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function update() {
    const ts     = Tasks.getStats();
    const noteCount = Notes.getCount();
    const streak = updateStreak();
    const pct    = ts.total > 0 ? Math.round((ts.done / ts.total) * 100) : 0;

    animateTo(totalEl, ts.total);
    animateTo(doneEl,  ts.done);
    animateTo(notesEl, noteCount);
    animateTo(streakEl, streak);

    if (tasksBar) tasksBar.style.width = ts.total > 0 ? '100%' : '0%';
    if (doneBar)  doneBar.style.width  = `${pct}%`;
    if (fillEl)   fillEl.style.width   = `${pct}%`;
    if (pctEl)    pctEl.textContent    = `${pct}%`;
  }

  function init() {
    update();
    on('stats:update', update);
    on('tasks:changed', update);
  }

  return { init, update };
})();