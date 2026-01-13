// Property Data for Modals
const propertyData = {
    'sky-atrium': {
        title: "The Sky Atrium",
        desc: "A sprawling 5500 sqft residence featuring floor-to-ceiling windows, a temperature-controlled lap pool, and 360-degree views of the Mumbai skyline.",
        img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    },
    'emerald-manor': {
        title: "The Emerald Manor",
        desc: "A modernist sanctuary on Golf Course Road, Gurgaon, featuring full home automation, panoramic green views, and minimalist luxury finishes.",
        img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
    },
    'casa-del-mar': {
        title: "Casa Del Mar",
        desc: "A Mediterranean-inspired villa in Assagao, Goa, with an infinity pool, sustainable garden, and handcrafted interiors blending coastal charm with contemporary elegance.",
        img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811"
    },
    'imperial-estate': {
        title: "The Imperial Estate",
        desc: "A heritage colonial bungalow in Lutyens’ Delhi, set on over 7200 sqft with manicured lawns, a private library, and 24/7 high-security infrastructure.",
        img: "https://images.unsplash.com/photo-1512915922611-e211c3f350c1"
    }
    // Add more properties as needed
};

// Open Property Detail Modal
function openPropertyModal(id) {
    const data = propertyData[id];
    if (data) {
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalDesc').innerText = data.desc;
        document.getElementById('modalGallery').style.backgroundImage = `url('${data.img}')`;
        document.getElementById('propertyModal').classList.add('active');
    }
}

// Close Property Detail Modal
function closePropertyModal() {
    document.getElementById('propertyModal').classList.remove('active');
}

// Trigger Demo Popup Manually (e.g., from Hero button)
function triggerDemoPopup() {
    const popup = document.getElementById('leadPopup');
    if (popup) {
        popup.classList.add('active');
    }
}

// Handle Form Submission
function handleFormSubmit(event) {
    event.preventDefault();

    // Demo IDs - replace with your actual EmailJS IDs
    const serviceID = 'default_service';
    const templateID = 'template_abc';

    emailjs.sendForm(serviceID, templateID, event.target)
        .then(() => {
            document.getElementById('formContainer').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            setTimeout(() => { closePopup(); }, 2500);
        }, (err) => {
            console.error("EmailJS Error:", err);
            alert("Submission failed. Check console for details.");
        });
}

// Ensure closePopup works correctly
function closePopup() {
    const popup = document.getElementById('leadPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    const btt = document.getElementById('backToTop');
    
    // Navbar background
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(8, 8, 8, 0.95)';
            nav.style.padding = '15px 5%';
        } else {
            nav.style.background = 'transparent';
            nav.style.padding = '20px 5%';
        }
    }

    // Back-to-top button visibility
    if (btt) {
        if (window.scrollY > 500) {
            btt.style.display = 'block';
        } else {
            btt.style.display = 'none';
        }
    }
});

// Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Unified Smooth Scroll with Navbar Offset (80px)
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
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ======================
// NEW: Investment Calculator
// ======================
function calculateInvestment() {
    const amountInput = document.getElementById('propAmount');
    const downInput = document.getElementById('downPayment');
    const resultDiv = document.getElementById('calcResult');
    
    const amount = parseFloat(amountInput.value);
    const downPercent = parseFloat(downInput.value);

    if (isNaN(amount) || isNaN(downPercent) || amount <= 0 || downPercent < 0 || downPercent > 100) {
        alert("Please enter valid Property Value (>0) and Down Payment (0–100%).");
        return;
    }

    const loan = amount * (1 - (downPercent / 100));
    document.getElementById('loanAmt').innerText = loan.toFixed(2);
    resultDiv.style.display = 'block';
}

// ======================
// NEW: Animated Stats Counter
// ======================
const stats = document.querySelectorAll('.stat-item h4');
if (stats.length > 0) {
    const observerOptions = { threshold: 0.5 }; // Trigger when 50% visible

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // Extract numeric value from original text like "₹5000Cr+"
                const originalText = target.dataset.original || target.innerText;
                let numberPart = originalText.replace(/[^0-9]/g, '');
                const countTo = parseInt(numberPart, 10) || 0;
                let current = 0;
                const increment = countTo / 60; // Smoother animation

                // Determine suffix based on original
                const hasCr = originalText.includes('Cr');
                const suffix = hasCr ? 'Cr+' : '+';

                const updateCount = () => {
                    if (current < countTo) {
                        current += increment;
                        target.innerText = "₹" + Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = originalText; // Restore exact original
                    }
                };

                updateCount();
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Store original text and start observing
    stats.forEach(stat => {
        if (!stat.dataset.original) {
            stat.dataset.original = stat.innerText;
        }
        statsObserver.observe(stat);
    });
}

// ======================
// NEW: Preloader Logic
// ======================
window.addEventListener('load', () => {
    const loaderBar = document.getElementById('loaderBar');
    const preloader = document.getElementById('preloader');
    
    if (loaderBar) {
        loaderBar.style.width = '100%';
    }

    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            // Optional: remove from DOM after transition
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 800);
        }
    }, 1000);
});