// Mobil menü toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
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
const filteredCountEl = document.getElementById('filteredCount');
const activeFiltersCountEl = document.getElementById('activeFiltersCount');

const filterFab = document.getElementById('filterFab');

// ---------- Helpers ----------
function calculateStats() {
  const totalPlaces = allPlaces.length;
  const totalCategories = categories.length;
  const avgRating =
    totalPlaces > 0
      ? (
          allPlaces.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) /
          totalPlaces
        ).toFixed(1)
      : '0.0';

  return { totalPlaces, totalCategories, averageRating: avgRating };
}

function loadStats() {
  const stats = calculateStats();

  if (totalPlacesEl) totalPlacesEl.textContent = `${stats.totalPlaces}`;
  if (totalCategoriesEl) totalCategoriesEl.textContent = `${stats.totalCategories}`;
  if (averageRatingEl) averageRatingEl.textContent = `${stats.averageRating}`;
}

function updateFabVisibility() {
  if (!filterFab) return;
  const visible = selectedCategories.size > 0;
  filterFab.classList.toggle('is-visible', visible);
}

function updateFilterLabels() {
  const txt = `${selectedCategories.size} aktif filtre`;
  if (activeFilterCountEl) activeFilterCountEl.textContent = txt;
  if (activeFiltersCountEl) activeFiltersCountEl.textContent = `${selectedCategories.size}`;
}

function updateFilteredCount() {
  if (filteredCountEl) filteredCountEl.textContent = `${filteredPlaces.length}`;
}

// ---------- Categories ----------
function renderCategories() {
  if (!categoriesGrid) return;
  categoriesGrid.innerHTML = '';

  categories.forEach((category) => {
    const categoryCard = document.createElement('button');
    categoryCard.className = `category-card ${category.color}`;
    if (selectedCategories.has(category.id)) categoryCard.classList.add('active');

    const categoryCount = allPlaces.filter((place) =>
      place.category.includes(category.id)
    ).length;

    categoryCard.innerHTML = `
      <span class="category-check" aria-hidden="true">✓</span>
      <div class="category-icon">${category.icon}</div>
      <span class="category-name">${category.name}</span>
      <span class="category-count">${categoryCount}</span>
    `;

    categoryCard.addEventListener('click', () => toggleCategory(category.id));
    categoriesGrid.appendChild(categoryCard);
  });
}

function toggleCategory(categoryId) {
  if (selectedCategories.has(categoryId)) selectedCategories.delete(categoryId);
  else selectedCategories.add(categoryId);

  renderCategories();
  filterPlaces();
}

// ---------- Filtering ----------
function filterPlaces() {
  let filtered = [...allPlaces];

  if (selectedCategories.size > 0) {
    filtered = filtered.filter((place) =>
      place.category.some((cat) => selectedCategories.has(cat))
    );
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((place) => {
      const title = (place.title || '').toLowerCase();
      const desc = (place.description || '').toLowerCase();
      const tags = Array.isArray(place.tags) ? place.tags : [];

      const matchText = title.includes(q) || desc.includes(q) || tags.some(t => (t || '').toLowerCase().includes(q));

      const matchCategoryName = place.category.some((cat) => {
        const catObj = categories.find((c) => c.id === cat);
        return catObj && (catObj.name || '').toLowerCase().includes(q);
      });

      return matchText || matchCategoryName;
    });
  }

  filteredPlaces = filtered;

  // UI updates
  updateFilterLabels();
  updateFilteredCount();
  updateFabVisibility();
  renderCards();
}

// ---------- Cards ----------
function renderCards() {
  if (!cardsGrid) return;
  cardsGrid.innerHTML = '';

  if (filteredPlaces.length === 0) {
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

    const mainCategory = place.category?.[0];
    const categoryObj = categories.find((c) => c.id === mainCategory);
    const badgeColor = categoryObj ? categoryObj.color.replace('category-', '') : 'blue';

    const badgeText = (place.category || [])
      .map((cat) => {
        const catObj = categories.find((c) => c.id === cat);
        return catObj ? catObj.name : cat;
      })
      .slice(0, 2)
      .join(', ');

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${place.image}" alt="${place.title}" class="card-image" loading="lazy">
        <div class="card-badge" style="background: var(--primary-${badgeColor})">
          ${badgeText}
        </div>
      </div>
      <div class="card-content">
        <h4 class="card-title">${place.title}</h4>
        <p class="card-description">${place.description}</p>
        <div class="card-meta">
          <div class="meta-item">
            <svg class="meta-icon star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>${place.rating ?? ''}</span>
          </div>
          <div class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${place.time ?? ''}</span>
          </div>
          <div class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span>${place.price ?? ''}</span>
          </div>
        </div>
      </div>
    `;

    cardsGrid.appendChild(card);
  });
}

// ---------- Events ----------
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value || '';
    filterPlaces();
  });
}

if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener('click', () => {
    selectedCategories.clear();
    if (searchInput) searchInput.value = '';
    searchQuery = '';
    renderCategories();
    filterPlaces();
  });
}

if (filterFab) {
  filterFab.addEventListener('click', () => {
    const target = document.getElementById('categories') || document.getElementById('top');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Init
function initKasGuide() {
  // In case data.js is delayed / cached oddly on some mobile browsers
  if (!Array.isArray(window.allPlaces) || !Array.isArray(window.categories)) {
    window.addEventListener('load', initKasGuide, { once: true });
    return;
  }
  filteredPlaces = [...allPlaces];
  loadStats();
  renderCategories();
  filterPlaces(); // ✅ ensures cards show on first load
  updateFabVisibility();
}

document.addEventListener('DOMContentLoaded', initKasGuide);
