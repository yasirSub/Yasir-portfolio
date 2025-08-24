@echo off
echo ========================================
echo     Portfolio Local Server
echo ========================================
echo.
echo Starting local server on port 8080...
echo Your portfolio will be available at: http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try to start Python server if available
python -m http.server 8080 2>nul
if %errorlevel% neq 0 (
    python3 -m http.server 8080 2>nul
    if %errorlevel% neq 0 (
        echo Python not found. Trying alternative methods...
        echo.
        echo Option 1: Install Python from https://python.org
        echo Option 2: Use VS Code Live Server extension
        echo Option 3: Use GitHub Pages (recommended)
        echo.
        pause
    )
)
