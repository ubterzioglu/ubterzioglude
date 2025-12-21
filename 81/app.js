const cityGrid = document.getElementById('city-grid');
const modal = document.getElementById('city-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

function init() {
    cityGrid.innerHTML = ""; // Önce temizle
    citiesData.forEach(city => {
        const card = document.createElement('div');
        card.classList.add('city-card');
        
        card.innerHTML = `
            <div class="card-img-box">
                <img src="${city.image}" alt="${city.name}">
            </div>
            <div class="card-info">
                <h2>${city.name}</h2>
                <p>📍 ${city.kunye.bolge}</p>
                <span class="btn-detail">İncele</span>
            </div>
        `;

        card.addEventListener('click', () => openModal(city));
        cityGrid.appendChild(card);
    });
}







function openModal(city) {
    const infoList = city.bilinmesiGerekenler.map(item => `<li>${item}</li>`).join('');
    modalBody.innerHTML = `
        <img src="${city.image}" class="modal-header-img">
        <div class="modal-inner">
            <h1>${city.name}</h1>
            <p><strong>Nüfus:</strong> ${city.kunye.nufus} | <strong>Plaka:</strong> ${city.kunye.plaka}</p>
            <hr style="margin:20px 0; opacity:0.1">
            <h3>🌟 Nesi meşhur?</h3>
            <p>${city.meshur}</p>
            <h3 style="margin-top:20px">📌 10 Cümleyle...</h3>
            <p>${infoList}</p>
        </div>
    `;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

closeBtn.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};





window.onclick = (e) => { if(e.target == modal) closeBtn.onclick(); };

// Başlat
init();