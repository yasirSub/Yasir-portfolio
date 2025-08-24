@echo off
echo Starting Portfolio Deployment...
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b 1
)

echo Git found. Starting deployment...
echo.

REM Initialize Git repository
echo 1. Initializing Git repository...
git init

REM Add all files
echo 2. Adding files...
git add .

REM Commit changes
echo 3. Committing changes...
git commit -m "Portfolio website - Yasir Subhani"

REM Set main branch
echo 4. Setting main branch...
git branch -M main

REM Add remote origin
echo 5. Adding GitHub remote...
git remote add origin https://github.com/yasirSub/Yasir-portfolio.git

REM Push to GitHub
echo 6. Pushing to GitHub...
git push -u origin main

echo.
echo Deployment completed!
echo.
echo Next steps:
echo 1. Go to: https://github.com/yasirSub/Yasir-portfolio
echo 2. Click Settings tab
echo 3. Scroll to Pages section
echo 4. Select "Deploy from a branch"
echo 5. Choose "main" branch and "/ (root)" folder
echo 6. Click Save
echo.
echo Your portfolio will be live at:
echo https://yasirsubhani.github.io/Yasir-portfolio/
echo.
pause
