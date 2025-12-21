// script.js

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('active'));
}

// State
let selectedCategories = new Set();
let searchQuery = '';
let filteredPlaces = [];

// DOM
const categoriesGrid = document.getElementById('categoriesGrid');
const cardsGrid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const clearFiltersBtn = document.getElementById('clearFilters');
const activeFilterCountEl = document.getElementById('activeFilterCount');

const totalPlacesEl = document.getElementById('totalPlaces');
const totalCategoriesEl = document.getElementById('totalCategories');
const averageRatingEl = document.getElementById('averageRating');
const activeFiltersCountEl = document.getElementById('activeFiltersCount');
const filteredCountEl = document.getElementById('filteredCount');

const filterJumpBtn = document.getElementById('filterJump');

function updateFilterJumpVisibility() {
  if (!filterJumpBtn) return;
  const visible = selectedCategories.size > 0;
  filterJumpBtn.classList.toggle('is-visible', visible);
}

function scrollToCategories() {
  const el = document.getElementById('categories');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (filterJumpBtn) {
  filterJumpBtn.addEventListener('click', scrollToCategories);
}

// Stats helpers
function calculateStats(list) {
  const total = Array.isArray(list) ? list.length : 0;
  const avg = total
    ? (list.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) / total).toFixed(1)
    : '0.0';
  return { total, avg };
}

function loadStats() {
  const totalPlaces = (typeof allPlaces !== 'undefined' && Array.isArray(allPlaces)) ? allPlaces.length : 0;
  const totalCats = (typeof categories !== 'undefined' && Array.isArray(categories)) ? categories.length : 0;
  if (totalPlacesEl) totalPlacesEl.textContent = String(totalPlaces);
  if (totalCategoriesEl) totalCategoriesEl.textContent = String(totalCats);

  const stats = calculateStats(typeof allPlaces !== 'undefined' ? allPlaces : []);
  if (averageRatingEl) averageRatingEl.textContent = stats.avg;
}

function setActiveFilterText() {
  const txt = `${selectedCategories.size} aktif filtre`;
  if (activeFilterCountEl) activeFilterCountEl.textContent = txt;
  if (activeFiltersCountEl) activeFiltersCountEl.textContent = String(selectedCategories.size);
}

// Render categories with checkmark
function renderCategories() {
  if (!categoriesGrid) return;
  categoriesGrid.innerHTML = '';

  categories.forEach((category) => {
    const btn = document.createElement('button');
    btn.className = `category-card ${category.color}`;
    if (selectedCategories.has(category.id)) btn.classList.add('active');

    const count = allPlaces.filter((place) => place.category.includes(category.id)).length;

    btn.innerHTML = `
      <span class="category-check" aria-hidden="true">✓</span>
      <div class="category-icon">${category.icon}</div>
      <span class="category-name">${category.name}</span>
      <span class="category-count">${count}</span>
    `;

    btn.addEventListener('click', () => {
      // Special categories can route to separate pages (FAQ, Articles)
      if (category && category.action && category.action.type === 'page' && category.action.href) {
        window.location.href = category.action.href;
        return;
      }

      if (selectedCategories.has(category.id)) selectedCategories.delete(category.id);
      else selectedCategories.add(category.id);

      renderCategories();
      filterPlaces();
    });

    categoriesGrid.appendChild(btn);
  });

  setActiveFilterText();
  updateFilterJumpVisibility();
}

// Render cards (click -> selection.html?id=...)
function renderCards() {
  if (!cardsGrid) return;
  cardsGrid.innerHTML = '';

  if (!filteredPlaces.length) {
    cardsGrid.innerHTML = `
      <div class="no-results">
        <h4>Sonuç bulunamadı</h4>
        <p>Arama kriterlerinize uygun yer bulunamadı. Filtreleri temizlemeyi deneyin.</p>
      </div>
    `;
    return;
  }

  filteredPlaces.forEach((place) => {
    const card = document.createElement('div');
    card.className = 'card-item fade-in slide-up';

    const mainCategory = place.category[0];
    const categoryObj = categories.find((c) => c.id === mainCategory);
    const badgeColor = categoryObj ? categoryObj.color.replace('category-', '') : 'blue';

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${place.image}" alt="${place.title}" class="card-image" loading="lazy">
        <div class="card-badge" style="background: var(--primary-${badgeColor})">
          ${place.category
            .map((cat) => {
              const catObj = categories.find((c) => c.id === cat);
              return catObj ? catObj.name : cat;
            })
            .slice(0, 2)
            .join(', ')}
        </div>
      </div>
      <div class="card-content">
        <h4 class="card-title">
          <a class="card-title-link" href="selection.html?id=${encodeURIComponent(place.id)}">${place.title}</a>
        </h4>
        <p class="card-description">${place.description}</p>
        <div class="card-meta">
          <div class="meta-item">
            <svg class="meta-icon star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>${place.rating || ''}</span>
          </div>
          <div class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${place.duration || place.distance || ''}</span>
          </div>
          <div class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span>${place.price || ''}</span>
          </div>
        </div>
        <div class="card-actions">
          <a class="card-detail" href="selection.html?id=${encodeURIComponent(place.id)}">Detay</a>
        </div>
      </div>
    `;

    card.addEventListener('click', (e) => {
      // Allow normal link behavior
      if (e.target.closest('a')) return;
      window.location.href = `selection.html?id=${encodeURIComponent(place.id)}`;
    });

    cardsGrid.appendChild(card);
  });
}

function updateStats() {
  if (filteredCountEl) filteredCountEl.textContent = String(filteredPlaces.length);
  const s = calculateStats(filteredPlaces);
  if (averageRatingEl && filteredPlaces.length) averageRatingEl.textContent = s.avg;

  setActiveFilterText();
  updateFilterJumpVisibility();
}

function filterPlaces() {
  let filtered = [...allPlaces];

  if (selectedCategories.size > 0) {
    filtered = filtered.filter((place) => place.category.some((cat) => selectedCategories.has(cat)));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((place) => {
      const inTitle = (place.title || '').toLowerCase().includes(q);
      const inDesc = (place.description || '').toLowerCase().includes(q);
      const inTags = Array.isArray(place.tags) && place.tags.some((t) => (t || '').toLowerCase().includes(q));
      return inTitle || inDesc || inTags;
    });
  }

  filteredPlaces = filtered;
  renderCards();
  updateStats();
}

// Events
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterPlaces();
  });
}

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener('click', () => {
    selectedCategories.clear();
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    renderCategories();
    filterPlaces();
  });
}

// Init with robust data availability (NO window.* dependence)
function initKasGuide() {
  if (typeof allPlaces === 'undefined' || typeof categories === 'undefined') {
    window.addEventListener('load', initKasGuide, { once: true });
    return;
  }
  if (!Array.isArray(allPlaces) || !Array.isArray(categories)) {
    window.addEventListener('load', initKasGuide, { once: true });
    return;
  }

  filteredPlaces = [...allPlaces];
  loadStats();
  renderCategories();
  filterPlaces();
  updateFilterJumpVisibility();
}

document.addEventListener('DOMContentLoaded', initKasGuide);
