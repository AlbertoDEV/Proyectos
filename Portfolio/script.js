// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');

            // Animate hamburger icon to X
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mainNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 576) {
                    mainNav.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                }
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .cta-buttons a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos del formulario.');
                return;
            }

            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente.`);

            // Reset the form
            contactForm.reset();
        });
    }

    // Add animation classes to elements
    function setupAnimations() {
        // About section animations
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.querySelector('h2').classList.add('animate', 'fade-in');

            const aboutParagraphs = aboutSection.querySelectorAll('p');
            aboutParagraphs.forEach((p, index) => {
                p.classList.add('animate', 'slide-up');
                p.classList.add(`delay-${index + 1}`);
            });
        }

        // Skills section animations
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.querySelector('h2').classList.add('animate', 'fade-in');

            const skillCategories = skillsSection.querySelectorAll('.skill-category');
            skillCategories.forEach((category, index) => {
                category.classList.add('animate', 'scale-in');
                category.classList.add(`delay-${index + 1}`);

                const skillItems = category.querySelectorAll('li');
                skillItems.forEach((item, itemIndex) => {
                    item.classList.add('animate', 'slide-right');
                    item.classList.add(`delay-${itemIndex + 3}`);
                });
            });
        }

        // Projects section animations
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.querySelector('h2').classList.add('animate', 'fade-in');

            const projectCards = projectsSection.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                card.classList.add('animate', 'slide-up');
                card.classList.add(`delay-${index + 1}`);

                // Animate project card contents
                if (card.querySelector('h3')) {
                    card.querySelector('h3').classList.add('animate', 'slide-left', `delay-${index + 2}`);
                }
                if (card.querySelector('p')) {
                    card.querySelector('p').classList.add('animate', 'fade-in', `delay-${index + 3}`);
                }
                if (card.querySelector('.project-links')) {
                    card.querySelector('.project-links').classList.add('animate', 'slide-up', `delay-${index + 4}`);
                }
            });
        }

        // Contact section animations
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.querySelector('h2').classList.add('animate', 'fade-in');

            const contactInfo = contactSection.querySelector('.contact-info');
            if (contactInfo) {
                contactInfo.classList.add('animate', 'slide-left', 'delay-1');

                const contactInfoItems = contactInfo.querySelectorAll('li');
                contactInfoItems.forEach((item, index) => {
                    item.classList.add('animate', 'slide-left', `delay-${index + 3}`);
                });
            }

            const contactForm = contactSection.querySelector('.contact-form');
            if (contactForm) {
                contactForm.classList.add('animate', 'slide-right', 'delay-2');

                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach((group, index) => {
                    group.classList.add('animate', 'slide-up', `delay-${index + 3}`);
                });

                const submitBtn = contactForm.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.classList.add('animate', 'scale-in', 'delay-5');
                }
            }
        }
    }

    // Initialize IntersectionObserver to trigger animations when elements come into view
    function initIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.animate');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
            observer.observe(element);
        });
    }

    // Setup animations and initialize observer
    setupAnimations();
    initIntersectionObserver();

    // Add hover effect to project cards (for additional interactivity)
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(52, 168, 83, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.8)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(52, 168, 83, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.5)';
        });
    });
});
