/**
 * Component Loader
 * Dynamically loads HTML components into the main page
 */

class ComponentLoader {
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
        this.loadedComponents = new Set();
    }

    /**
     * Initialize component loading
     */
    async init() {
        try {
            await this.loadAllComponents();
            console.log('All components loaded successfully');
        } catch (error) {
            console.error('Error loading components:', error);
            this.handleLoadError();
        }
    }

    /**
     * Load all components
     */
    async loadAllComponents() {
        const loadPromises = this.components.map(component => 
            this.loadComponent(component.id, component.path)
        );
        
        await Promise.all(loadPromises);
    }

    /**
     * Load a single component
     */
    async loadComponent(componentId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            this.insertComponent(componentId, html);
            this.loadedComponents.add(componentId);
            
        } catch (error) {
            console.error(`Failed to load component ${componentId}:`, error);
            throw error;
        }
    }

    /**
     * Insert component HTML into the page
     */
    insertComponent(componentId, html) {
        const container = document.getElementById(componentId);
        if (container) {
            container.innerHTML = html;
        } else {
            console.warn(`Container for component ${componentId} not found`);
        }
    }

    /**
     * Handle loading errors gracefully
     */
    handleLoadError() {
        // Show user-friendly error message
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.innerHTML = `
                <div class="error-message">
                    <h3>Oops! Something went wrong</h3>
                    <p>We're having trouble loading some content. Please refresh the page or try again later.</p>
                    <button onclick="location.reload()" class="btn btn-primary">Refresh Page</button>
                </div>
            `;
        }
    }

    /**
     * Check if all components are loaded
     */
    areAllComponentsLoaded() {
        return this.components.length === this.loadedComponents.size;
    }

    /**
     * Get loading progress
     */
    getLoadingProgress() {
        return (this.loadedComponents.size / this.components.length) * 100;
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.componentLoader = new ComponentLoader();
    window.componentLoader.init();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
