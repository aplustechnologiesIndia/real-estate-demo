// 1. Popup Control
window.onload = function() {
    // Show popup after 3 seconds
    setTimeout(() => {
        const popup = document.getElementById('leadPopup');
        popup.classList.add('active');
    }, 3000);
};

function closePopup() {
    document.getElementById('leadPopup').classList.remove('active');
}

// 2. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(8, 8, 8, 0.95)';
        nav.style.padding = '15px 5%';
    } else {
        nav.style.background = 'transparent';
        nav.style.padding = '20px 5%';
    }
});

// 3. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});