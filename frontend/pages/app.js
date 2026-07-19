// DORM DATA MODEL
const initialDorms = [
    {
        id: 1,
        name: "แสนสิริคอร์ท (Luxury Living Space)",
        price: 8500,
        rating: 4.9,
        reviewsCount: 120,
        image: "../assets/dorm_luxury.jpg",
        gender: "mixed", // หอรวม
        genderText: "หอพักรวม",
        distance: "250ม. จากประตูใหญ่หลัก",
        univKey: "main-gate",
        facilities: ["แอร์", "Wi-Fi", "ฟิตเนส", "สระว่ายน้ำ", "ระบบรักษาความปลอดภัย 24 ชม.", "ที่จอดรถ"],
        rooms: [
            { name: "Deluxe Studio (32 ตร.ม.)", price: 8500 },
            { name: "Executive Suite (45 ตร.ม.)", price: 12000 }
        ],
        phone: "081-234-5678",
        line: "@sansiri_court",
        reviews: [
            { author: "ณภัทร ม.", rating: 5, text: "หอพักสวยตรงปกมากครับ ฟิตเนสเครื่องเล่นค่อนข้างใหม่ ปลอดภัยและใกล้ของกินมาก" },
            { author: "ธนวิชญ์ ส.", rating: 5, text: "ระบบความปลอดภัยดีมาก รปภ. คอยสอดส่องตลอดเวลา คุ้มราคาครับ" }
        ]
    },
    {
        id: 2,
        name: "บ้านอบอุ่น (Scandi Cozy Nest)",
        price: 5500,
        rating: 4.7,
        reviewsCount: 85,
        image: "../assets/dorm_cozy.jpg",
        gender: "female", // หอหญิง
        genderText: "หอพักหญิงล้วน",
        distance: "600ม. จากประตูพหลโยธิน",
        univKey: "side-gate",
        facilities: ["แอร์", "Wi-Fi", "ระบบรักษาความปลอดภัย 24 ชม."],
        rooms: [
            { name: "Cozy Single Room (24 ตร.ม.)", price: 5500 },
            { name: "Twin Shared Bed (28 ตร.ม.)", price: 6800 }
        ],
        phone: "082-345-6789",
        line: "@baan_oboon",
        reviews: [
            { author: "พิมลดา ร.", rating: 4, text: "เงียบสงบเหมาะกับการอ่านหนังสือสอบมากค่ะ ป้าแม่บ้านใจดีเป็นกันเองสุดๆ" }
        ]
    },
    {
        id: 3,
        name: "มูจิเฮาส์ (Zen Minimalist Loft)",
        price: 6800,
        rating: 4.8,
        reviewsCount: 98,
        image: "../assets/dorm_minimal.jpg",
        gender: "male", // หอชาย
        genderText: "หอพักชายล้วน",
        distance: "450ม. จากประตูวิภาวดี",
        univKey: "vip-gate",
        facilities: ["แอร์", "Wi-Fi", "ระบบรักษาความปลอดภัย 24 ชม.", "ที่จอดรถ"],
        rooms: [
            { name: "Zen Standard (28 ตร.ม.)", price: 6800 },
            { name: "Premium Loft Style (35 ตร.ม.)", price: 8200 }
        ],
        phone: "083-456-7890",
        line: "@mujihouse",
        reviews: [
            { author: "ศรัณย์ ด.", rating: 5, text: "ดีไซน์หอพักเรียบง่ายและเป็นสัดส่วนดีมากครับ หาหอชายแนวนี้ยาก แนะนำเลยครับ" }
        ]
    }
];

// Load Dorms from LocalStorage if present, else initialize
if (!localStorage.getItem('dormhub_dorms')) {
    localStorage.setItem('dormhub_dorms', JSON.stringify(initialDorms));
}

let dorms = JSON.parse(localStorage.getItem('dormhub_dorms'));
let favorites = JSON.parse(localStorage.getItem('dormhub_favs') || '[]');
let compareList = [];

// THEME MANAGEMENT
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

// Check local storage theme or default to dark (since we love rich dark modes!)
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeUI(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
});

