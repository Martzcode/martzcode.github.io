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
