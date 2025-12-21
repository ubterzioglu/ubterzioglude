/* selection.js
   Detail page renderer for places (selection.html?id=PLACE_ID)
   - Single source: selection-data.js (categories + allPlaces)
   - User-friendly layout
   - Extensible: unknown fields still show under "Detaylar" accordion
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

  function getCategories() {
    return (typeof categories !== 'undefined' && Array.isArray(categories)) ? categories : [];
  }

  function getPlaces() {
    return (typeof allPlaces !== 'undefined' && Array.isArray(allPlaces)) ? allPlaces : [];
  }

  function categoryNames(place) {
    if (!place || !Array.isArray(place.category)) return '';
    const cats = getCategories();
    return place.category
      .map((cid) => (cats.find((c) => c.id === cid)?.name || cid))
      .filter(Boolean)
      .join(' • ');
  }

  function asText(v) {
    if (v == null) return '';
    if (Array.isArray(v)) return v.map(asText).filter(Boolean).join(', ');
    if (typeof v === 'object') return JSON.stringify(v, null, 2);
    return String(v);
  }

  function linkHref(place) {
    const links = place?.links && typeof place.links === 'object' ? place.links : {};
    const instagram = place.instagram || links.instagram || '';
    const website = place.website || links.website || '';
    const booking = place.booking || links.booking || '';
    const googleMaps = place.googleMaps || place.maps || links.maps || '';

    let mapsHref = googleMaps;
    const coords = place?.coordinates;
    if (!mapsHref && coords && coords.lat != null && coords.lng != null) {
      mapsHref = `https://www.google.com/maps?q=${encodeURIComponent(String(coords.lat))},${encodeURIComponent(String(coords.lng))}`;
    }

    const phone = place.phone || links.phone || '';
    return { instagram, website, booking, maps: mapsHref, phone };
  }

  function actionBtn(href, label) {
    return `<a class="detail-action" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  }

  function phoneBtn(phone) {
    const raw = String(phone || '').trim();
    if (!raw) return '';
    const href = `tel:${raw.replace(/\s+/g, '')}`;
    return `<a class="detail-action" href="${escapeHtml(href)}">${escapeHtml(raw)}</a>`;
  }

  function chips(list) {
    const arr = Array.isArray(list) ? list.filter(Boolean) : [];
    if (!arr.length) return '';
    return `<div class="detail-chips">${arr.map((x) => `<span class="detail-chip">${escapeHtml(x)}</span>`).join('')}</div>`;
  }

  function kvRows(place, excludedKeys) {
    const entries = Object.entries(place || {})
      .filter(([k, v]) => !excludedKeys.has(k))
      .filter(([_, v]) => v != null && String(asText(v)).trim() !== '');

    // stable: alphabetical
    entries.sort(([a], [b]) => a.localeCompare(b));

    if (!entries.length) return `<div class="detail-muted">Ek detay yok.</div>`;

    return entries.map(([k, v]) => {
      const isObj = typeof v === 'object' && v !== null;
      const val = asText(v);
      return `
        <div class="detail-kv-row">
          <div class="detail-kv-key">${escapeHtml(k)}</div>
          ${isObj ? `<pre class="detail-kv-pre">${escapeHtml(val)}</pre>` : `<div class="detail-kv-val">${escapeHtml(val)}</div>`}
        </div>
      `;
    }).join('');
  }

  function renderNotFound(root) {
    root.innerHTML = `
      <article class="detail-card">
        <div class="detail-body">
          <h2 class="detail-title">Bulunamadı</h2>
          <p class="detail-muted">Bu id ile bir kayıt bulunamadı.</p>
          <div class="detail-actions">
            <a class="detail-action secondary" href="index.html">Ana sayfaya dön</a>
          </div>
        </div>
      </article>
    `;
  }

  function render(place) {
    const root = document.getElementById('detailRoot');
    if (!root) return;

    if (!place) return renderNotFound(root);

    const title = escapeHtml(place.title || 'Başlık');
    const cats = categoryNames(place);
    const img = place.image ? escapeHtml(place.image) : '';
    const desc = String(place.description || '').trim();
    const longTextRaw = String(place.longText || '').trim();

    const { instagram, website, booking, maps, phone } = linkHref(place);
    const actions = [
      instagram ? actionBtn(instagram, 'Instagram') : '',
      maps ? actionBtn(maps, 'Harita') : '',
      website ? actionBtn(website, 'Web') : '',
      booking ? actionBtn(booking, 'Rezervasyon') : '',
      phone ? phoneBtn(phone) : '',
    ].filter(Boolean).join('');

    const metaItems = [
      place.rating != null ? { label: 'Puan', value: place.rating } : null,
      place.price ? { label: 'Fiyat', value: place.price } : null,
      place.location ? { label: 'Konum', value: place.location } : null,
      place.distance ? { label: 'Mesafe', value: place.distance } : null,
      place.duration ? { label: 'Süre', value: place.duration } : null,
    ].filter(Boolean);

    const metaHtml = metaItems.length
      ? `<div class="detail-meta-grid">${metaItems.map((m) => `
          <div class="detail-meta-item">
            <div class="detail-meta-label">${escapeHtml(m.label)}</div>
            <div class="detail-meta-value">${escapeHtml(m.value ?? DASH)}</div>
          </div>
        `).join('')}</div>`
      : '';

    const chipsHtml = [
      chips(place.tags),
      chips(place.features),
      chips(place.facilities),
    ].filter(Boolean).join('');

    const excluded = new Set([
      'selected',
      'id','title','description','category','image',
      'longText',
      'rating','price','location','distance','duration',
      'phone','website','instagram','googleMaps','maps','booking',
      'links',
      'tags','features','facilities'
    ]);

    const detailsHtml = kvRows(place, excluded);

    root.innerHTML = `
      <article class="detail-card">
        <div class="detail-hero">
          ${img ? `<img class="detail-hero-img" src="${img}" alt="${title}">` : `<div class="detail-hero-fallback">${title}</div>`}
          <div class="detail-hero-overlay"></div>
          <div class="detail-hero-content">
            <h2 class="detail-title">${title}</h2>
            ${cats ? `<div class="detail-cats">${escapeHtml(cats)}</div>` : ''}
          </div>
        </div>

        <div class="detail-body">
          ${desc ? `<p class="detail-lead">${escapeHtml(desc)}</p>` : `<p class="detail-lead detail-muted">${DASH}</p>`}

          ${metaHtml}

          ${actions ? `<div class="detail-actions">${actions}</div>` : ''}

          ${chipsHtml ? `<div class="detail-divider"></div>${chipsHtml}` : ''}

          ${longTextRaw ? `
            <div class="detail-divider"></div>
            <h3 class="detail-section-title">Yazı</h3>
            <div class="detail-longtext">${escapeHtml(longTextRaw).replaceAll('\n','<br>')}</div>
          ` : ''}

          <div class="detail-divider"></div>

          <details class="detail-accordion">
            <summary class="detail-accordion-summary">Detaylar</summary>
            <div class="detail-accordion-body">
              ${detailsHtml}
            </div>
          </details>
        </div>
      </article>
    `;
  }

  const id = getId();
  const place = getPlaces().find((p) => String(p.id) === String(id));
  render(place);
})();
