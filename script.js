// بيانات المنتجات لتسهيل التعديل
const products = [
    { id: 1, name: "جلابية الليل الفاخرة", price: 460, img: "model3_M.jpg", category: "جلابية رجالي" },
    { id: 2, name: "جلابية السلطان المطرزة", price: 250, img: "model1_M.jpg", category: "جلابية رجالي" },
    { id: 3, name: "جلابية الفارس الكلاسيكية", price: 320, img: "model2_M.jpg", category: "جلابية رجالي" },
    { id: 2, name: "خمار نسائي", price: 150, img: "model1_F.jpg", category: "عباءات نسائية" }
];

let cart = [];

// عرض المنتجات عند تحميل الصفحة
function init() {
    const grid = document.getElementById('products-grid');
    if (grid) {
        grid.innerHTML = products.map(p => `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}" class="product-img">
                <div class="product-info">
                    <h4>${p.name}</h4>
                    <p class="product-price">${p.price} جنيه</p>
                    <button class="btn-gold" onclick="addToCart(${p.id})" style="margin-top:10px; padding:8px 20px">إضافة للسلة</button>
                </div>
            </div>
        `).join('');
    }
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    if (item) {
        cart.push({...item});
        updateUI();
        // إضافة تأثير بصري جميل
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "✓ تمت الإضافة";
        btn.style.opacity = "0.7";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.opacity = "1";
        }, 1500);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateUI();
}

function updateUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
    
    const cartList = document.getElementById('cart-items');
    if (cartList) {
        cartList.innerHTML = cart.length === 0 
            ? '<p style="text-align: center; color: #999; padding: 20px 0;">السلة فارغة</p>'
            : cart.map((item, idx) => `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px">
                    <div style="flex:1">
                        <div style="color: var(--primary-dark); font-weight:600">${item.name}</div>
                        <button onclick="removeFromCart(${idx})" style="background:none; border:none; color:red; cursor:pointer; font-size:0.85rem">حذف</button>
                    </div>
                    <span style="font-weight:bold; color: var(--accent-gold)">${item.price} جنيه</span>
                </div>
            `).join('');
    }
    
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const totalElement = document.getElementById('cart-total');
    if (totalElement) {
        totalElement.innerText = total;
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function filterProducts(category) {
    const filtered = category === 'الكل' ? products : products.filter(p => p.category === category);
    const grid = document.getElementById('products-grid');
    if (grid) {
        grid.innerHTML = filtered.map(p => `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}" class="product-img">
                <div class="product-info">
                    <h4>${p.name}</h4>
                    <p class="product-price">${p.price} جنيه</p>
                    <button class="btn-gold" onclick="addToCart(${p.id})" style="margin-top:10px; padding:8px 20px">إضافة للسلة</button>
                </div>
            </div>
        `).join('');
    }
    
    // تحديث حالة الأزرار
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.trim() === category) {
            btn.classList.add('active');
        }
    });
}

function checkoutWhatsApp() {
    if(cart.length === 0) {
        alert("السلة فارغة");
        return;
    }
    
    let msg = "📦 *طلب جديد من متجر الرضوان:*\n\n";
    cart.forEach((item, i) => msg += `${i+1}. ${item.name}\n   السعر: ${item.price} جنيه\n\n`);
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    msg += `━━━━━━━━━━━━━━━━━\n*الإجمالي: ${total} جنيه *`;
    
    const phone = "201202025972"; // ضع رقمك هنا (بدون +)
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}

function directWhatsApp() {
    const msg = "السلام عليكم ورحمة الله وبركاته،\nأريد الاستفسار عن منتجاتكم";
    const phone = "201202025972"; // ضع رقمك هنا (بدون +)
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}

// تحديث واجهة المستخدم عند تحميل الصفحة
window.addEventListener('load', () => {
    init();
    updateUI();
});

// إغلاق السلة عند النقر خارجها
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('cart-sidebar');
    const cartBtn = document.querySelector('.cart-btn');
    if (sidebar && sidebar.classList.contains('active') && !sidebar.contains(event.target) && !cartBtn.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});
