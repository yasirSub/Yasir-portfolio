/**
 * Simple Component Loader
 * More reliable version for local development
 */

class SimpleComponentLoader {
    constructor() {
        this.components = [
            { id: 'header', path: 'components/header.html' },
            { id: 'hero', path: 'components/hero.html' },
            { id: 'about', path: 'components/about.html' },
            { id: 'experience', path: 'components/experience.html' },
            { id: 'skills', path: 'components/skills.html' },
            { id: 'projects', path: 'components/projects.html' },
            { id: 'education', path: 'components/education.html' },
            { id: 'achievements', path: 'components/achievements.html' },
            { id: 'contact', path: 'components/contact.html' },
            { id: 'footer', path: 'components/footer.html' }
        ];
        this.loadedCount = 0;
        this.totalComponents = this.components.length;
        this.debugMode = true; // Enable debug mode
        this.errors = []; // Track errors
    }

    /**
     * Initialize component loading
     */
    async init() {
        this.log('Starting component loading...');
        this.log(`Total components to load: ${this.totalComponents}`);
        
        // Show loading status
        this.updateLoadingStatus('Loading components...');
        
        try {
            // Load components one by one for better reliability
            for (const component of this.components) {
                this.log(`Loading component: ${component.id} from ${component.path}`);
                await this.loadComponent(component.id, component.path);
                this.loadedCount++;
                this.log(`✓ Loaded ${this.loadedCount}/${this.totalComponents}: ${component.id}`);
                this.updateLoadingStatus(`Loaded ${this.loadedCount}/${this.totalComponents} components`);
                
                // Update debug display
                this.updateDebugDisplay();
            }
            
            this.log('All components loaded successfully!');
            this.updateLoadingStatus('Portfolio ready!');
            this.onAllComponentsLoaded();
            
        } catch (error) {
            this.log('Error loading components:', error);
            this.handleLoadError();
        }
    }

