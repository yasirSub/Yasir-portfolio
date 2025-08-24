@echo off
echo Deploying Portfolio to GitHub...
echo.

echo Step 1: Initializing Git...
git init

echo Step 2: Adding files...
git add .

echo Step 3: Committing changes...
git commit -m "Deploy beautiful portfolio website"

echo Step 4: Setting main branch...
git branch -M main

echo Step 5: Adding remote origin...
git remote add origin https://github.com/yasirSub/Yasir-portfolio.git

echo Step 6: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your portfolio is now on GitHub!
echo.
echo Next: Enable GitHub Pages:
echo 1. Go to: https://github.com/yasirSub/Yasir-portfolio
echo 2. Click Settings > Pages
echo 3. Select 'main' branch
echo 4. Save
echo.
echo Your site will be live at:
echo https://yasirsub.github.io/Yasir-portfolio/
echo.
pause
