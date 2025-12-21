// Mobil menü toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Değişkenler
let selectedCategories = new Set();
let searchQuery = '';
let filteredPlaces = [...allPlaces];

// DOM Elementleri
const categoriesGrid = document.getElementById('categoriesGrid');
const cardsGrid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const clearFiltersBtn = document.getElementById('clearFilters');
const activeFilterCountEl = document.getElementById('activeFilterCount');
const totalPlacesEl = document.getElementById('totalPlaces');
const filteredCountEl = document.getElementById('filteredCount');
const averageRatingEl = document.getElementById('averageRating');
const totalCategoriesEl = document.getElementById('totalCategories');

// Basit istatistik hesaplama (dışarıda tanımlı değilse sayfa hata vermesin diye burada)
function calculateStats() {
  const totalPlaces = allPlaces.length;
  const totalCategories = categories.length;
  const avgRating =
    totalPlaces > 0
      ? (allPlaces.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) / totalPlaces).toFixed(1)
      : '0.0';

  return {
    totalPlaces,
    totalCategories,
    averageRating: avgRating,
  };
}

// İstatistikleri yükle
function loadStats() {
  const stats = calculateStats();
  totalPlacesEl.textContent = `${stats.totalPlaces}+`;
  totalCategoriesEl.textContent = stats.totalCategories;
  averageRatingEl.textContent = stats.averageRating;
}

// Kategorileri render et
function renderCategories() {
  categoriesGrid.innerHTML = '';

  categories.forEach((category) => {
    const categoryCard = document.createElement('button');
    categoryCard.className = `category-card ${category.color}`;
    if (selectedCategories.has(category.id)) {
      categoryCard.classList.add('active');
    }

    // Kategori sayısını hesapla
    const categoryCount = allPlaces.filter((place) => place.category.includes(category.id)).length;

    // ✅ Sağ üst ✓ sadece .active iken CSS ile görünür
    categoryCard.innerHTML = `
      <span class="category-check" aria-hidden="true">✓</span>
      <div class="category-icon">${category.icon}</div>
      <span class="category-name">${category.name}</span>
      <span class="category-count">${categoryCount}</span>
    `;

    categoryCard.addEventListener('click', () => {
      toggleCategory(category.id);
    });

    categoriesGrid.appendChild(categoryCard);
  });
}

// Kartları render et (mekan seçimi tamamen kaldırıldı)
function renderCards() {
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

    // Kategori etiketleri için renk belirle
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
        <h4 class="card-title">${place.title}</h4>
        <p class="card-description">${place.description}</p>
        <div class="card-meta">
          <div class="meta-item">
            <svg class="meta-icon star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>${place.rating}</span>
          </div>
          <div class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${place.time}</span>
          </div>
          <div class="meta-item">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span>${place.price}</span>
          </div>
        </div>
      </div>
    `;

    cardsGrid.appendChild(card);
  });

  updateStats();
}

// Kategori seç/deseç
function toggleCategory(categoryId) {
  if (selectedCategories.has(categoryId)) {
    selectedCategories.delete(categoryId);
  } else {
    selectedCategories.add(categoryId);
  }

  renderCategories();
  filterPlaces();
}

// Yerleri filtrele
function filterPlaces() {
  let filtered = [...allPlaces];

  // Kategori filtreleme
  if (selectedCategories.size > 0) {
    filtered = filtered.filter((place) => place.category.some((cat) => selectedCategories.has(cat)));
  }

  // Arama filtreleme
  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (place) =>
        place.title.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query) ||
        place.category.some((cat) => {
          const catObj = categories.find((c) => c.id === cat);
          return catObj && catObj.name.toLowerCase().includes(query);
        })
    );
  }

  filteredPlaces = filtered;
  renderCards();
}

// Arama işlemi
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  filterPlaces();
});

// Filtreleri temizle
clearFiltersBtn.addEventListener('click', () => {
  selectedCategories.clear();
  searchInput.value = '';
  searchQuery = '';
  renderCategories();
  filterPlaces();
});

// İstatistikleri güncelle
function updateStats() {
  filteredCountEl.textContent = filteredPlaces.length;

  if (filteredPlaces.length > 0) {
    const avgRating = (
      filteredPlaces.reduce((sum, p) => sum + (Number(p.rating) || 0), 0) / filteredPlaces.length
    ).toFixed(1);
    averageRatingEl.textContent = avgRating;
  }

  activeFilterCountEl.textContent = `${selectedCategories.size} aktif filtre`;

  const activeFiltersCount = document.getElementById('activeFiltersCount');
  if (activeFiltersCount) activeFiltersCount.textContent = selectedCategories.size;

  const filteredCount = document.getElementById('filteredCount');
  if (filteredCount) filteredCount.textContent = filteredPlaces.length;
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  renderCategories();
  filterPlaces();

  console.log('Kaş Rehberi yüklendi!');
  console.log('Toplam kategori:', categories.length);
  console.log('Toplam yer:', allPlaces.length);
});

// Scroll animasyonları
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Kartlara animasyon ekle
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-item');
  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
