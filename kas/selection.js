// selection.js
(function () {
  function el(tag, attrs = {}, html = '') {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else node.setAttribute(k, v);
    });
    if (html) node.innerHTML = html;
    return node;
  }


  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  function catNames(place) {
    if (!place || !Array.isArray(place.category)) return '';
    return place.category
      .map((cid) => {
        const c = (typeof categories !== 'undefined' ? categories : []).find((x) => x.id === cid);
        return c ? c.name : cid;
      })
      .filter(Boolean)
      .join(' • ');
  }

  function linkButton(href, label) {
    return `<a class="detail-action" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }

  function renderNotFound(root) {
    root.innerHTML = `
      <div class="detail-card">
        <h2 class="detail-title">Bulunamadı</h2>
        <p class="detail-muted">Bu id ile bir kayıt bulunamadı.</p>
        <a class="detail-action" href="kasguide.html">Listeye dön</a>
      </div>
    `;
  }

  function render(place) {
    const root = document.getElementById('detailRoot');
    if (!root) return;

    if (!place) {
      renderNotFound(root);
      return;
    }

    const cats = catNames(place);
    const tags = Array.isArray(place.tags) ? place.tags : [];
    const actions = [];

    // Support both naming styles
    const instagram = place.instagram || place.links?.instagram;
    const maps = place.googleMaps || place.maps || place.links?.maps;
    const website = place.website || place.links?.website;
    const booking = place.booking || place.links?.booking;

    if (instagram) actions.push(linkButton(instagram, 'Instagram'));
    if (maps) actions.push(linkButton(maps, 'Harita'));
    if (website) actions.push(linkButton(website, 'Web'));
    if (booking) actions.push(linkButton(booking, 'Rezervasyon'));

    const et = place.et || place.dataset || '';

    root.innerHTML = `
      <article class="detail-card">
        <div class="detail-hero">
          <img class="detail-hero-img" src="${place.image}" alt="${place.title}">
          <div class="detail-hero-overlay"></div>
          <div class="detail-hero-content">
            <h2 class="detail-title">${place.title}</h2>
            ${cats ? `<div class="detail-cats">${cats}</div>` : ''}
          </div>
        </div>

        <div class="detail-body">
          <div class="detail-meta">
            ${place.rating ? `<div class="detail-meta-item"><span class="detail-meta-label">Puan</span><span class="detail-meta-value">${place.rating}</span></div>` : ''}
            ${place.time ? `<div class="detail-meta-item"><span class="detail-meta-label">Süre</span><span class="detail-meta-value">${place.time}</span></div>` : ''}
            ${place.price ? `<div class="detail-meta-item"><span class="detail-meta-label">Fiyat</span><span class="detail-meta-value">${place.price}</span></div>` : ''}
          </div>

          <p class="detail-desc">${place.description || ''}</p>

          ${tags.length ? `
            <div class="detail-tags">
              ${tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          ` 
          ${place.longText ? `
            <div class="detail-extra">
              <h3 class="detail-extra-title">Uzun Açıklama (Placeholder)</h3>
              <div class="detail-extra-box" style="white-space: pre-wrap;">${place.longText}</div>
            </div>
          ` : ''}

          <div class="detail-extra">
            <h3 class="detail-extra-title">Tüm Veri (Debug)</h3>
            <pre class="detail-extra-box" style="white-space: pre-wrap; overflow:auto; max-height: 360px;">${escapeHtml(JSON.stringify(place, null, 2))}</pre>
          </div>

: ''}

          ${et ? `
            <div class="detail-extra">
              <h3 class="detail-extra-title">Ek Bilgi</h3>
              <div class="detail-extra-box">${et}</div>
            </div>
          ` : ''}

          ${actions.length ? `
            <div class="detail-actions">
              ${actions.join('')}
            </div>
          ` : ''}

          <div class="detail-actions">
            <a class="detail-action secondary" href="kasguide.html#cards-section">Listeye dön</a>
          </div>
        </div>
      </article>
    `;
  }

  function init() {
    // Make sure data is loaded
    if (typeof allPlaces === 'undefined' || !Array.isArray(allPlaces)) {
      window.addEventListener('load', init, { once: true });
      return;
    }

    const id = getId();
    const place = allPlaces.find((p) => p.id === id);
    render(place);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
