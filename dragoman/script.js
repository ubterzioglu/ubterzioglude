// script.js - Sipariş sistemi işlemleri
document.addEventListener('DOMContentLoaded', function() {
    // DOM elementleri
    const tableNumberInput = document.getElementById('tableNumber');
    const confirmTableBtn = document.getElementById('confirmTableBtn');
    const statusPill = document.getElementById('statusPill');
    const menuCard = document.getElementById('menuCard');
    const cartCard = document.getElementById('cartCard');
    const confirmationCard = document.getElementById('confirmationCard');
    const categoryTabs = document.getElementById('categoryTabs');
    const menuItems = document.getElementById('menuItems');
    const currentTableSpan = document.getElementById('currentTable');
    const cartItems = document.getElementById('cartItems');
    const totalItemsSpan = document.getElementById('totalItems');
    const totalPriceSpan = document.getElementById('totalPrice');
    const adminTotalSpan = document.getElementById('adminTotal');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const sendOrderBtn = document.getElementById('sendOrderBtn');
    const confirmedTableSpan = document.getElementById('confirmedTable');
    const orderIdSpan = document.getElementById('orderId');
    const newOrderBtn = document.getElementById('newOrderBtn');
    
    // Sepet verisi
    let cart = [];
    let currentTable = null;
    let selectedCategory = 'kahvalti';
    
    // Masa onaylama
    confirmTableBtn.addEventListener('click', confirmTable);
    tableNumberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') confirmTable();
    });
    
    function confirmTable() {
        const tableNum = parseInt(tableNumberInput.value);
        
        if (!tableNum || tableNum < 1 || tableNum > 30) {
            alert('Lütfen 1-30 arasında geçerli bir masa numarası giriniz.');
            return;
        }
        
        currentTable = tableNum;
        currentTableSpan.textContent = tableNum;
        statusPill.textContent = `Masa ${tableNum} seçildi`;
        
        // Kartları göster
        menuCard.hidden = false;
        cartCard.hidden = false;
        
        // Kategorileri yükle
        loadCategories();
        // Menüyü yükle
        loadMenuItems(selectedCategory);
    }
    
    // Kategorileri yükle
    function loadCategories() {
        categoryTabs.innerHTML = '';
        
        RESTAURANT_DATA.categories.forEach(category => {
            const tab = document.createElement('button');
            tab.className = `category-tab ${category.id === selectedCategory ? 'active' : ''}`;
            tab.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
            tab.dataset.category = category.id;
            
            tab.addEventListener('click', () => {
                selectedCategory = category.id;
                loadMenuItems(category.id);
                
                // Aktif tabı güncelle
                document.querySelectorAll('.category-tab').forEach(t => {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
            });
            
            categoryTabs.appendChild(tab);
        });
    }
    
    // Menü öğelerini yükle
    function loadMenuItems(categoryId) {
        menuItems.innerHTML = '';
        
        const items = RESTAURANT_DATA.menuItems.filter(item => item.category === categoryId);
        
        if (items.length === 0) {
            menuItems.innerHTML = `
                <div class="empty-menu">
                    <i class="fas fa-utensils"></i>
                    <p>Bu kategoride henüz ürün bulunmuyor.</p>
                </div>
            `;
            return;
        }
        
        items.forEach(item => {
            const menuItemEl = document.createElement('div');
            menuItemEl.className = 'menu-item';
            menuItemEl.innerHTML = `
                <div class="menu-item-img-container">
                    <img src="${item.image || '/img/placeholder.jpg'}" 
                         alt="${item.name}" 
                         class="menu-item-img"
                         onerror="this.src='/img/placeholder.jpg'">
                </div>
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-desc">${item.description}</p>
                <div class="menu-item-footer">
                    <div class="menu-item-price">${item.price.toFixed(2)} ₺</div>
                    <div class="menu-item-actions">
                        <div class="quantity-control" data-id="${item.id}">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <span class="qty-value" data-id="${item.id}">0</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="add-to-cart-btn" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i> Sepete Ekle
                        </button>
                    </div>
                </div>
            `;
            
            menuItems.appendChild(menuItemEl);
        });
        
        // Miktar butonlarına event listener ekle
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', handleQuantityChange);
        });
        
        // Sepete ekle butonlarına event listener ekle
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
    }
    
    // Miktar değiştirme
    function handleQuantityChange(e) {
        const itemId = parseInt(e.target.dataset.id);
        const isPlus = e.target.classList.contains('plus');
        const qtyValue = document.querySelector(`.qty-value[data-id="${itemId}"]`);
        let currentQty = parseInt(qtyValue.textContent) || 0;
        
        if (isPlus) {
            currentQty++;
        } else {
            if (currentQty > 0) currentQty--;
        }
        
        qtyValue.textContent = currentQty;
    }
    
    // Sepete ekle
    function addToCart(e) {
        const itemId = parseInt(e.target.dataset.id);
        const qtyValue = document.querySelector(`.qty-value[data-id="${itemId}"]`);
        const quantity = parseInt(qtyValue.textContent) || 1;
        
        if (quantity === 0) {
            alert('Lütfen miktar seçiniz.');
            return;
        }
        
        const menuItem = RESTAURANT_DATA.menuItems.find(item => item.id === itemId);
        
        // Sepette var mı kontrol et
        const existingItemIndex = cart.findIndex(item => item.id === itemId);
        
        if (existingItemIndex > -1) {
            // Var olanı güncelle
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Yeni ekle
            cart.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: quantity
            });
        }
        
        // Miktarı sıfırla
        qtyValue.textContent = '0';
        
        // Sepeti güncelle
        updateCart();
        
        // Feedback
        statusPill.textContent = `${quantity} adet ${menuItem.name} sepete eklendi`;
        statusPill.style.background = '#7CBB00';
        statusPill.style.color = 'white';
        
        setTimeout(() => {
            statusPill.style.background = '';
            statusPill.style.color = '';
        }, 2000);
    }
    
    // Sepeti güncelle
    function updateCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Sepetinizde ürün bulunmuyor</p>
                </div>
            `;
        } else {
            cart.forEach((item, index) => {
                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price.toFixed(2)} ₺ x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-qty">${item.quantity}</div>
                        <button class="remove-item-btn" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItems.appendChild(cartItemEl);
            });
            
            // Silme butonlarına event listener ekle
            document.querySelectorAll('.remove-item-btn').forEach(btn => {
                btn.addEventListener('click', removeFromCart);
            });
        }
        
        // Toplamları hesapla
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        totalItemsSpan.textContent = totalItems;
        totalPriceSpan.textContent = `${totalPrice.toFixed(2)} ₺`;
        adminTotalSpan.textContent = `${totalPrice.toFixed(2)} ₺`;
    }
    
    // Sepetten sil
    function removeFromCart(e) {
        const index = parseInt(e.target.closest('.remove-item-btn').dataset.index);
        cart.splice(index, 1);
        updateCart();
    }
    
    // Sepeti temizle
    clearCartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Sepetiniz zaten boş.');
            return;
        }
        
        if (confirm('Sepetinizi temizlemek istediğinize emin misiniz?')) {
            cart = [];
            updateCart();
            statusPill.textContent = 'Sepet temizlendi';
        }
    });
    
    // Sipariş gönder
    sendOrderBtn.addEventListener('click', sendOrder);
    
    function sendOrder() {
        if (!currentTable) {
            alert('Lütfen önce masa numarası seçin.');
            return;
        }
        
        if (cart.length === 0) {
            alert('Sepetiniz boş. Lütfen önce ürün ekleyin.');
            return;
        }
        
        // Sipariş ID oluştur
        const orderId = 'EDB-' + Date.now().toString().slice(-8);
        
        // Sipariş verisini hazırla
        const orderData = {
            orderId: orderId,
            table: currentTable,
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            timestamp: new Date().toLocaleString('tr-TR')
        };
        
        // Burada siparişi göndereceğiz
        // 1. Console'a yaz
        console.log('Sipariş Gönderildi:', orderData);
        
        // 2. E-posta gönderimi için (PHP backend ile)
        // sendOrderToServer(orderData);
        
        // Onay ekranını göster
        showConfirmation(orderData);
    }
    
    // Onay ekranını göster
    function showConfirmation(orderData) {
        confirmedTableSpan.textContent = orderData.table;
        orderIdSpan.textContent = orderData.orderId;
        
        // Kartları gizle/göster
        menuCard.hidden = true;
        cartCard.hidden = true;
        confirmationCard.hidden = false;
        
        // Sepeti temizle
        cart = [];
        updateCart();
        
        // Masa numarasını sıfırla
        currentTable = null;
        tableNumberInput.value = '';
        
        statusPill.textContent = `Sipariş gönderildi: ${orderData.orderId}`;
    }
    
    // Yeni sipariş
    newOrderBtn.addEventListener('click', () => {
        confirmationCard.hidden = true;
        menuCard.hidden = false;
        cartCard.hidden = false;
        statusPill.textContent = 'Yeni sipariş için masa numarası girin...';
    });
    
    // Sayfa yüklendiğinde başlangıç durumu
    updateCart();
});