function updateThemeUI(theme) {
    if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

// SCROLL DETECT FOR HEADER
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// TAB SWITCHER
function switchTab(tabId) {
    // Update active states on buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-btn-${tabId}`).classList.add('active');

    // Update active states on contents
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');

    if (tabId === 'compare') {
        renderCompareView();
    } else if (tabId === 'map') {
        renderMapSidebar();
    }
}

// RENDER DORMITORY CARDS
function renderDormCards(filteredList) {
    const container = document.getElementById('dorms-container');
    const resultsCount = document.getElementById('results-count');
    
    resultsCount.textContent = `พบหอพักแนะนำ ${filteredList.length} แห่ง`;
    
    if (filteredList.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin: 0 auto 16px auto; opacity: 0.6;">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <p style="font-size: 16px; font-weight: 500;">ไม่พบข้อมูลหอพักที่ตรงกับเงื่อนไข</p>
                <p style="font-size: 13px; margin-top: 4px;">ลองเปลี่ยนหรือล้างตัวกรองเพื่อค้นหาใหม่</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredList.map(dorm => {
        const isFav = favorites.includes(dorm.id) ? 'active' : '';
        const isCompared = compareList.some(item => item.id === dorm.id) ? 'checked' : '';
        
        // Gender badge markup
        let genderBadge = '';
        if (dorm.gender === 'mixed') genderBadge = `<span class="badge badge-mixed">${dorm.genderText}</span>`;
        else if (dorm.gender === 'female') genderBadge = `<span class="badge badge-female">${dorm.genderText}</span>`;
        else if (dorm.gender === 'male') genderBadge = `<span class="badge badge-male">${dorm.genderText}</span>`;

        return `
            <div class="dorm-card">
                <div class="card-img-wrapper">
                    <img src="${dorm.image}" alt="${dorm.name}">
                    <div class="card-badges">
                        ${genderBadge}
                    </div>
                    <button class="fav-btn ${isFav}" onclick="toggleFavorite(event, ${dorm.id})" aria-label="Add to favorites">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                </div>
                <div class="card-body">
                    <div class="card-rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        ${dorm.rating.toFixed(1)} <span class="review-count">(${dorm.reviewsCount} รีวิว)</span>
                    </div>
                    <h3 class="card-title">${dorm.name}</h3>
                    <div class="card-info">
                        <div class="card-info-item">
                            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                            ${dorm.distance}
                        </div>
                        <div class="card-info-item">
                            <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                            มีสิ่งอำนวยความสะดวก ${dorm.facilities.length} รายการ
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="card-price">
                            <span class="price-num">฿${dorm.price.toLocaleString()}</span>
                            <span class="price-period">/ เดือน</span>
                        </div>
                        <div class="card-actions">
                            <button class="btn btn-outline" style="padding: 8px 12px; font-size: 13px;" onclick="toggleCompare(${dorm.id}, this)">
                                ${isCompared ? 'ยกเลิกเปรียบเทียบ' : '+ เปรียบเทียบ'}
                            </button>
                            <button class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;" onclick="openDetailsModal(${dorm.id})">รายละเอียด</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// FILTER LOGIC
function filterDorms() {
    const checkedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map(el => el.value);
    const minPrice = parseInt(document.getElementById('price-min').value) || 0;
    const maxPrice = parseInt(document.getElementById('price-max').value) || 15000;
    const checkedFacilities = Array.from(document.querySelectorAll('input[name="facility"]:checked')).map(el => el.value);
    
    const quickName = document.getElementById('quick-search-name').value.toLowerCase().trim();
    const quickUniv = document.getElementById('quick-search-univ').value;
    const quickPriceRange = document.getElementById('quick-search-price').value;

    let filtered = dorms.filter(dorm => {
        // Gender match
        if (!checkedGenders.includes(dorm.gender)) return false;
        
        // Price match
        if (dorm.price < minPrice || dorm.price > maxPrice) return false;

        // Facilities match
        for (let reqFac of checkedFacilities) {
            if (!dorm.facilities.includes(reqFac)) return false;
        }

        // Quick name match
        if (quickName && !dorm.name.toLowerCase().includes(quickName)) return false;

        // Quick university gate match
        if (quickUniv && dorm.univKey !== quickUniv) return false;

        // Quick price range match
        if (quickPriceRange) {
            if (quickPriceRange === '0-6000' && dorm.price >= 6000) return false;
            if (quickPriceRange === '6000-8000' && (dorm.price < 6000 || dorm.price > 8000)) return false;
            if (quickPriceRange === '8000+' && dorm.price < 8000) return false;
        }

        return true;
    });

    // Sorting logic
    const sortBy = document.getElementById('sort-select').value;
    if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderDormCards(filtered);
}

// TRIGGER HERO SEARCH
function triggerSearch() {
    filterDorms();
    // Scroll to main app listings smoothly
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
}

// RESET FILTERS
function resetFilters() {
    document.querySelectorAll('input[name="gender"]').forEach(el => el.checked = true);
    document.querySelectorAll('input[name="facility"]').forEach(el => el.checked = false);
    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 15000;
    document.getElementById('quick-search-name').value = '';
    document.getElementById('quick-search-univ').value = '';
    document.getElementById('quick-search-price').value = '';
    filterDorms();
}

// TOGGLE FAVORITE
function toggleFavorite(event, dormId) {
    event.stopPropagation();
    const btn = event.currentTarget;
    if (favorites.includes(dormId)) {
        favorites = favorites.filter(id => id !== dormId);
        btn.classList.remove('active');
    } else {
        favorites.push(dormId);
        btn.classList.add('active');
    }
    localStorage.setItem('dormhub_favs', JSON.stringify(favorites));
}

// TOGGLE COMPARE LIST
function toggleCompare(dormId, btn) {
    const foundIndex = compareList.findIndex(item => item.id === dormId);
    
    if (foundIndex > -1) {
        compareList.splice(foundIndex, 1);
        if (btn) btn.textContent = '+ เปรียบเทียบ';
    } else {
        if (compareList.length >= 3) {
            alert('สามารถเปรียบเทียบหอพักได้สูงสุด 3 แห่งพร้อมกัน');
            return;
        }
        const dormObj = dorms.find(d => d.id === dormId);
        compareList.push(dormObj);
        if (btn) btn.textContent = 'ยกเลิกเปรียบเทียบ';
    }
    
    document.getElementById('compare-badge').textContent = compareList.length;
    
    // Re-render components if needed
    if (document.getElementById('tab-compare').classList.contains('active')) {
        renderCompareView();
    }
}

// RENDER COMPARE TAB VIEW
function renderCompareView() {
    const container = document.getElementById('compare-view-content');
    
    if (compareList.length === 0) {
        container.innerHTML = `
            <div style="padding: 60px; text-align: center; color: var(--text-muted);">
                <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin: 0 auto 16px auto; opacity: 0.6;">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <p style="font-size: 16px; font-weight: 500;">ยังไม่มีหอพักที่ถูกเลือกมาเปรียบเทียบ</p>
                <p style="font-size: 13px; margin-top: 4px;">กรุณากด "+ เปรียบเทียบ" ในหน้ารายการหอพักเพื่อเลือก (สูงสุด 3 หอพัก)</p>
            </div>
        `;
        return;
    }

    let headHtml = `<tr><th>คุณลักษณะ</th>`;
    let imgRow = `<tr><td>รูปภาพ</td>`;
    let priceRow = `<tr><td>ค่าเช่า/เดือน</td>`;
    let typeRow = `<tr><td>ประเภทหอ</td>`;
    let distanceRow = `<tr><td>ความห่างไกล</td>`;
    let ratingRow = `<tr><td>คะแนนเฉลี่ย</td>`;
    let facilitiesRow = `<tr><td>สิ่งอำนวยความสะดวก</td>`;
    let actionRow = `<tr><td>การทำรายการ</td>`;

    compareList.forEach(dorm => {
        headHtml += `
            <th>
                <div class="compare-dorm-header">
                    <span>${dorm.name}</span>
                    <button class="remove-compare-btn" onclick="toggleCompare(${dorm.id}); renderCompareView(); filterDorms();">ลบออก</button>
                </div>
            </th>
        `;
        imgRow += `<td><img class="compare-dorm-img" src="${dorm.image}" alt="${dorm.name}"></td>`;
        priceRow += `<td style="font-weight: 700; color: var(--accent-primary);">฿${dorm.price.toLocaleString()}</td>`;
        typeRow += `<td>${dorm.genderText}</td>`;
        distanceRow += `<td>${dorm.distance}</td>`;
        ratingRow += `<td>⭐ ${dorm.rating.toFixed(1)} (${dorm.reviewsCount} รีวิว)</td>`;
        
        // Show facilities as bullet tags
        const facsHtml = dorm.facilities.map(fac => `<span class="badge" style="background-color: var(--bg-tertiary); margin: 2px;">${fac}</span>`).join(' ');
        facilitiesRow += `<td>${facsHtml}</td>`;
        
        actionRow += `<td><button class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;" onclick="openDetailsModal(${dorm.id})">ดูรายละเอียด</button></td>`;
    });

    headHtml += `</tr>`;
    imgRow += `</tr>`;
    priceRow += `</tr>`;
    typeRow += `</tr>`;
    distanceRow += `</tr>`;
    ratingRow += `</tr>`;
    facilitiesRow += `</tr>`;
    actionRow += `</tr>`;

    container.innerHTML = `
        <table class="compare-table">
            <thead>${headHtml}</thead>
            <tbody>
                ${imgRow}
                ${priceRow}
                ${typeRow}
                ${distanceRow}
                ${ratingRow}
                ${facilitiesRow}
                ${actionRow}
            </tbody>
        </table>
    `;
}

// SIMULATED MAP INTERACTION
function selectDormFromMap(dormId) {
    // Highlight pin
    document.querySelectorAll('.map-pin').forEach(pin => pin.classList.remove('active'));
    document.getElementById(`pin-${dormId}`).classList.add('active');

    // Highlight sidebar card
    document.querySelectorAll('.map-info-card').forEach(card => card.classList.remove('active'));
    const sideCard = document.getElementById(`map-sidebar-card-${dormId}`);
    if (sideCard) {
        sideCard.classList.add('active');
        sideCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function renderMapSidebar() {
    const container = document.getElementById('map-sidebar-content');
    
    container.innerHTML = dorms.map(dorm => {
        return `
            <div class="map-info-card" id="map-sidebar-card-${dorm.id}" onclick="selectDormFromMap(${dorm.id})">
                <h4 style="font-weight: 600; margin-bottom: 6px; font-size: 15px;">${dorm.name}</h4>
                <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">📍 ${dorm.distance}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 700; color: var(--accent-primary); font-size: 15px;">฿${dorm.price.toLocaleString()}</span>
                    <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="openDetailsModal(${dorm.id})">ดูรายละเอียด</button>
                </div>
            </div>
        `;
    }).join('');
}

// DETAIL MODAL LOGIC
function openDetailsModal(dormId) {
    const dorm = dorms.find(d => d.id === dormId);
    if (!dorm) return;

    const modal = document.getElementById('details-modal');
    const content = document.getElementById('modal-detail-content');

    // Render Amenities checkboxes/icons
    const amenitiesHtml = dorm.facilities.map(fac => `
        <div class="amenity-item">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>${fac}</span>
        </div>
    `).join('');

    // Render reviews list
    const reviewsHtml = dorm.reviews.map(rev => `
        <div class="review-card">
            <div class="review-header">
                <span class="review-author">${rev.author}</span>
                <span class="review-rating">${'★'.repeat(rev.rating)}${'☆'.repeat(5-rev.rating)}</span>
            </div>
            <p class="review-text">${rev.text}</p>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="dorm-detail-hero">
            <img src="${dorm.image}" alt="${dorm.name}">
            <div class="dorm-detail-gradient">
                <div class="dorm-detail-title-block">
                    <span class="badge" style="background-color: var(--accent-primary); color: #fff; margin-bottom: 8px;">${dorm.genderText}</span>
                    <h2 style="font-size: 24px; font-weight: 700;">${dorm.name}</h2>
                    <p style="font-size: 14px; opacity: 0.9;">📍 ${dorm.distance}</p>
                </div>
            </div>
        </div>
        <div class="dorm-detail-body">
            <div>
                <h3 style="font-weight: 600; margin-bottom: 12px; border-bottom: 2px solid var(--border-color); padding-bottom: 8px;">ข้อมูลทั่วไปและสิ่งอำนวยความสะดวก</h3>
                <p style="line-height: 1.6; color: var(--text-secondary); margin-bottom: 20px;">
                    ยินดีต้อนรับสู่ ${dorm.name} หอพักที่ออกแบบมาเพื่อนักศึกษาโดยเฉพาะ เพียบพร้อมไปด้วยสิ่งอำนวยความสะดวกระดับพรีเมียม ปลอดภัยด้วยระบบตรวจจับและกล้องวงจรปิด เดินทางไปมหาวิทยาลัยได้อย่างรวดเร็วและปลอดภัย มีร้านสะดวกซื้อ ร้านอาหาร คาเฟ่อยู่รายล้อม
                </p>
                
                <h4 style="font-weight: 600; margin-bottom: 12px;">สิ่งอำนวยความสะดวกหลัก</h4>
                <div class="detail-amenities-grid">
                    ${amenitiesHtml}
                </div>

                <!-- REVIEWS SECTION -->
                <div class="reviews-section">
                    <h3 style="font-weight: 600; margin-bottom: 16px;">รีวิวจากผู้เข้าพัก (${dorm.reviews.length})</h3>
                    <div id="reviews-list-${dorm.id}">
                        ${reviewsHtml}
                    </div>
                    
                    <!-- Interactive review composer -->
                    <div class="add-review-form">
                        <h4 style="font-weight: 600; margin-bottom: 12px;">เขียนรีวิวของคุณ</h4>
                        <div class="rating-select" id="rating-stars">
                            <span class="star-option" onclick="setRatingStar(1)">★</span>
                            <span class="star-option" onclick="setRatingStar(2)">★</span>
                            <span class="star-option" onclick="setRatingStar(3)">★</span>
                            <span class="star-option" onclick="setRatingStar(4)">★</span>
                            <span class="star-option" onclick="setRatingStar(5)">★</span>
                        </div>
                        <input type="hidden" id="selected-rating-val" value="5">
                        <textarea id="review-input-text" placeholder="แชร์ประสบการณ์การเข้าพักที่หอนี้..."></textarea>
                        <button class="btn btn-primary" onclick="submitReview(${dorm.id})">ส่งรีวิว</button>
                    </div>
                </div>
            </div>
            
            <div>
                <!-- Contact Sidebar Panel instead of booking -->
                <div class="contact-sidebar-card">
                    <h3 style="font-weight: 700; margin-bottom: 12px; border-bottom: 2px solid var(--border-color); padding-bottom: 8px;">ข้อมูลติดต่อหอพัก</h3>
                    <div style="font-size: 26px; font-weight: 700; color: var(--accent-primary); margin-bottom: 16px;">
                        ฿${dorm.price.toLocaleString()} <span style="font-size: 13px; font-weight: 400; color: var(--text-secondary);">/ เดือน</span>
                    </div>
                    <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
                        สนใจติดต่อสอบถามห้องว่าง นัดดูห้องพัก หรือข้อมูลเพิ่มเติม ได้โดยตรงผ่านช่องทางเหล่านี้:
                    </p>
                    <ul class="contact-info-list" style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
                        <li style="display: flex; align-items: center; gap: 8px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-primary)"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                            <span><strong>โทร:</strong> ${dorm.phone}</span>
                        </li>
                        <li style="display: flex; align-items: center; gap: 8px;">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-primary)"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                            <span><strong>Line:</strong> ${dorm.line}</span>
                        </li>
                    </ul>
                    <p style="font-size: 11px; text-align: center; color: var(--text-muted); margin-top: 20px;">
                        *แจ้งผู้ดูแลหอพักว่าพบข้อมูลจาก DormHub เพื่อความรวดเร็วในการติดต่อ
                    </p>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    // Default to 5 stars selected
    setRatingStar(5);
}

// STAR SELECTION VISUALS
function setRatingStar(starsCount) {
    document.getElementById('selected-rating-val').value = starsCount;
    const stars = document.querySelectorAll('#rating-stars .star-option');
    
    stars.forEach((star, index) => {
        if (index < starsCount) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// SUBMIT REVIEW
function submitReview(dormId) {
    const textVal = document.getElementById('review-input-text').value.trim();
    const ratingVal = parseInt(document.getElementById('selected-rating-val').value);

    if (!textVal) {
        alert('กรุณากรอกข้อความรีวิว');
        return;
    }

    const targetDorm = dorms.find(d => d.id === dormId);
    if (!targetDorm) return;

    // Mock user name
    const reviewObj = {
        author: "นักศึกษา นิรนาม",
        rating: ratingVal,
        text: textVal
    };

    targetDorm.reviews.push(reviewObj);
    // Recalculate rating average
    const totalRating = targetDorm.reviews.reduce((sum, r) => sum + r.rating, 0);
    targetDorm.rating = totalRating / targetDorm.reviews.length;
    targetDorm.reviewsCount = targetDorm.reviews.length;

    // Save back to LocalStorage
    localStorage.setItem('dormhub_dorms', JSON.stringify(dorms));

    // Re-render cards & details
    filterDorms();
    openDetailsModal(dormId);
    
    alert('บันทึกรีวิวของคุณแล้ว ขอบคุณสำหรับการรีวิว!');
}

// CLOSE MODALS
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// INITIAL LOAD
filterDorms();
