// ===== MAIN JAVASCRIPT FILE =====
// Portfolio Website - Main Functionality

class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupBackToTop();
        this.setupLoadingScreen();
        this.setupTypingEffect();
        this.setupSkillBars();
        this.setupStatsCounter();
        this.setupParticles();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Window events
        window.addEventListener('load', () => this.onPageLoad());
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('resize', () => this.onResize());
        
        // Navigation events
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.onNavClick(e));
        });

        // Form events
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.onFormSubmit(e));
        }

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => this.scrollToTop());
        }

        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.onDocumentClick(e));
    }

    // ===== INITIALIZATION =====
    initializeComponents() {
        // Add animation classes to elements
        this.addAnimationClasses();
        
        // Initialize tooltips
        this.initializeTooltips();
        
        // Setup intersection observer for animations
        this.setupIntersectionObserver();
    }

    // ===== PAGE LOAD =====
    onPageLoad() {
        // Hide loading screen
        this.hideLoadingScreen();
        
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        this.triggerInitialAnimations();
        
        // Initialize particles
        this.initParticles();
    }

    // ===== SCROLL HANDLING =====
    onScroll() {
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        this.isScrolling = true;
        
        // Update back to top button
        this.updateBackToTopButton();
        
        // Update active navigation
        this.updateActiveNavigation();
        
        // Parallax effects
        this.updateParallaxElements();

        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    }

    onResize() {
        // Recalculate dimensions and positions
        this.recalculateLayout();
        
        // Update mobile menu state
        this.updateMobileMenuState();
    }

    // ===== NAVIGATION =====
    onNavClick(e) {
        e.preventDefault();
        const target = e.currentTarget.getAttribute('href').substring(1);
        
        // Close mobile menu if open
        this.closeMobileMenu();
        
        // Scroll to section
        this.scrollToSection(target);
        
        // Update current section
        this.currentSection = target;
        
        // Update active navigation
        this.updateActiveNavigation();
    }

    // ===== MOBILE MENU =====
    setupMobileMenu() {
        this.mobileMenu = document.querySelector('.nav-menu');
        this.hamburger = document.getElementById('hamburger');
        this.isMobileMenuOpen = false;
    }

    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenu.classList.add('active');
        this.hamburger.classList.add('active');
        this.isMobileMenuOpen = true;
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        this.isMobileMenuOpen = false;
        document.body.style.overflow = '';
    }

    onDocumentClick(e) {
        // Close mobile menu if clicking outside
        if (this.isMobileMenuOpen && 
            !this.mobileMenu.contains(e.target) && 
            !this.hamburger.contains(e.target)) {
            this.closeMobileMenu();
        }
    }

    updateMobileMenuState() {
        if (window.innerWidth > 768 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    // ===== SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href').substring(1);
                this.scrollToSection(target);
            });
        });
    }

    scrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ===== ACTIVE NAVIGATION =====
    setupActiveNavigation() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
    }

    updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.setActiveNavLink(sectionId);
            }
        });
    }

    setActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== BACK TO TOP BUTTON =====
    setupBackToTop() {
        this.backToTopBtn = document.getElementById('back-to-top');
    }

    updateBackToTopButton() {
        if (this.backToTopBtn) {
            if (window.scrollY > 300) {
                this.backToTopBtn.classList.add('visible');
            } else {
                this.backToTopBtn.classList.remove('visible');
            }
        }
    }

    // ===== LOADING SCREEN =====
    setupLoadingScreen() {
        this.loadingScreen = document.getElementById('loading-screen');
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            setTimeout(() => {
                this.loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    this.loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    // ===== TYPING EFFECT =====
    setupTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        const texts = [
            'Full Stack Developer',
            'Flutter Developer',
            'AI Enthusiast',
            'Problem Solver'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeText = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const speed = isDeleting ? 100 : 150;
            setTimeout(typeText, speed);
        };

        typeText();
    }

    // ===== SKILL BARS =====
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.level-bar');
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                if (level) {
                    bar.style.width = `${level}%`;
                }
            });
        };

        // Animate skill bars when they come into view
        const skillSection = document.getElementById('skills');
        if (skillSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(skillSection);
        }
    }

    // ===== STATS COUNTER =====
    setupStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        const animateCounters = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };

                updateCounter();
            });
        };

        // Animate counters when they come into view
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(heroSection);
        }
    }

    // ===== PARTICLES =====
    setupParticles() {
        this.particles = [];
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'particle-container';
        this.particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.appendChild(this.particleContainer);
    }

    initParticles() {
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            this.createParticle();
        }

        // Animate particles
        this.animateParticles();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const delay = Math.random() * 6;
        
        particle.style.cssText = `
            left: ${x}px;
            animation-delay: ${delay}s;
        `;
        
        this.particleContainer.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 6000);
    }

    animateParticles() {
        // Create new particles periodically
        setInterval(() => {
            if (this.particles.length < 20) {
                this.createParticle();
            }
        }, 300);
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-item, .scroll-trigger');
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ===== ANIMATION CLASSES =====
    addAnimationClasses() {
        // Add animation classes to sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.classList.add('animate-on-scroll');
            section.style.animationDelay = `${index * 0.2}s`;
        });

        // Add stagger animation to grid items
        const gridItems = document.querySelectorAll('.skill-item, .project-card, .contact-item');
        gridItems.forEach((item, index) => {
            item.classList.add('stagger-item');
        });
    }

    // ===== TOOLTIPS =====
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => this.showTooltip(e));
            element.addEventListener('mouseleave', () => this.hideTooltip());
        });
    }

    showTooltip(event) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = event.target.getAttribute('data-tooltip');
        
        tooltip.style.cssText = `
            position: absolute;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 0.5rem 0.75rem;
            border-radius: var(--border-radius);
            font-size: 0.875rem;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        this.currentTooltip = tooltip;
    }

    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }

    // ===== FORM HANDLING =====
    onFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show success message
        this.showFormSuccess();
        
        // Reset form
        e.target.reset();
    }

    validateForm(data) {
        const required = ['name', 'email', 'subject', 'message'];
        
        for (const field of required) {
            if (!data[field] || data[field].trim() === '') {
                this.showFormError(`Please fill in the ${field} field`);
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showFormError('Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    showFormSuccess() {
        this.showNotification('Message sent successfully!', 'success');
    }

    showFormError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            color: var(--text-inverse);
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = 'var(--success-color)';
        } else if (type === 'error') {
            notification.style.background = 'var(--error-color)';
        } else {
            notification.style.background = 'var(--primary-color)';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // ===== UTILITY FUNCTIONS =====
    triggerInitialAnimations() {
        // Add initial animation classes
        document.body.classList.add('animate-in');
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-stats');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-fade-in-up');
            }, index * 200);
        });
    }

    updateParallaxElements() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    recalculateLayout() {
        // Recalculate any layout-dependent measurements
        this.updateParallaxElements();
    }

    // ===== PUBLIC METHODS =====
    refresh() {
        // Refresh the app state
        this.updateActiveNavigation();
        this.updateBackToTopButton();
    }
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// ===== EXPORT FOR MODULES =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
