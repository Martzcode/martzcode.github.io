// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const menuIcon = hamburger.querySelector('i');

// Theme Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
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
    navMenu.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
});

// Close menu when clicking links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuIcon.classList.replace('fa-times', 'fa-bars');
    });
});

// Intersection Observer for Section Focus & Internal Reveal
const scrollContainer = document.getElementById('scroll-container');

const observerOptions = {
    root: scrollContainer, // Observe relative to the snap container
    rootMargin: '0px',
    threshold: 0.5 // Trigger when section is mostly visible
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

// Smooth scroll for navigation links - Fixed for Scroll Snap Container
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            // In a snap container, we scroll the container itself
            scrollContainer.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });

            // On mobile, close menu
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        }
    });
});
