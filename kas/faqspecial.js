/* faqspecial.js
   Card list renderer for long-form FAQ series (faqspecial.html)
*/
(function () {
  function escapeHtml(str) {
    return String(str ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function normalize(s) {
    return String(s || '').toLowerCase().trim();
  }

  function matches(item, q) {
    if (!q) return true;
    const blob = [item.title, item.excerpt, item.longText].map(normalize).join(' ');
    return blob.includes(q);
  }

  function render(list) {
    const root = document.getElementById('cardsGrid');
    if (!root) return;

    if (!Array.isArray(list) || !list.length) {
      root.innerHTML = '<div class="no-results"><h4>Sonuç bulunamadı</h4><p>faqspecial-data.js içine veri ekleyebilirsin.</p></div>';
      return;
    }

    root.innerHTML = list.map((x) => {
      const href = `faqspecial-selection.html?id=${encodeURIComponent(x.id || '')}`;
      const title = escapeHtml(x.title || 'Özel Soru');
      const excerpt = escapeHtml(x.excerpt || '');
      const img = escapeHtml(x.image || '');
      return `
        <article class="article-card" role="button" tabindex="0" data-href="${escapeHtml(href)}">
          ${img ? `<img class="article-thumb" src="${img}" alt="${title}" loading="lazy">` : `<div class="article-thumb" aria-hidden="true"></div>`}
          <div class="article-body">
            <div class="article-h">${title}</div>
            ${excerpt ? `<div class="article-excerpt">${excerpt}</div>` : ''}
          </div>
        </article>
      `;
    }).join('');

    root.querySelectorAll('[data-href]').forEach((el) => {
      el.addEventListener('click', () => { window.location.href = el.getAttribute('data-href'); });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = el.getAttribute('data-href');
        }
      });
    });
  }

  function init() {
    const input = document.getElementById('faqSearch');
    const all = (typeof faqSpecialItems !== 'undefined' && Array.isArray(faqSpecialItems)) ? faqSpecialItems : [];

    function apply() {
      const q = normalize(input ? input.value : '');
      render(all.filter((x) => matches(x, q)));
    }

    if (input) input.addEventListener('input', apply);
    apply();
  }

  init();
})();
