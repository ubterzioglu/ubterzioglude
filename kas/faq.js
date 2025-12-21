/* faq.js
   Card list renderer for FAQ (faq.html)
   - Searchable
   - Click card -> faq-selection.html?id=FAQ_ID
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
    const blob = [item.question, item.answer].map(normalize).join(' ');
    return blob.includes(q);
  }

  function render(list) {
    const root = document.getElementById('faqList');
    if (!root) return;

    if (!Array.isArray(list) || !list.length) {
      root.innerHTML = '<div class="no-results"><h4>Henüz soru yok</h4><p>faq-data.js içine item ekleyebilirsin.</p></div>';
      return;
    }

    root.innerHTML = list.map((x) => {
      const q = escapeHtml(x.question || 'Soru');
      const a = escapeHtml(String(x.answer || '').trim());
      const preview = a ? a.slice(0, 120) + (a.length > 120 ? '…' : '') : '—';
      const href = `faq-selection.html?id=${encodeURIComponent(x.id || '')}`;
      return `
        <article class="faq-item" role="button" tabindex="0" data-href="${escapeHtml(href)}">
          <div class="faq-q">${q}</div>
          <div class="faq-a">${escapeHtml(preview)}</div>
        </article>
      `;
    }).join('');

    // click + keyboard
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
    const all = (typeof faqItems !== 'undefined' && Array.isArray(faqItems)) ? faqItems : [];

    function apply() {
      const q = normalize(input ? input.value : '');
      const filtered = all.filter((x) => matches(x, q));
      render(filtered);
    }

    if (input) input.addEventListener('input', apply);
    apply();
  }

  init();
})();
