document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            navbar.style.borderBottom = '1px solid #333';
            navbar.style.transition = 'background-color 0.3s ease';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.borderBottom = 'none';
        }
    });

    // Mock functionality for non-submit Buttons
    const buttons = document.querySelectorAll('.btn:not(.search-btn)');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target.innerText + ' clicked!');
        });
    });

    // Filter functionality
    const searchBtn = document.querySelector('.search-btn');
    const typeSelect = document.getElementById('filter-dorm-type');
    const priceSelect = document.getElementById('filter-price');
    const roomTypeSelect = document.getElementById('filter-room-type');
    const cards = document.querySelectorAll('.dorm-card');

    function runFilters() {
        const selectedType = typeSelect.value;
        const selectedPrice = priceSelect.value;
        const selectedRoomType = roomTypeSelect.value;

        cards.forEach(card => {
            const gender = card.getAttribute('data-gender');
            const price = parseFloat(card.getAttribute('data-price'));
            const roomType = card.getAttribute('data-room-type');

            let matchesType = !selectedType || gender === selectedType;
            
            let matchesPrice = true;
            if (selectedPrice) {
                if (selectedPrice === '0-8000' && price >= 8000) matchesPrice = false;
                else if (selectedPrice === '8000-9000' && (price < 8000 || price > 9000)) matchesPrice = false;
                else if (selectedPrice === '9000+' && price < 9000) matchesPrice = false;
            }

            let matchesRoomType = !selectedRoomType || roomType === selectedRoomType;

            if (matchesType && matchesPrice && matchesRoomType) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchBtn && typeSelect && priceSelect && roomTypeSelect) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            runFilters();
        });
    }

    // Header Search functionality
    const headerSearchInput = document.querySelector('.search-bar input');
    if (headerSearchInput) {
        headerSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            cards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const matchesSearch = !query || title.includes(query);
                if (matchesSearch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});