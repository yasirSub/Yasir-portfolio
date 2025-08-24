// ===== THEME SWITCHER =====
// Dark/Light mode functionality for the portfolio

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themeToggle = null;
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.loadSavedTheme();
        this.applyTheme();
        this.setupSystemThemeListener();
    }

    setupThemeToggle() {
        this.themeToggle = document.getElementById('theme-toggle');
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    loadSavedTheme() {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            this.currentTheme = this.getSystemThemePreference();
        }
    }

    getSystemThemePreference() {
        // Check if user prefers dark mode
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    setupSystemThemeListener() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    // Only auto-switch if user hasn't manually set a theme
                    this.currentTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.saveTheme();
        this.applyTheme();
        this.updateToggleIcon();
        this.animateThemeTransition();
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme() {
        const root = document.documentElement;
        
        // Remove existing theme classes
        root.classList.remove('theme-dark', 'theme-light');
        
        // Add current theme class
        root.classList.add(`theme-${this.currentTheme}`);
        
        // Set data attribute for CSS variables
        root.setAttribute('data-theme', this.currentTheme);
        
        // Update meta theme color
        this.updateMetaThemeColor();
        
        // Update toggle button icon
        this.updateToggleIcon();
    }

    updateMetaThemeColor() {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }

        if (this.currentTheme === 'dark') {
            metaThemeColor.content = '#0f172a'; // Dark theme color
        } else {
            metaThemeColor.content = '#ffffff'; // Light theme color
        }
    }

    updateToggleIcon() {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                if (this.currentTheme === 'dark') {
                    icon.className = 'fas fa-sun';
                    icon.setAttribute('aria-label', 'Switch to light mode');
                } else {
                    icon.className = 'fas fa-moon';
                    icon.setAttribute('aria-label', 'Switch to dark mode');
                }
            }
        }
    }

    animateThemeTransition() {
        // Add transition class to body
        document.body.classList.add('theme-transition');
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    // ===== THEME-SPECIFIC STYLES =====
    getThemeStyles() {
        const themes = {
            dark: {
                '--bg-primary': '#0f172a',
                '--bg-secondary': '#1e293b',
                '--bg-tertiary': '#334155',
                '--bg-card': '#1e293b',
                '--bg-overlay': 'rgba(0, 0, 0, 0.3)',
                '--text-primary': '#f8fafc',
                '--text-secondary': '#cbd5e1',
                '--text-muted': '#94a3b8',
                '--text-inverse': '#0f172a',
                '--border-color': '#334155',
                '--border-hover': '#475569',
                '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
                '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
                '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
            },
            light: {
                '--bg-primary': '#ffffff',
                '--bg-secondary': '#f8fafc',
                '--bg-tertiary': '#f1f5f9',
                '--bg-card': '#ffffff',
                '--bg-overlay': 'rgba(0, 0, 0, 0.1)',
                '--text-primary': '#0f172a',
                '--text-secondary': '#475569',
                '--text-muted': '#64748b',
                '--text-inverse': '#ffffff',
                '--border-color': '#e2e8f0',
                '--border-hover': '#cbd5e1',
                '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }
        };

        return themes[this.currentTheme] || themes.dark;
    }

    // ===== ACCESSIBILITY FEATURES =====
    setupAccessibility() {
        // Add keyboard navigation support
        if (this.themeToggle) {
            this.themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }

        // Announce theme changes to screen readers
        this.announceThemeChange();
    }

    announceThemeChange() {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Switched to ${this.currentTheme} mode`;
        
        document.body.appendChild(announcement);
        
        // Remove announcement after it's been read
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }

    // ===== PREFERENCE MANAGEMENT =====
    getThemePreference() {
        return this.currentTheme;
    }

    setThemePreference(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.currentTheme = theme;
            this.saveTheme();
            this.applyTheme();
            return true;
        }
        return false;
    }

    resetToSystemPreference() {
        localStorage.removeItem('theme');
        this.currentTheme = this.getSystemThemePreference();
        this.applyTheme();
    }

    // ===== EXPORT THEME DATA =====
    exportThemeData() {
        return {
            currentTheme: this.currentTheme,
            systemPreference: this.getSystemThemePreference(),
            savedPreference: localStorage.getItem('theme'),
            timestamp: new Date().toISOString()
        };
    }

    // ===== THEME ANALYTICS =====
    trackThemeUsage() {
        // Track theme usage for analytics (if needed)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'event_category': 'user_preference',
                'event_label': this.currentTheme,
                'value': 1
            });
        }
    }

    // ===== PUBLIC API =====
    getCurrentTheme() {
        return this.currentTheme;
    }

    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    isLightMode() {
        return this.currentTheme === 'light';
    }

    // ===== UTILITY METHODS =====
    addThemeClass(element, className) {
        element.classList.add(`theme-${this.currentTheme}`, className);
    }

    removeThemeClass(element, className) {
        element.classList.remove(`theme-${this.currentTheme}`, className);
    }

    hasThemeClass(element, className) {
        return element.classList.contains(`theme-${this.currentTheme}`, className);
    }
}

// ===== INITIALIZE THEME MANAGER =====
let themeManager;

document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    
    // Make it globally accessible
    window.themeManager = themeManager;
});

// ===== EXPORT FOR MODULES =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}

// ===== THEME UTILITY FUNCTIONS =====
window.ThemeUtils = {
    // Quick theme toggle
    toggle: () => themeManager?.toggleTheme(),
    
    // Get current theme
    getCurrent: () => themeManager?.getCurrentTheme(),
    
    // Set specific theme
    set: (theme) => themeManager?.setThemePreference(theme),
    
    // Check if dark mode
    isDark: () => themeManager?.isDarkMode(),
    
    // Check if light mode
    isLight: () => themeManager?.isLightMode(),
    
    // Reset to system preference
    reset: () => themeManager?.resetToSystemPreference()
};
