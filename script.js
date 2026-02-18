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

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('[data-reveal]');

const scrollReveal = () => {
    for (let i = 0; i < revealElements.length; i++) {
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < window.innerHeight - revealPoint) {
            revealElements[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', scrollReveal);

// Initial call to reveal elements already in view
document.addEventListener('DOMContentLoaded', () => {
    scrollReveal();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
