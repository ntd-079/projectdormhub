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

    // Mock functionality for Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Just for demonstration
            console.log(e.target.innerText + ' clicked!');
        });
    });
    
    // As per the file reference "Academic Hearth - Home (Dark with Theme Toggle).jpg"
    // The theme is built natively in Dark Mode via CSS variables.
    // If a light mode toggle is needed in the future, you would toggle a class on the body here.
    /*
    const toggleTheme = () => {
        document.body.classList.toggle('light-theme');
    };
    */
});