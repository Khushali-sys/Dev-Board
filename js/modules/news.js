/* ============================================================
   DEVBOARD - NEWS MODULE
   ============================================================ */

const News = (() => {
  const skeleton = document.getElementById('newsSkeleton');
  const listEl = document.getElementById('newsList');
  const errorEl = document.getElementById('newsError');
  const refreshBtn = document.getElementById('newsRefresh');
  const categoryEl = document.getElementById('newsCategory');

  let currentCategory = 'technology';

  function showSkeleton() {
    if (skeleton) {
      skeleton.style.display = 'block';
      skeleton.innerHTML = Array(5).fill(`
        <div class="news-skeleton__item">
          <div class="skeleton-line"></div>
          <div class="skeleton-line skeleton-line--sm"></div>
        </div>
      `).join('');
    }

    if (listEl) listEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
  }

  function showError() {
    if (skeleton) skeleton.style.display = 'none';
    if (listEl) listEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'flex';
  }

  function resolveArticleUrl(article) {
    if (article?.url && article.url !== '#') return article.url;

    const query = encodeURIComponent(article?.title || 'developer news');
    return `https://www.google.com/search?q=${query}`;
  }

  function renderArticles(articles) {
    if (skeleton) skeleton.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
    if (!listEl) return;

    listEl.style.display = 'grid';
    listEl.innerHTML = '';

    if (!articles?.length) {
      listEl.innerHTML = '<li style="color:var(--text-muted);font-family:var(--font-mono);font-size:0.75rem;padding:20px 0;">No articles found.</li>';
      return;
    }

    articles.forEach((article, index) => {
      const li = document.createElement('li');
      const articleUrl = resolveArticleUrl(article);

      li.className = 'news-list__item';

      li.innerHTML = `
        <a
          class="news-item"
          href="${sanitize(articleUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open article: ${sanitize(article.title || 'Untitled')}"
          style="animation-delay:${index * 40}ms"
        >
          <div class="news-item__thumb">${sanitize(article.icon || 'News')}</div>
          <div class="news-item__body">
            <div class="news-item__title">${sanitize(article.title || 'Untitled')}</div>
            <div class="news-item__meta">
              <span class="news-item__source">${sanitize(article.source || 'News')}</span>
              <span class="news-item__time">${sanitize(article.time || '')}</span>
            </div>
          </div>
        </a>
      `;

      listEl.appendChild(li);
    });
  }

  async function fetchNews(category = 'technology') {
    showSkeleton();

    if (CONFIG.DEMO_MODE || CONFIG.NEWS_API_KEY === 'YOUR_NEWSAPI_KEY') {
      await new Promise(resolve => setTimeout(resolve, 250));
      renderArticles(CONFIG.DEMO_NEWS_BY_CATEGORY[category] || CONFIG.DEMO_NEWS_BY_CATEGORY.technology);
      return;
    }

    try {
      const url = `${CONFIG.NEWS_API_URL}?category=${category}&country=${CONFIG.NEWS_COUNTRY}&pageSize=${CONFIG.NEWS_PAGE_SIZE}&apiKey=${CONFIG.NEWS_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      renderArticles(data.articles || []);
    } catch (error) {
      console.error('News fetch failed:', error);
      showError();
    }
  }

  function spinRefresh() {
    if (!refreshBtn) return;
    refreshBtn.classList.add('spinning');
    setTimeout(() => refreshBtn.classList.remove('spinning'), 700);
  }

  function init() {
    fetchNews(currentCategory);

    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        spinRefresh();
        fetchNews(currentCategory);
      });
    }

    if (categoryEl) {
      categoryEl.value = currentCategory;
      categoryEl.addEventListener('change', event => {
        currentCategory = event.target.value;
        fetchNews(currentCategory);
      });
    }
  }

  return { init };
})();