    /**
     * Load a single component
     */
    async loadComponent(componentId, componentPath) {
        try {
            this.log(`Fetching: ${componentPath}`);
            const response = await fetch(componentPath);
            
            this.log(`Response status: ${response.status}, ok: ${response.ok}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            this.log(`Received HTML for ${componentId}: ${html.length} characters`);
            
            if (html.length < 10) {
                throw new Error(`Component HTML too short: ${html.length} characters`);
            }
            
            this.insertComponent(componentId, html);
            
        } catch (error) {
            this.log(`Failed to load component ${componentId}:`, error);
            this.errors.push({ component: componentId, error: error.message });
            // Insert error message instead of throwing
            this.insertErrorComponent(componentId, componentPath, error.message);
        }
    }

    /**
     * Insert component HTML into the page
     */
    insertComponent(componentId, html) {
        const container = document.getElementById(componentId);
        if (container) {
            container.innerHTML = html;
            container.style.display = 'block';
            container.style.opacity = '1';
            this.log(`✓ Component ${componentId} inserted and displayed`);
            
            // Special handling for floating menu to ensure it stays visible
            if (componentId === 'floating-nav') {
                this.ensureFloatingMenuVisible();
            }
        } else {
            this.log(`✗ Container for component ${componentId} not found`);
        }
    }

    /**
     * Ensure floating menu is visible after loading
     */
    ensureFloatingMenuVisible() {
        setTimeout(() => {
            const floatingMenu = document.getElementById('floating-menu');
            if (floatingMenu) {
                // Force the menu to be visible with maximum priority
                floatingMenu.style.setProperty('display', 'block', 'important');
                floatingMenu.style.setProperty('visibility', 'visible', 'important');
                floatingMenu.style.setProperty('opacity', '1', 'important');
                floatingMenu.style.setProperty('position', 'fixed', 'important');
                floatingMenu.style.setProperty('z-index', '99999', 'important');
                floatingMenu.style.setProperty('right', '1.5rem', 'important');
                floatingMenu.style.setProperty('top', '50%', 'important');
                floatingMenu.style.setProperty('transform', 'translateY(-50%)', 'important');
                floatingMenu.classList.remove('hidden');
                
                this.log('🎯 Floating menu forced visible with inline styles');
                
                // Also ensure the show button is hidden
                const showBtn = document.getElementById('menu-show-btn');
                if (showBtn) {
                    showBtn.style.setProperty('display', 'none', 'important');
                }
            }
        }, 50);
    }

    /**
     * Insert error message for failed component
     */
    insertErrorComponent(componentId, componentPath, errorMessage) {
        const container = document.getElementById(componentId);
        if (container) {
            container.innerHTML = `
                <div class="error-component" style="padding: 20px; text-align: center; color: red;">
                    <h3>⚠️ Failed to load: ${componentId}</h3>
                    <p>Path: ${componentPath}</p>
                    <p>Error: ${errorMessage}</p>
                    <button onclick="location.reload()" class="btn btn-secondary">Reload Page</button>
                </div>
            `;
            container.style.display = 'block';
            this.log(`⚠️ Error component inserted for ${componentId}`);
        }
    }

    /**
     * Update loading status
     */
    updateLoadingStatus(message) {
        const statusEl = document.getElementById('loading-status');
        if (statusEl) {
            statusEl.textContent = message;
        }
        
        // Also update debug info
        const debugStatus = document.getElementById('debug-status');
        if (debugStatus) {
            debugStatus.textContent = message;
        }
    }

    /**
     * Update debug display
     */
    updateDebugDisplay() {
        const debugComponents = document.getElementById('debug-components');
        if (debugComponents) {
            debugComponents.textContent = `${this.loadedCount}/${this.totalComponents}`;
        }
        
        // Show errors if any
        if (this.errors.length > 0) {
            const debugInfo = document.getElementById('debug-info');
            if (debugInfo) {
                debugInfo.innerHTML += `<div style="color: #fca5a5; margin-top: 5px;">Errors: ${this.errors.length}</div>`;
            }
        }
    }

    /**
     * Hide the loading screen
     */
    hideLoadingScreen() {
        this.log('Hiding loading screen...');
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.log('Loading screen hidden');
            }, 500);
        }
    }

    /**
     * Handle loading errors gracefully
     */
    handleLoadError() {
        this.log('Some components failed to load, but continuing...');
        this.log('Errors encountered:', this.errors);
        this.updateLoadingStatus(`Some components failed to load (${this.errors.length} errors)`);
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2000);
    }

    /**
     * Called when all components are loaded
     */
    onAllComponentsLoaded() {
        this.log('Portfolio is ready!');
        this.updateLoadingStatus('Portfolio ready!');
        
        // Force hide loading screen immediately
        this.forceHideLoadingScreen();
        
        // Ensure floating menu is visible after all components load
        this.ensureFloatingMenuVisible();
        
        // Initialize any additional functionality
        setTimeout(() => {
            if (window.themeManager) {
                this.log('Initializing theme manager...');
                window.themeManager.init();
            }
            
            if (window.portfolioApp) {
                this.log('Initializing portfolio app...');
                window.portfolioApp.init();
            }
            
            // Final check for floating menu visibility
            this.ensureFloatingMenuVisible();
        }, 500);
    }

    /**
     * Force hide loading screen (emergency method)
     */
    forceHideLoadingScreen() {
        this.log('Force hiding loading screen...');
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            this.log('Loading screen force hidden');
        }
        
        // Also ensure all components are visible
        this.forceShowAllComponents();
    }
    
    /**
     * Force show all components
     */
    forceShowAllComponents() {
        this.log('Force showing all components...');
        this.components.forEach(component => {
            const container = document.getElementById(component.id);
            if (container) {
                container.style.display = 'block';
                container.style.opacity = '1';
                container.style.visibility = 'visible';
                container.style.position = 'relative';
                container.style.zIndex = '1';
            }
        });
        this.log('All components force shown');
    }

    /**
     * Debug logging
     */
    log(...args) {
        if (this.debugMode) {
            console.log(`[ComponentLoader]`, ...args);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, starting component loader...');
    window.componentLoader = new SimpleComponentLoader();
    window.componentLoader.init();
    
    // Fallback: if loading screen is still visible after 5 seconds, force hide it
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            console.log('Fallback: Force hiding loading screen after timeout');
            loadingScreen.style.display = 'none';
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            
            // Also force show all components
            if (window.componentLoader) {
                window.componentLoader.forceShowAllComponents();
                window.componentLoader.ensureFloatingMenuVisible();
            }
        }
    }, 5000);
    
    // Continuous check to ensure floating menu stays visible
    setInterval(() => {
        if (window.componentLoader) {
            const floatingMenu = document.getElementById('floating-menu');
            if (floatingMenu) {
                // Check if menu is hidden and force it visible
                const computedStyle = window.getComputedStyle(floatingMenu);
                const isHidden = computedStyle.display === 'none' || 
                                computedStyle.visibility === 'hidden' || 
                                computedStyle.opacity === '0' ||
                                floatingMenu.classList.contains('hidden');
                
                if (isHidden) {
                    console.log('🔧 Floating menu detected as hidden, forcing visible...');
                    window.componentLoader.ensureFloatingMenuVisible();
                }
            }
        }
    }, 2000); // Check every 2 seconds
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleComponentLoader;
}
