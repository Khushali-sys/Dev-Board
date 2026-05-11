/* ============================================================
   DEVBOARD - WEATHER MODULE
   ============================================================ */

const Weather = (() => {
  const skeleton = document.getElementById('weatherSkeleton');
  const content = document.getElementById('weatherContent');
  const errorEl = document.getElementById('weatherError');
  const cityInput = document.getElementById('weatherCityInput');
  const refreshBtn = document.getElementById('weatherRefresh');

  const tempEl = document.getElementById('weatherTemp');
  const iconEl = document.getElementById('weatherIcon');
  const cityEl = document.getElementById('weatherCity');
  const condEl = document.getElementById('weatherCondition');
  const humEl = document.getElementById('weatherHumidity');
  const windEl = document.getElementById('weatherWind');
  const feelsEl = document.getElementById('weatherFeels');

  let currentCity = Store.get('weatherCity', CONFIG.DEFAULT_CITY);

  function showLoading() {
    if (skeleton) skeleton.style.display = 'block';
    if (content) content.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
  }

  function showContent(data) {
    if (skeleton) skeleton.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
    if (content) content.style.display = 'block';

    if (tempEl) tempEl.textContent = `${Math.round(data.temp)}°C`;
    if (iconEl) iconEl.textContent = data.icon;
    if (cityEl) cityEl.textContent = data.city;
    if (condEl) condEl.textContent = data.condition;
    if (humEl) humEl.textContent = `${data.humidity}%`;
    if (windEl) windEl.textContent = `${data.wind} km/h`;
    if (feelsEl) feelsEl.textContent = `${Math.round(data.feels_like)}°C`;
  }

  function showError() {
    if (skeleton) skeleton.style.display = 'none';
    if (content) content.style.display = 'none';
    if (errorEl) errorEl.style.display = 'flex';
  }

  async function fetchWeather(city) {
    showLoading();

    if (CONFIG.DEMO_MODE || CONFIG.WEATHER_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
      await new Promise(resolve => setTimeout(resolve, 300));
      showContent({ ...CONFIG.DEMO_WEATHER, city });
      return;
    }

    try {
      const url = `${CONFIG.WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${CONFIG.WEATHER_API_KEY}&units=${CONFIG.WEATHER_UNITS}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      showContent({
        city: `${data.name}, ${data.sys.country}`,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed * 3.6),
        icon: weatherIcon(data.weather[0].id),
      });
    } catch (error) {
      console.error('Weather fetch failed:', error);
      showError();
    }
  }

  const doSearch = debounce(() => {
    const city = (cityInput?.value || '').trim();
    if (!city) return;

    currentCity = city;
    Store.set('weatherCity', city);
    fetchWeather(city);
  }, 400);

  function spinRefresh() {
    if (!refreshBtn) return;
    refreshBtn.classList.add('spinning');
    setTimeout(() => refreshBtn.classList.remove('spinning'), 700);
  }

  function init() {
    if (cityInput) {
      cityInput.value = currentCity;
      cityInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          spinRefresh();
          doSearch();
        }
      });
      cityInput.addEventListener('change', () => {
        spinRefresh();
        doSearch();
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        spinRefresh();
        fetchWeather(currentCity);
      });
    }

    fetchWeather(currentCity);
  }

  return { init };
})();
