// HTML elementlerini seçelim
const cityGrid = document.getElementById('city-grid');
const modal = document.getElementById('city-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

// 1. Sayfa Yüklendiğinde Kartları Oluştur
function init() {
    citiesData.forEach(city => {
        const card = document.createElement('div');
        card.classList.add('city-card');
        
        // Kartın HTML içeriği
        card.innerHTML = `
            <img src="${city.image}" alt="${city.name}" class="card-image">
            <div class="card-info">
                <h2>${city.plaka ? city.name : city.id + ' - ' + city.name}</h2>
                <p><strong>Bölge:</strong> ${city.kunye.bolge}</p>
                <span class="btn-detail">İncele</span>
            </div>
        `;

        // Karta tıklanınca detayları aç
        card.addEventListener('click', () => openModal(city));
        
        cityGrid.appendChild(card);
    });
}

// 2. Modalı Aç ve İçeriği Doldur
function openModal(city) {
    // 10 Bilgi listesini HTML listesine çevir
    const infoList = city.bilinmesiGerekenler.map(item => `<li>${item}</li>`).join('');

    const modalContentHTML = `
        <img src="${city.image}" class="modal-header-img">
        <h2>${city.name} (${city.kunye.plaka})</h2>
        
        <div class="detail-section">
            <h3>🏙️ Şehir Künyesi</h3>
            <div class="kunye-grid">
                <div class="kunye-item"><strong>Nüfus</strong>${city.kunye.nufus}</div>
                <div class="kunye-item"><strong>Bölge</strong>${city.kunye.bolge}</div>
                <div class="kunye-item"><strong>Plaka</strong>${city.kunye.plaka}</div>
            </div>
        </div>

        <div class="detail-section">
            <h3>🌟 En Meşhur Şeyi</h3>
            <p>${city.meshur}</p>
        </div>

        <div class="detail-section">
            <h3>📢 Bilinmesi Gereken 10 Şey</h3>
            <ul class="info-list">
                ${infoList}
            </ul>
        </div>
    `;

    modalBody.innerHTML = modalContentHTML;
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Arka plan kaydırmayı engelle
}

// 3. Modalı Kapatma İşlemleri
closeBtn.onclick = function() {
    closeModal();
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Kaydırmayı tekrar aç
}

// Uygulamayı başlat
init();