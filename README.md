# 🚀 Yasir Subhani - Portfolio Website

A modern, responsive portfolio website built with modular components and clean architecture.

## ✨ Features

- **Modular Design** - Each section in separate, maintainable files
- **Modern UI/UX** - Professional developer-themed design
- **Dark/Light Theme** - Automatic theme switching with manual toggle
- **Responsive Layout** - Mobile-first design that works on all devices
- **Performance Optimized** - Fast loading with modern CSS and JavaScript
- **Easy Customization** - Simple configuration file for personalization

## 🏗️ Project Structure

```
portfilo/
├── components/          # HTML components for each section
│   ├── header.html     # Navigation and terminal header
│   ├── hero.html       # Hero section with code editor
│   ├── about.html      # About me section
│   ├── experience.html # Professional experience timeline
│   ├── skills.html     # Skills and expertise grid
│   ├── projects.html   # Featured projects showcase
│   ├── education.html  # Academic background
│   ├── achievements.html # Notable accomplishments
│   ├── contact.html    # Contact form and information
│   └── footer.html     # Footer with social links
├── css/                # Organized stylesheets
│   ├── main.css        # Global styles and variables
│   ├── components.css  # Component-specific styles
│   ├── animations.css  # CSS animations and keyframes
│   └── responsive.css  # Mobile-first responsive design
├── js/                 # JavaScript modules
│   ├── config.js       # Configuration and customization
│   ├── components.js   # Dynamic component loader
│   ├── main.js         # Core application logic
│   └── theme.js        # Theme management system
├── assets/             # Images and icons
│   ├── icons/          # Favicon and icon files
│   └── images/         # Project and profile images
├── .github/            # GitHub Actions workflows
├── index.html          # Main HTML file (clean and minimal)
├── deploy.ps1          # PowerShell deployment script
└── README.md           # This file
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yasirSub/Yasir-portfolio.git
   cd Yasir-portfolio
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for development

3. **Customize**
   - Edit `js/config.js` for personal information
   - Modify component files in `components/` folder
   - Update styles in `css/` folder

## 🎨 Customization

### Personal Information
Edit `js/config.js` to update:
- Name, title, contact details
- Social media links
- Theme preferences
- Animation settings

### Adding New Sections
1. Create new HTML file in `components/` folder
2. Add component to `js/components.js` loader
3. Add container div in `index.html`
4. Style in appropriate CSS file

### Theme Customization
- Colors: Edit CSS variables in `css/main.css`
- Animations: Modify `css/animations.css`
- Layout: Adjust `css/responsive.css`

## 🌐 Deployment

### GitHub Pages (Recommended)
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source as "GitHub Actions"
4. Automatic deployment on every push

### Manual Deployment
```bash
# Using PowerShell
./deploy.ps1

# Or manually
git add .
git commit -m "Update portfolio"
git push origin main
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript ES6+** - Modular, modern JavaScript
- **Font Awesome** - Professional icons
- **Google Fonts** - Typography (JetBrains Mono, Inter)
- **GitHub Actions** - Automated deployment

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: yasir.subhani123@gmail.com
- **LinkedIn**: [linkedin.com/in/yasirsubhani](https://linkedin.com/in/yasirsubhani)
- **GitHub**: [github.com/yasirSub](https://github.com/yasirSub)

---

⭐ **Star this repository if you found it helpful!**
