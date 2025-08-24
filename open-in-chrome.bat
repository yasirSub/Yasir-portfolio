@echo off
echo Opening Portfolio in Chrome...
echo.

REM Check if Chrome is installed
reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe" >nul 2>&1
if %errorlevel% equ 0 (
    echo Chrome found! Opening portfolio...
    start chrome "file:///D:/mywork/portfilo/index.html"
) else (
    echo Chrome not found in registry, trying common locations...
    if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
        echo Chrome found! Opening portfolio...
        "C:\Program Files\Google\Chrome\Application\chrome.exe" "file:///D:/mywork/portfilo/index.html"
    ) else if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" (
        echo Chrome found! Opening portfolio...
        "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "file:///D:/mywork/portfilo/index.html"
    ) else (
        echo Chrome not found. Please install Chrome or use the Python server method.
        echo.
        echo Alternative: Run this command in terminal:
        echo python -m http.server 8000
        echo Then open: http://localhost:8000 in Chrome
        pause
        exit /b 1
    )
)

echo.
echo Portfolio opened in Chrome!
echo.
pause
