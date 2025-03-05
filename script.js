// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeToggleIcon = themeToggleBtn.querySelector('i');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links a');
const slider = document.getElementById('projectSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const contactForm = document.getElementById('contactForm');

// Theme Toggle Functionality
function initTheme() {
    // Check if user previously selected dark mode
    const darkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply the saved theme or default to light
    if (darkMode) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
        themeToggleBtn.setAttribute('aria-pressed', 'true');
    } else {
        themeToggleBtn.setAttribute('aria-pressed', 'false');
    }
}

function toggleTheme() {
    if (document.body.getAttribute('data-theme') === 'dark') {
        // Switch to light mode
        document.body.removeAttribute('data-theme');
        themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'false');
        themeToggleBtn.setAttribute('aria-pressed', 'false');
    } else {
        // Switch to dark mode
        document.body.setAttribute('data-theme', 'dark');
        themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'true');
        themeToggleBtn.setAttribute('aria-pressed', 'true');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking a nav item
function setupNavItemsClick() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Project Slider Functionality
let currentSlide = 0;
const slides = slider.querySelectorAll('.slide');
const totalSlides = slides.length;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Form Validation and Enhancement
function validateForm(e) {
    e.preventDefault();
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Name validation
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        document.getElementById('nameError').textContent = 'Por favor, ingresa tu nombre';
        name.setAttribute('aria-invalid', 'true');
        name.focus();
        isValid = false;
    } else {
        name.setAttribute('aria-invalid', 'false');
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Por favor, ingresa un email válido';
        email.setAttribute('aria-invalid', 'true');
        if (isValid) email.focus();
        isValid = false;
    } else {
        email.setAttribute('aria-invalid', 'false');
    }
    
    // Subject validation
    const subject = document.getElementById('subject');
    if (subject.value.trim() === '') {
        document.getElementById('subjectError').textContent = 'Por favor, ingresa un asunto';
        subject.setAttribute('aria-invalid', 'true');
        if (isValid) subject.focus();
        isValid = false;
    } else {
        subject.setAttribute('aria-invalid', 'false');
    }
    
    // Message validation
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
        document.getElementById('messageError').textContent = 'Por favor, ingresa un mensaje';
        message.setAttribute('aria-invalid', 'true');
        if (isValid) message.focus();
        isValid = false;
    } else {
        message.setAttribute('aria-invalid', 'false');
    }
    
    // If form is valid, show success message
    if (isValid) {
        const formSuccess = document.getElementById('formSuccess');
        formSuccess.textContent = 'Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.';
        formSuccess.setAttribute('aria-hidden', 'false');
        contactForm.reset();
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                formSuccess.textContent = '';
                formSuccess.setAttribute('aria-hidden', 'true');
                formSuccess.style.animation = '';
            }, 500);
        }, 5000);
    }
    
    return isValid;
}

// Add form field interaction enhancements
function setupFormInteractions() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    
    formInputs.forEach(input => {
        // Add focus and blur effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('input-focused');
            
            // Validate on blur
            if (input.value.trim() !== '') {
                input.classList.add('input-filled');
                input.setAttribute('aria-invalid', 'false');
            } else {
                input.classList.remove('input-filled');
                if (input.hasAttribute('required')) {
                    input.setAttribute('aria-invalid', 'true');
                }
            }
        });
        
        // Clear error message when typing
        input.addEventListener('input', () => {
            const errorElement = document.getElementById(`${input.id}Error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animation Implementation
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .about-content, .service-card, .slide, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('section-title')) {
                    entry.target.classList.add('fade-in', 'visible');
                } else if (entry.target.classList.contains('about-content')) {
                    entry.target.querySelector('.about-image').classList.add('slide-in-left', 'visible');
                    entry.target.querySelector('.about-text').classList.add('slide-in-right', 'visible');
                } else if (entry.target.classList.contains('service-card')) {
                    entry.target.classList.add('scale-in', 'visible');
                } else if (entry.target.classList.contains('slide')) {
                    entry.target.classList.add('fade-in', 'visible');
                } else if (entry.target.classList.contains('contact-form')) {
                    entry.target.classList.add('fade-in', 'visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(element => {
        if (element.classList.contains('section-title')) {
            element.classList.add('fade-in');
        } else if (element.classList.contains('about-content')) {
            element.querySelector('.about-image').classList.add('slide-in-left');
            element.querySelector('.about-text').classList.add('slide-in-right');
        } else if (element.classList.contains('service-card')) {
            element.classList.add('scale-in');
        } else if (element.classList.contains('slide')) {
            element.classList.add('fade-in');
        } else if (element.classList.contains('contact-form')) {
            element.classList.add('fade-in');
        }
        observer.observe(element);
    });
}

// Initialize all functionality
function init() {
    // Apply saved theme
    initTheme();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Event Listeners
    themeToggleBtn.addEventListener('click', toggleTheme);
    hamburger.addEventListener('click', toggleMobileMenu);
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    contactForm.addEventListener('submit', validateForm);
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Setup additional functionality
    setupNavItemsClick();
    setupSmoothScrolling();
    enhanceHomeSection();
    setupFormInteractions();
    
    // Auto-advance slider every 5 seconds
    setInterval(nextSlide, 5000);
}

// Enhance home section accessibility and interactivity
function enhanceHomeSection() {
    // Add parallax effect to home section background (respecting reduced motion preferences)
    const homeSection = document.getElementById('home');
    if (homeSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                homeSection.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.05}px)`;
            }
        });
    }
    
    // Add focus states for better keyboard navigation
    const ctaButtons = document.querySelectorAll('.cta-container .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('focus', () => {
            button.style.outline = '2px solid white';
            button.style.outlineOffset = '3px';
        });
        button.addEventListener('blur', () => {
            button.style.outline = 'none';
        });
    });
    
    // Add intersection observer for hero features to animate them when they come into view
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const heroFeatures = document.querySelectorAll('.hero-feature');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroFeatures.forEach((feature, index) => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
            observer.observe(feature);
        });
    }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);