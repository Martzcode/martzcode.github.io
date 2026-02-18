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
