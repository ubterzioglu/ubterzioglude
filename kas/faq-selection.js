/* faq-selection.js
   Detail renderer for one FAQ item (faq-selection.html?id=FAQ_ID)
*/
(function () {
  const DASH = '—';

  function escapeHtml(str) {
    return String(str ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');
  }

  function getId() {
    return new URLSearchParams(window.location.search).get('id');
  }

  function findItem(id) {
    const list = (typeof faqItems !== 'undefined' && Array.isArray(faqItems)) ? faqItems : [];
    return list.find((x) => String(x.id) === String(id));
  }

  function renderNotFound(root) {
    root.innerHTML = `
      <article class="detail-card">
        <div class="detail-body">
          <h2 class="detail-title">Bulunamadı</h2>
          <p class="detail-muted">Bu id ile bir soru bulunamadı.</p>
          <div class="detail-actions">
            <a class="detail-action secondary" href="faq.html">Soru listesine dön</a>
          </div>
        </div>
      </article>
    `;
  }

  function render(item) {
    const root = document.getElementById('detailRoot');
    if (!root) return;

    if (!item) return renderNotFound(root);

    const q = escapeHtml(item.question || 'Soru');
    const aRaw = String(item.answer || '').trim();
    const a = aRaw ? escapeHtml(aRaw) : DASH;

    root.innerHTML = `
      <article class="detail-card">
        <div class="detail-body">
          <h2 class="detail-title">${q}</h2>
          <div class="detail-divider"></div>
          <div class="detail-longtext">${a.replaceAll('\n','<br>')}</div>

          <details class="detail-accordion" open>
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
