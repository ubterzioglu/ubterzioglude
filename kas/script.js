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
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const activeFiltersText = document.getElementById('activeFiltersText');
const totalPlacesElement = document.getElementById('totalPlaces');
const selectedCountElement = document.getElementById('selectedCount');
const filteredCountElement = document.getElementById('filteredCount');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModal');

// Kategorileri render et
function renderCategories() {
    categoriesGrid.innerHTML = '';
    
    categories.forEach(category => {
        const categoryCard = document.createElement('button');
        categoryCard.className = `category-card ${category.color}`;
        if (selectedCategories.has(category.id)) {
            categoryCard.classList.add('active');
        }
        
        // Kategori sayısını hesapla
        const categoryCount = allPlaces.filter(place => 
            place.category.includes(category.id)
        ).length;
        
        categoryCard.innerHTML = `
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

// Kategori toggle
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
    
    // Kategori filtresi
    if (selectedCategories.size > 0) {
        filtered = filtered.filter(place => 
            place.category.some(cat => selectedCategories.has(cat))
        );
    }
    
    // Arama filtresi
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(place => 
            place.title.toLowerCase().includes(query) ||
            place.description.toLowerCase().includes(query) ||
            place.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
    
    filteredPlaces = filtered;
    updateFiltersInfo();
    renderCards();
}

// Filtre bilgilerini güncelle
function updateFiltersInfo() {
    activeFiltersText.textContent = `${selectedCategories.size} aktif filtre`;
    filteredCountElement.textContent = filteredPlaces.length;
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
        card.className = 'place-card';
        
        const isSelected = place.selected ? 'selected' : '';
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${place.image}" alt="${place.title}" loading="lazy">
                <button class="select-btn ${isSelected}" data-id="${place.id}">
                    ${place.selected ? '✓ Seçildi' : '+ Seç'}
                </button>
            </div>
            <div class="card-content">
                <h3>${place.title}</h3>
                <p>${place.description}</p>
                <div class="card-tags">
                    ${place.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <button class="details-btn" data-id="${place.id}">
                    Detayları Gör
                </button>
            </div>
        `;
        
        // Seç butonu event
        const selectBtn = card.querySelector('.select-btn');
        selectBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlaceSelection(place.id);
        });
        
        // Detay butonu event
        const detailsBtn = card.querySelector('.details-btn');
        detailsBtn.addEventListener('click', () => {
            openModal(place);
        });
        
        cardsGrid.appendChild(card);
    });
}

// Yer seçimini toggle
function togglePlaceSelection(placeId) {
    const place = allPlaces.find(p => p.id === placeId);
    if (place) {
        place.selected = !place.selected;
        updateSelectedCount();
        saveSelectedPlaces();
        renderCards(); // kart üzerindeki seçildi durumunu güncelle
    }
}

// Seçili sayısını güncelle
function updateSelectedCount() {
    selectedCount = allPlaces.filter(place => place.selected).length;
    selectedCountElement.textContent = selectedCount;

    // Yeni istatistik alanlarını güncelle
    const selectedCountStat = document.getElementById('selectedCountStat');
    const activeFiltersCount = document.getElementById('activeFiltersCount');
    const filteredCount = document.getElementById('filteredCount');

    if (selectedCountStat) selectedCountStat.textContent = selectedCount;
    if (activeFiltersCount) activeFiltersCount.textContent = selectedCategories.size;
    if (filteredCount) filteredCount.textContent = filteredPlaces.length;
}

// Seçili yerleri kaydet
function saveSelectedPlaces() {
    const selectedIds = allPlaces.filter(place => place.selected).map(place => place.id);
    localStorage.setItem('kasSelectedPlaces', JSON.stringify(selectedIds));
}

// İstatistikleri yükle
function loadStats() {
    totalPlacesElement.textContent = allPlaces.length;
    updateSelectedCount();
}

// Modal aç
function openModal(place) {
    modalTitle.textContent = place.title;
    
    const categoriesList = place.category.map(catId => {
        const category = categories.find(c => c.id === catId);
        return category ? category.name : catId;
    }).join(', ');
    
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${place.image}" alt="${place.title}">
        </div>
        <div class="modal-info">
            <p><strong>Kategori:</strong> ${categoriesList}</p>
            <p><strong>Açıklama:</strong></p>
            <p>${place.description}</p>
            
            <div class="modal-tags">
                <strong>Etiketler:</strong>
                <div class="tags-container">
                    ${place.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-actions">
                ${place.instagram ? `<a href="${place.instagram}" target="_blank" class="action-btn instagram">Instagram</a>` : ''}
                ${place.googleMaps ? `<a href="${place.googleMaps}" target="_blank" class="action-btn maps">Haritada Gör</a>` : ''}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Modal kapat
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Modal kapatma eventleri
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

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

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // İstatistikler (toplam sayı alanları vs.)
    loadStats();

    // Seçili yerleri yükle (kartlar çizilmeden önce)
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

    // İlk ekran render
    renderCategories();
    filterPlaces(); // renderCards() yerine: hem filtre uygular hem kartları basar

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
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Kartlar için animasyon observer
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.place-card, .category-card, .stat-card');
    animateElements.forEach(el => observer.observe(el));
});
