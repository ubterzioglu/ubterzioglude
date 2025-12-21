// selection.js
(function () {
  function escapeHtml(str) {
    return String(str ?? '')
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

  function getCategoryNames(place) {
    if (!place || !Array.isArray(place.category)) return '';
    const cats = (typeof categories !== 'undefined' && Array.isArray(categories)) ? categories : [];
    return place.category
      .map((cid) => {
        const c = cats.find((x) => x.id === cid);
        return c ? c.name : cid;
      })
      .filter(Boolean)
      .join(' • ');
  }

  function normalizeLinks(place) {
    const links = place?.links && typeof place.links === 'object' ? place.links : {};
    const instagram = place.instagram || links.instagram || '';
    const website = place.website || links.website || '';
    const booking = place.booking || links.booking || '';
    const maps = place.googleMaps || place.maps || links.maps || '';

    let mapsHref = maps;

    // If we have coordinates but no maps link, generate one.
    const coords = place?.coordinates;
    if (!mapsHref && coords && typeof coords === 'object' && coords.lat != null && coords.lng != null) {
      const lat = encodeURIComponent(String(coords.lat));
      const lng = encodeURIComponent(String(coords.lng));
      mapsHref = `https://www.google.com/maps?q=${lat},${lng}`;
    }

    const phone = place.phone || links.phone || '';
    return { instagram, website, booking, maps: mapsHref, phone };
  }

  function linkButton(href, label) {
    const safeHref = escapeHtml(href);
    const safeLabel = escapeHtml(label);
    return `<a class="detail-action" href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeLabel}</a>`;
  }

  function phoneButton(phone) {
    const raw = String(phone || '').trim();
    if (!raw) return '';
    const href = `tel:${raw.replace(/\s+/g, '')}`;
    return `<a class="detail-action" href="${escapeHtml(href)}">${escapeHtml(raw)}</a>`;
  }

  function formatValue(v) {
    if (v == null) return '';
    if (Array.isArray(v)) {
      return v.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(', ');
    }
    if (typeof v === 'object') {
      // Keep objects readable but compact
      return JSON.stringify(v, null, 2);
    }
    return String(v);
  }

  function buildKeyValueRows(place) {
    // Present all fields, but avoid duplicating the hero fields too much.
    const hiddenKeys = new Set(['selected']); // internal only
    const entries = Object.entries(place || {}).filter(([k]) => !hiddenKeys.has(k));
    // Keep stable order: common first, rest alphabetical
    const priority = [
      'id', 'title', 'description', 'category', 'tags', 'features', 'facilities',
      'rating', 'time', 'price', 'location', 'distance', 'bestTime', 'duration',
      'phone', 'website', 'instagram', 'googleMaps', 'maps', 'booking', 'coordinates', 'image', 'longText', 'et', 'dataset'
    ];

    const order = new Map(priority.map((k, i) => [k, i]));
    entries.sort(([a], [b]) => {
      const ai = order.has(a) ? order.get(a) : 999;
      const bi = order.has(b) ? order.get(b) : 999;
      if (ai !== bi) return ai - bi;
      return a.localeCompare(b);
    });

    return entries
      .map(([k, v]) => {
        const val = formatValue(v);
        if (!val) return '';
        const isObj = typeof v === 'object' && v !== null;
        const body = isObj
          ? `<pre class="detail-kv-pre">${escapeHtml(val)}</pre>`
          : `<div class="detail-kv-val">${escapeHtml(val)}</div>`;
        return `
          <div class="detail-kv-row">
            <div class="detail-kv-key">${escapeHtml(k)}</div>
            ${body}
          </div>
        `;
      })
      .filter(Boolean)
      .join('');
  }

  function renderNotFound(root) {
    root.innerHTML = `
      <div class="detail-card">
        <div class="detail-body">
          <h2 class="detail-title">Bulunamadı</h2>
          <p class="detail-muted">Bu id ile bir kayıt bulunamadı.</p>
          <div class="detail-actions">
            <a class="detail-action secondary" href="kasguide.html">Listeye dön</a>
          </div>
        </div>
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

    const cats = getCategoryNames(place);
    const tags = Array.isArray(place.tags) ? place.tags : [];
    const { instagram, website, booking, maps, phone } = normalizeLinks(place);
    const actions = [];

    if (instagram) actions.push(linkButton(instagram, 'Instagram'));
    if (maps) actions.push(linkButton(maps, 'Harita'));
    if (website) actions.push(linkButton(website, 'Web'));
    if (booking) actions.push(linkButton(booking, 'Rezervasyon'));

    const et = place.et || place.dataset || '';

    const kvRows = buildKeyValueRows(place);

    root.innerHTML = `
      <article class="detail-card">
        <div class="detail-hero">
          <img class="detail-hero-img" src="${escapeHtml(place.image || '')}" alt="${escapeHtml(place.title || '')}">
          <div class="detail-hero-overlay"></div>
          <div class="detail-hero-content">
            <h2 class="detail-title">${escapeHtml(place.title || '')}</h2>
            ${cats ? `<div class="detail-cats">${escapeHtml(cats)}</div>` : ''}
          </div>
        </div>

        <div class="detail-body">
          <div class="detail-meta">
            ${place.rating ? `<div class="detail-meta-item"><span class="detail-meta-label">Puan</span><span class="detail-meta-value">${escapeHtml(place.rating)}</span></div>` : ''}
            ${place.time ? `<div class="detail-meta-item"><span class="detail-meta-label">Süre</span><span class="detail-meta-value">${escapeHtml(place.time)}</span></div>` : ''}
            ${place.price ? `<div class="detail-meta-item"><span class="detail-meta-label">Fiyat</span><span class="detail-meta-value">${escapeHtml(place.price)}</span></div>` : ''}
          </div>

          ${place.description ? `<p class="detail-desc">${escapeHtml(place.description)}</p>` : ''}

          ${
            tags.length
              ? `<div class="detail-tags">${tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>`
              : ''
          }

          ${
            place.longText
              ? `
            <div class="detail-extra">
              <h3 class="detail-extra-title">Uzun Açıklama</h3>
              <div class="detail-extra-box" style="white-space: pre-wrap;">${escapeHtml(place.longText)}</div>
            </div>
          `
              : ''
          }

          ${
            et
              ? `
            <div class="detail-extra">
              <h3 class="detail-extra-title">Ek Bilgi</h3>
              <div class="detail-extra-box" style="white-space: pre-wrap;">${escapeHtml(et)}</div>
            </div>
          `
              : ''
          }

          ${
            kvRows
              ? `
            <div class="detail-extra">
              <h3 class="detail-extra-title">Bu item’in tüm verisi (alan alan)</h3>
              <div class="detail-kv">
                ${kvRows}
              </div>
            </div>
          `
              : ''
          }

          <div class="detail-extra">
            <h3 class="detail-extra-title">Tüm Veri (JSON Debug)</h3>
            <pre class="detail-extra-box" style="white-space: pre-wrap; overflow:auto; max-height: 420px;">${escapeHtml(
              JSON.stringify(place, null, 2)
            )}</pre>
          </div>

          ${(phone ? `
            <div class="detail-extra">
              <h3 class="detail-extra-title">Telefon</h3>
              <div class="detail-actions">
                ${phoneButton(phone)}
              </div>
            </div>` : '')}

          ${
            actions.length
              ? `<div class="detail-actions">${actions.join('')}</div>`
              : ''
          }

          <div class="detail-actions">
            <a class="detail-action secondary" href="kasguide.html#cards-section">Listeye dön</a>
          </div>
        </div>
      </article>
    `;
  }

  function init() {
    // Ensure data is loaded (some mobile browsers may delay script execution)
    if (typeof allPlaces === 'undefined' || !Array.isArray(allPlaces)) {
      window.addEventListener('load', init, { once: true });
      return;
    }
    const id = getId();
    const place = allPlaces.find((p) => String(p.id) === String(id));
    render(place);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
