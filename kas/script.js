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
let selectedCount = 0;

// DOM Elementleri
const categoriesGrid = document.getElementById('categoriesGrid');
const cardsGrid = document.getElementById('cardsGrid');
const searchInput = document.getElementById('searchInput');
const clearFiltersBtn = document.getElementById('clearFilters');
const saveSelectionBtn = document.getElementById('saveSelection');
const selectedCountEl = document.getElementById('selectedCount');
const activeFilterCountEl = document.getElementById('activeFilterCount');
const totalPlacesEl = document.getElementById('totalPlaces');
const filteredCountEl = document.getElementById('filteredCount');
const averageRatingEl = document.getElementById('averageRating');
const totalCategoriesEl = document.getElementById('totalCategories');

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
    
    categories.forEach(category => {
        const categoryCard = document.createElement('button');
        categoryCard.className = `category-card ${category.color}`;
        if (selectedCategories.has(category.id)) {
            categoryCard.classList.add('active');
        }
        
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <span class="category-name">${category.name}</span>
        `;
        
        categoryCard.addEventListener('click', () => {
            toggleCategory(category.id);
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// Kartları render et
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
    
    filteredPlaces.forEach(place => {
        const card = document.createElement('div');
        card.className = 'card-item fade-in slide-up';
        if (place.selected) {
            card.classList.add('selected');
        }
        
        // Kategori etiketleri için renk belirle
        const mainCategory = place.category[0];
        const categoryObj = categories.find(c => c.id === mainCategory);
        const badgeColor = categoryObj ? categoryObj.color.replace('category-', '') : 'blue';
        
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${place.image}" alt="${place.title}" class="card-image" loading="lazy">
                <div class="card-badge" style="background: var(--primary-${badgeColor})">
                    ${place.category.map(cat => {
                        const catObj = categories.find(c => c.id === cat);
                        return catObj ? catObj.name : cat;
                    }).slice(0, 2).join(', ')}
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
        
        card.addEventListener('click', (e) => {
            // Check işareti butonuna tıklamadıysa
            if (!e.target.closest('.card-badge')) {
                togglePlaceSelection(place.id);
            }
        });
        
        cardsGrid.appendChild(card);
    });
    
    // İstatistikleri güncelle
    updateStats();
    updateSelectedCount();
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

// Kart seç/deseç
function togglePlaceSelection(placeId) {
    const place = allPlaces.find(p => p.id === placeId);
    if (place) {
        place.selected = !place.selected;
        saveSelectedPlaces();
        filterPlaces();
    }
}

// Yerleri filtrele
function filterPlaces() {
    let filtered = [...allPlaces];
    
    // Kategori filtreleme
    if (selectedCategories.size > 0) {
        filtered = filtered.filter(place => 
            place.category.some(cat => selectedCategories.has(cat))
        );
    }
    
    // Arama filtreleme
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(place => 
            place.title.toLowerCase().includes(query) ||
            place.description.toLowerCase().includes(query) ||
            place.category.some(cat => {
                const catObj = categories.find(c => c.id === cat);
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

// Seçimi kaydet
saveSelectionBtn.addEventListener('click', () => {
    saveSelectedPlaces();
    alert(`${selectedCount} yer seçiminiz kaydedildi!`);
});

// Seçili yerleri kaydet
function saveSelectedPlaces() {
    const selectedIds = allPlaces
        .filter(place => place.selected)
        .map(place => place.id);
    
    localStorage.setItem('kasSelectedPlaces', JSON.stringify(selectedIds));
}

// İstatistikleri güncelle
function updateStats() {
    filteredCountEl.textContent = filteredPlaces.length;
    
    if (filteredPlaces.length > 0) {
        const avgRating = (filteredPlaces.reduce((sum, p) => sum + p.rating, 0) / filteredPlaces.length).toFixed(1);
        averageRatingEl.textContent = avgRating;
    }
    
    activeFilterCountEl.textContent = `${selectedCategories.size} aktif filtre`;
}

// Seçili sayısını güncelle
function updateSelectedCount() {
    selectedCount = allPlaces.filter(place => place.selected).length;
    selectedCountEl.textContent = `${selectedCount} seçili`;
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    renderCategories();
    renderCards();
    
    // Seçili yerleri yükle
    const saved = localStorage.getItem('kasSelectedPlaces');
    if (saved) {
        const selectedIds = JSON.parse(saved);
        allPlaces.forEach(place => {
            if (selectedIds.includes(place.id)) {
                place.selected = true;
            }
        });
        updateSelectedCount();
    }
    
    console.log('Kaş Rehberi yüklendi!');
    console.log('Toplam kategori:', categories.length);
    console.log('Toplam yer:', allPlaces.length);
});

// Scroll animasyonları
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Kartlara animasyon ekle
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});