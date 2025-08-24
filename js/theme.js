/**
 * Theme Manager
 * Handles theme switching and persistence
 */

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggle = null;
        this.themeIcon = null;
        this.init();
    }

    init() {
        this.cacheElements();
        this.loadSavedTheme();
        this.bindEvents();
        this.applyTheme();
    }

    cacheElements() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            this.currentTheme = this.getSystemTheme();
        }
    }

    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
        this.updateMetaThemeColor();
    }

    updateThemeIcon() {
        if (this.themeIcon) {
            if (this.currentTheme === 'light') {
                this.themeIcon.className = 'fas fa-moon';
                this.themeIcon.setAttribute('aria-label', 'Switch to dark theme');
            } else {
                this.themeIcon.className = 'fas fa-sun';
                this.themeIcon.setAttribute('aria-label', 'Switch to light theme');
            }
        }
    }

    updateMetaThemeColor() {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            if (this.currentTheme === 'light') {
                metaThemeColor.setAttribute('content', '#6366f1');
            } else {
                metaThemeColor.setAttribute('content', '#1e293b');
            }
        }
    }

    saveTheme() {
        localStorage.setItem('portfolio-theme', this.currentTheme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.currentTheme = theme;
            this.applyTheme();
            this.saveTheme();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Theme Manager...');
    window.themeManager = new ThemeManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
