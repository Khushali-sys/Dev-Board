/* ============================================================
   DEVBOARD - POMODORO MODULE
   ============================================================ */

const Pomodoro = (() => {
  const timerEl = document.getElementById('pomodoroTimer');
  const stateEl = document.getElementById('pomodoroState');
  const startBtn = document.getElementById('pomStart');
  const resetBtn = document.getElementById('pomReset');

  const FOCUS_SEC = CONFIG.POMODORO_FOCUS * 60;
  const BREAK_SEC = CONFIG.POMODORO_BREAK * 60;

  let secondsLeft = FOCUS_SEC;
  let isRunning = false;
  let isFocus = true;
  let interval = null;

  function format(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function updateDisplay() {
    if (timerEl) timerEl.textContent = format(secondsLeft);
    if (stateEl) {
      stateEl.textContent = isFocus ? 'Focus' : 'Break';
      stateEl.className = `pomodoro-state${isFocus ? '' : ' break'}`;
    }
  }

  function stopTimer() {
    clearInterval(interval);
    interval = null;
    isRunning = false;
    if (timerEl) timerEl.classList.remove('running');
  }

  function finishCycle() {
    stopTimer();
    Toast.info(isFocus ? '🍅 Focus done! Take a break.' : '⚡ Break over! Back to work.');

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('DevBoard - Pomodoro', {
        body: isFocus ? 'Focus session complete! Time for a break.' : 'Break is over. Let\'s focus!',
      });
    }

    isFocus = !isFocus;
    secondsLeft = isFocus ? FOCUS_SEC : BREAK_SEC;
    if (startBtn) startBtn.textContent = '▶ Start';
    updateDisplay();
  }

  function tick() {
    secondsLeft -= 1;
    updateDisplay();

    if (secondsLeft <= 0) {
      finishCycle();
    }
  }

  function start() {
    if (isRunning) {
      stopTimer();
      if (startBtn) startBtn.textContent = '▶ Start';
      return;
    }

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    isRunning = true;
    interval = setInterval(tick, 1000);
    if (startBtn) startBtn.textContent = '⏸ Pause';
    if (timerEl) timerEl.classList.add('running');
  }

  function reset() {
    stopTimer();
    isFocus = true;
    secondsLeft = FOCUS_SEC;
    if (startBtn) startBtn.textContent = '▶ Start';
    updateDisplay();
  }

  function init() {
    updateDisplay();
    if (startBtn) startBtn.addEventListener('click', start);
    if (resetBtn) resetBtn.addEventListener('click', reset);
  }

  return { init };
})();
