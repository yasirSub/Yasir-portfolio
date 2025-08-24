/**
 * Main Portfolio JavaScript
 * Handles navigation, smooth scrolling, and interactive features
 */

class PortfolioApp {
    constructor() {
        this.themeToggle = null;
        this.themeIcon = null;
        this.navLinks = null;
        this.currentTheme = 'light';
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.initializeTheme();
        this.initializeSmoothScrolling();
        this.initializeScrollAnimations();
        this.initializeProjectsToggle();
        this.initializeTopNavigation();
        this.initializeFloatingButtons();
    }

    cacheElements() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        // Debug logging
        console.log('🔍 Cached elements:', {
            themeToggle: !!this.themeToggle,
            themeIcon: !!this.themeIcon,
            navLinks: this.navLinks.length
        });
        
        if (this.navLinks.length === 0) {
            console.warn('⚠️ No navigation links found. Check if components are loaded.');
        }
    }

    bindEvents() {
        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Navigation link click handlers
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    console.log(`🎯 Scrolling to: ${targetId}`);
                }
            });
        });
    }

    initializeTheme() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        // Update theme icon
        if (this.themeIcon) {
            this.themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    initializeSmoothScrolling() {
        // Smooth scrolling is now handled in bindEvents for better performance
        console.log('✅ Smooth scrolling initialized');
    }

    initializeScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill bars if this is the skills section
                    if (entry.target.id === 'skills') {
                        this.animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe elements with fade-in class
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));
        
        // Also observe the skills section directly for skill bar animation
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    // Safe no-op to avoid runtime error and allow following initializers to run
    initializeProjectsToggle() {
        // intentionally left blank
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            if (level) {
                setTimeout(() => {
                    bar.style.width = `${level}%`;
                }, 100);
            }
        });
    }

    initializeTopNavigation() {
        console.log('🔍 Initializing top navigation menu...');
        
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id], [id]');
        
        console.log('🔍 Found elements:', {
            navLinks: navLinks.length,
            sections: sections.length
        });
        
        if (!navLinks.length) {
            console.error('❌ Navigation links not found!');
            return;
        }
        
        // Log all navigation links for debugging
        navLinks.forEach((link, index) => {
            console.log(`🔗 Nav link ${index + 1}:`, {
                href: link.getAttribute('href'),
                text: link.textContent.trim()
            });
        });
        
        // Function to update active navigation link based on scroll
        const updateActiveNavLink = () => {
            const scrollPosition = window.scrollY + 120; // Increased offset for better detection
            let activeSection = null;
            let minDistance = Infinity;

            console.log('🔍 Scroll position:', scrollPosition);

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                // Calculate distance from current scroll position to section center
                const sectionCenter = sectionTop + (sectionHeight / 2);
                const distance = Math.abs(scrollPosition - sectionCenter);

                console.log(`📍 Section ${sectionId}:`, {
                    top: sectionTop,
                    height: sectionHeight,
                    center: sectionCenter,
                    distance: distance
                });

                if (distance < minDistance) {
                    minDistance = distance;
                    activeSection = sectionId;
                }
            });

            console.log('🎯 Selected active section:', activeSection, 'with distance:', minDistance);

            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section nav link
            if (activeSection) {
                const activeNavLink = document.querySelector(`.nav-link[href="#${activeSection}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                    console.log(`📍 Active section: ${activeSection}`);
                }
            }
        };

        // Scroll listener for active navigation with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                updateActiveNavLink();
            }, 100); // Small delay to prevent excessive updates
        });

        // Initialize active state
        updateActiveNavLink();
        
        console.log('✅ Top navigation menu initialized successfully!');
    }

    initializeFloatingButtons() {
        console.log('🔍 Initializing floating action buttons...');
        
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        const floatingButtons = document.getElementById('floating-buttons');
        
        if (!scrollToTopBtn || !floatingButtons) {
            console.error('❌ Floating buttons elements not found!');
            return;
        }
        
        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('🚀 Scrolling to top');
        });
        
        // Show/hide scroll to top button based on scroll position
        const toggleScrollToTopButton = () => {
            const scrollPosition = window.scrollY;
            const showThreshold = 300; // Show button after scrolling 300px
            
            if (scrollPosition > showThreshold) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', toggleScrollToTopButton);
        
        // Scroll progress bar functionality
        const updateScrollProgress = () => {
            const scrollProgress = document.getElementById('scroll-progress');
            if (scrollProgress) {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                
                scrollProgress.style.width = `${scrollPercent}%`;
                document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
            }
        };
        
        // Add scroll progress event listener
        window.addEventListener('scroll', updateScrollProgress);
        
        // Initial check
        toggleScrollToTopButton();
        updateScrollProgress();
        
        console.log('✅ Floating action buttons initialized successfully!');
    }





    // Utility method to add fade-in class to elements
    addFadeInClass(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('fade-in');
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Portfolio App...');
    window.portfolioApp = new PortfolioApp();
    
    // Add fade-in class to sections
    if (window.portfolioApp) {
        window.portfolioApp.addFadeInClass('.about, .experience, .skills, .projects, .education, .achievements, .contact');
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
