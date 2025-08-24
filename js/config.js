/**
 * Portfolio Configuration
 * Easy to customize settings for your portfolio
 */

const PORTFOLIO_CONFIG = {
    // Personal Information
    personal: {
        name: "Yasir Subhani",
        title: "Web & Android App Developer",
        email: "yasir.subhani123@gmail.com",
        phone: "+91 8271819813",
        location: "Kolkata, India",
        linkedin: "linkedin.com/in/yasirsubhani",
        github: "github.com/yasirSub"
    },

    // Theme Settings
    theme: {
        defaultTheme: "light", // "light" or "dark"
        enableAutoTheme: true, // Automatically detect system theme
        enableThemeToggle: true
    },

    // Animation Settings
    animations: {
        enableAnimations: true,
        enableScrollAnimations: true,
        enableTypingEffect: true,
        enableParticles: true,
        animationSpeed: "normal" // "slow", "normal", "fast"
    },

    // Loading Settings
    loading: {
        showLoadingScreen: true,
        loadingDuration: 2000, // milliseconds
        enableProgressBar: true
    },

    // Contact Form Settings
    contact: {
        enableForm: true,
        enableValidation: true,
        showSuccessMessage: true,
        enableAutoReply: false
    },

    // Social Media Links
    social: {
        github: "https://github.com/yasirSub",
        linkedin: "https://linkedin.com/in/yasirsubhani",
        twitter: null, // Set to null to hide
        instagram: null,
        facebook: null,
        youtube: null
    },

    // SEO Settings
    seo: {
        title: "Yasir Subhani - Web & Android App Developer",
        description: "Professional portfolio of Yasir Subhani, a Web & Android App Developer with expertise in Flutter, AI automation, and full-stack development.",
        keywords: "Yasir Subhani, Web Developer, Android Developer, Flutter Developer, AI Developer, Full Stack Developer",
        author: "Yasir Subhani",
        ogImage: "assets/images/og-image.jpg"
    },

    // Performance Settings
    performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        enableCodeSplitting: true,
        enableServiceWorker: false
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_CONFIG;
} else {
    window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
