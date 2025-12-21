/* articles-selection.js
   Detail renderer for one article (articles-selection.html?id=ARTICLE_ID)
*/
(function () {
  const DASH = '—';

  function escapeHtml(str) {
    return String(str ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function getId() {
    return new URLSearchParams(window.location.search).get('id');
  }

  function findItem(id) {
    const list = (typeof articles !== 'undefined' && Array.isArray(articles)) ? articles : [];
    return list.find((x) => String(x.id) === String(id));
  }

  function renderNotFound(root) {
    root.innerHTML = `
      <article class="detail-card">
        <div class="detail-body">
          <h2 class="detail-title">Bulunamadı</h2>
          <p class="detail-muted">Bu id ile bir yazı bulunamadı.</p>
          <div class="detail-actions">
            <a class="detail-action secondary" href="articles.html">Yazılara dön</a>
          </div>
        </div>
      </article>
    `;
  }

  function render(item) {
    const root = document.getElementById('detailRoot');
    if (!root) return;
    if (!item) return renderNotFound(root);

    const title = escapeHtml(item.title || 'Yazı');
    const img = item.image ? `<img class="detail-hero-img" src="${escapeHtml(item.image)}" alt="${title}">` : '';
    const excerpt = item.excerpt ? `<div class="detail-muted" style="margin-top:.5rem">${escapeHtml(item.excerpt)}</div>` : '';
    const meta = [item.source, item.date].filter(Boolean).join(' • ');
    const urlBtn = item.url ? `<a class="detail-action" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">Kaynağı aç</a>` : '';

    const contentRaw = String(item.content || '').trim();
    const content = contentRaw ? escapeHtml(contentRaw).replaceAll('\n','<br>') : DASH;

    root.innerHTML = `
      <article class="detail-card">
        ${img ? `<div class="detail-hero">${img}<div class="detail-hero-overlay"></div><div class="detail-hero-content"><h2 class="detail-title">${title}</h2></div></div>` : `
          <div class="detail-body"><h2 class="detail-title">${title}</h2></div>
        `}
        <div class="detail-body">
          ${excerpt}
          ${meta ? `<div class="detail-cats" style="margin-top:.5rem">${escapeHtml(meta)}</div>` : ''}
          ${urlBtn ? `<div class="detail-actions" style="margin-top:1rem">${urlBtn}</div>` : ''}

          <div class="detail-divider"></div>

          <div class="detail-longtext">${content}</div>

          <details class="detail-accordion">
            <summary class="detail-accordion-summary">Detaylar</summary>
            <div class="detail-accordion-body">
              <div class="detail-kv-row">
                <div class="detail-kv-key">id</div>
                <div class="detail-kv-val">${escapeHtml(item.id || '')}</div>
              </div>
            </div>
          </details>
        </div>
      </article>
    `;
  }

  render(findItem(getId()));
})();
