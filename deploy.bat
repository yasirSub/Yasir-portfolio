@echo off
echo ========================================
echo    Portfolio Deployment Script
echo ========================================
echo.

echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Initial portfolio commit - Beautiful responsive portfolio website"

echo Setting main branch...
git branch -M main

echo Adding remote origin...
git remote add origin https://github.com/yasirSub/Yasir-portfolio.git

echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo    Deployment Complete!
echo ========================================
echo.
echo Your portfolio has been pushed to GitHub!
echo.
echo Next steps:
echo 1. Go to https://github.com/yasirSub/Yasir-portfolio
echo 2. Go to Settings > Pages
echo 3. Select 'main' branch as source
echo 4. Save settings
echo 5. Wait a few minutes for deployment
echo 6. Your portfolio will be live at:
echo    https://yasirsub.github.io/Yasir-portfolio/
echo.
pause
