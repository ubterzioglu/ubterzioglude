// Mobil menü toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Kategorileri render et
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    categories.forEach(category => {
        const categoryCard = document.createElement('button');
        categoryCard.className = `category-card ${category.color}`;
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <span class="category-name">${category.name}</span>
        `;
        
        categoryCard.addEventListener('click', () => {
            filterByCategory(category.id);
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// Öne çıkanları render et
function renderHighlights() {
    const highlightsGrid = document.getElementById('highlightsGrid');
    
    highlights.forEach(highlight => {
        const card = document.createElement('div');
        card.className = 'highlight-card';
        card.innerHTML = `
            <div class="highlight-image-wrapper">
                <img src="${highlight.image}" alt="${highlight.title}" class="highlight-image">
                <div class="highlight-badge ${highlight.badgeColor}">${highlight.category}</div>
            </div>
            <div class="highlight-content">
                <h4 class="highlight-title">${highlight.title}</h4>
                <div class="highlight-meta">
                    <div class="meta-item">
                        <svg class="meta-icon star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        <span>${highlight.rating}</span>
                    </div>
                    <div class="meta-item">
                        <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>${highlight.time}</span>
                    </div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            openPlaceDetail(highlight.id);
        });
        
        highlightsGrid.appendChild(card);
    });
}

// Kategoriye göre filtrele (ileride kullanılacak)
function filterByCategory(categoryId) {
    console.log(`Kategori filtrelendi: ${categoryId}`);
    // Bu fonksiyon, kategoriye göre içerik filtreleme için kullanılacak
    // Örnek: allPlaces dizisini filtrele ve yeniden render et
}

// Yer detayını aç (ileride kullanılacak)
function openPlaceDetail(placeId) {
    console.log(`Yer detayı açıldı: ${placeId}`);
    // Bu fonksiyon, modal veya yeni sayfa açmak için kullanılacak
}

// Arama fonksiyonu
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        performSearch(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
        }
    }
});

function performSearch(query) {
    console.log(`Arama yapıldı: ${query}`);
    // Bu fonksiyon, arama sonuçlarını göstermek için kullanılacak
    // Örnek: allPlaces, restaurants, hotels dizilerinde ara
}

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

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderHighlights();
    
    console.log('Kaş Rehberi yüklendi!');
    console.log('Toplam kategori:', categories.length);
    console.log('Toplam öne çıkan:', highlights.length);
    console.log('Toplam yer:', allPlaces.length);
});

// Scroll animasyonları (isteğe bağlı)
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
    const cards = document.querySelectorAll('.highlight-card, .category-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
});