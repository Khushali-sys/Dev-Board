/* ============================================================
   DEVBOARD — CLOCK MODULE
   ============================================================ */

const Clock = (() => {
  const timeEl    = document.getElementById('clockTime');
  const dateEl    = document.getElementById('clockDate');
  const bigEl     = document.getElementById('clockBig');
  const secsEl    = document.getElementById('clockSecs');
  const ampmEl    = document.getElementById('clockAmPm');
  const fullEl    = document.getElementById('clockFull');
  const tzEl      = document.getElementById('clockTz');
  const greetEl   = document.getElementById('greetingText');

  const GREETINGS = {
    night:     'Good night',
    morning:   'Good morning',
    afternoon: 'Good afternoon',
    evening:   'Good evening',
  };

  function getGreeting(hour) {
    if (hour >= 0  && hour < 5)  return GREETINGS.night;
    if (hour >= 5  && hour < 12) return GREETINGS.morning;
    if (hour >= 12 && hour < 17) return GREETINGS.afternoon;
    return GREETINGS.evening;
  }

  function tick() {
    const now = new Date();
    const h   = now.getHours();
    const m   = now.getMinutes();
    const s   = now.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12  = h % 12 || 12;

    const hh = String(h).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');

    // Topbar mini clock
    if (timeEl) timeEl.textContent = `${hh}:${mm}:${ss}`;
    if (dateEl) dateEl.textContent = now.toLocaleDateString('en-IN', {
      weekday: 'short', month: 'short', day: 'numeric'
    });

    // Big clock widget
    if (bigEl)  bigEl.textContent  = `${String(h12).padStart(2,'0')}:${mm}`;
    if (secsEl) secsEl.textContent = `:${ss}`;
    if (ampmEl) ampmEl.textContent = ampm;

    if (fullEl) fullEl.textContent = now.toLocaleDateString('en-IN', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

    // Greeting
    if (greetEl) greetEl.textContent = getGreeting(h);

    // Timezone
    if (tzEl) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      tzEl.textContent = tz || 'Local';
    }
  }

  function init() {
    tick();
    setInterval(tick, 1000);
  }

  return { init };
})();
