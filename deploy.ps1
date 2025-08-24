# Portfolio Deployment Script for PowerShell
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Portfolio Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    git --version | Out-Null
    Write-Host "✓ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/downloads" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Initialize Git repository
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
git init

# Add all files
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Initial portfolio commit - Beautiful responsive portfolio website"

# Set main branch
Write-Host "Setting main branch..." -ForegroundColor Yellow
git branch -M main

# Add remote origin
Write-Host "Adding remote origin..." -ForegroundColor Yellow
git remote add origin https://github.com/yasirSub/Yasir-portfolio.git

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your portfolio has been pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com/yasirSub/Yasir-portfolio" -ForegroundColor White
Write-Host "2. Go to Settings > Pages" -ForegroundColor White
Write-Host "3. Select 'main' branch as source" -ForegroundColor White
Write-Host "4. Save settings" -ForegroundColor White
Write-Host "5. Wait a few minutes for deployment" -ForegroundColor White
Write-Host "6. Your portfolio will be live at:" -ForegroundColor White
Write-Host "   https://yasirsub.github.io/Yasir-portfolio/" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"
