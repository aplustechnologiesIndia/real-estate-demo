// 1. Optimized Popup Control (shows only once per session)
window.onload = function() {
    // Check if the user has already seen the popup in this session
    if (!sessionStorage.getItem('popupShown')) {
        setTimeout(() => {
            const popup = document.getElementById('leadPopup');
            if (popup) {
                popup.classList.add('active');
                sessionStorage.setItem('popupShown', 'true');
            }
        }, 3000);
    }
};

// Handle Form Submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Hide form, show success message
    const formContainer = document.getElementById('formContainer');
    const successMessage = document.getElementById('successMessage');
    
    if (formContainer && successMessage) {
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';
    }
    
    // Auto-close popup after 2.5 seconds
    setTimeout(() => {
        closePopup();
    }, 2500);
}

// Ensure closePopup works correctly
function closePopup() {
    const popup = document.getElementById('leadPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// 2. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(8, 8, 8, 0.95)';
            nav.style.padding = '15px 5%';
        } else {
            nav.style.background = 'transparent';
            nav.style.padding = '20px 5%';
        }
    }
});

// 3. Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// 4. Unified Smooth Scroll with Navbar Offset (80px)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Close mobile menu if open
            const navLinks = document.getElementById('navLinks');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            // Scroll with offset for fixed navbar
            const headerOffset = 80; // matches CSS scroll-margin-top
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});