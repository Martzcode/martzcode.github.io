// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const menuIcon = hamburger.querySelector('i');

// Theme Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    body.classList.add('dark'); // Added for Tailwind Support
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('dark'); // Added for Tailwind Support
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Hamburger Menu Logic
hamburger.addEventListener('click', () => {
    const isActive = mobileNav.classList.contains('opacity-100');
    if (isActive) {
        mobileNav.classList.replace('opacity-100', 'opacity-0');
        mobileNav.classList.add('pointer-events-none');
        menuIcon.classList.replace('fa-times', 'fa-bars');
    } else {
        mobileNav.classList.replace('opacity-0', 'opacity-100');
        mobileNav.classList.remove('pointer-events-none');
        menuIcon.classList.replace('fa-bars', 'fa-times');
    }
});

// Close menu when clicking links
document.querySelectorAll('#mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.replace('opacity-100', 'opacity-0');
        mobileNav.classList.add('pointer-events-none');
        menuIcon.classList.replace('fa-times', 'fa-bars');
    });
});

// Intersection Observer for Section Focus & Internal Reveal
const scrollContainer = document.getElementById('scroll-container');

const observerOptions = {
    root: scrollContainer,
    rootMargin: '0px',
    threshold: 0.5
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Activate Focus
            entry.target.classList.add('active-focus');
            // Trigger internal reveals
            const reveals = entry.target.querySelectorAll('[data-reveal]');
            reveals.forEach(el => el.classList.add('active'));
        } else {
            // Deactivate Focus
            entry.target.classList.remove('active-focus');
        }
    });
}, observerOptions);

// Initial observations
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            scrollContainer.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
// Experience Carousel Navigation Logic
const expCarousel = document.getElementById('exp-carousel');
const expDots = document.querySelectorAll('#exp-pagination div');
const expPrev = document.getElementById('exp-prev');
const expNext = document.getElementById('exp-next');

if (expCarousel && expDots.length > 0) {
    // Current Index Tracking
    let currentIndex = 0;

    // Carousel Scroll Handler for Buttons
    const scrollCarousel = (index) => {
        const cardWidth = expCarousel.offsetWidth;
        expCarousel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
    };

    if (expPrev) {
        expPrev.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                scrollCarousel(currentIndex);
            }
        });
    }

    if (expNext) {
        expNext.addEventListener('click', () => {
            if (currentIndex < expCarousel.children.length - 1) {
                currentIndex++;
                scrollCarousel(currentIndex);
            }
        });
    }

    // Observer to update dots and current index on scroll
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentIndex = Array.from(expCarousel.children).indexOf(entry.target);

                // Update dots
                expDots.forEach((dot, i) => {
                    if (i === currentIndex) {
                        dot.classList.add('bg-primary');
                        dot.classList.remove('bg-transparent');
                    } else {
                        dot.classList.remove('bg-primary');
                        dot.classList.add('bg-transparent');
                    }
                    dot.classList.add('border-primary');
                });

                // Update button states
                if (expPrev) expPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
                if (expNext) expNext.style.opacity = currentIndex === expCarousel.children.length - 1 ? '0.3' : '1';
            }
        });
    }, {
        root: expCarousel,
        threshold: 0.5
    });

    Array.from(expCarousel.children).forEach(card => {
        carouselObserver.observe(card);
    });

    // Fix for Mouse Wheel: allow horizontal wheel to scroll the carousel
    expCarousel.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.stopPropagation(); // Prevent One Page Scroll from moving vertically
        }
    }, { passive: false });
}


