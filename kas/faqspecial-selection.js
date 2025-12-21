/* faqspecial-selection.js
   Detail renderer for one long-form FAQ item (faqspecial-selection.html?id=ID)
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
    const list = (typeof faqSpecialItems !== 'undefined' && Array.isArray(faqSpecialItems)) ? faqSpecialItems : [];
    return list.find((x) => String(x.id) === String(id));
  }

  function renderNotFound(root) {
    root.innerHTML = `
      <article class="detail-card">
        <div class="detail-body">
          <h2 class="detail-title">Bulunamadı</h2>
          <p class="detail-muted">Bu id ile bir içerik bulunamadı.</p>
          <div class="detail-actions">
            <a class="detail-action secondary" href="faqspecial.html">Listeye dön</a>
          </div>
        </div>
      </article>
    `;
  }

  function render(item) {
    const root = document.getElementById('detailRoot');
    if (!root) return;
    if (!item) return renderNotFound(root);

    const title = escapeHtml(item.title || 'Özel Soru');
    const img = item.image ? `<img class="detail-hero-img" src="${escapeHtml(item.image)}" alt="${title}">` : '';
    const excerpt = item.excerpt ? `<div class="detail-muted" style="margin-top:.5rem">${escapeHtml(item.excerpt)}</div>` : '';

    const textRaw = String(item.longText || '').trim();
    const text = textRaw ? escapeHtml(textRaw).replaceAll('\n','<br>') : DASH;

    root.innerHTML = `
      <article class="detail-card">
        ${img ? `<div class="detail-hero">${img}<div class="detail-hero-overlay"></div><div class="detail-hero-content"><h2 class="detail-title">${title}</h2></div></div>` : ''}
        <div class="detail-body">
          ${img ? '' : `<h2 class="detail-title">${title}</h2>`}
          ${excerpt}
          <div class="detail-divider"></div>
          <div class="detail-longtext">${text}</div>

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
