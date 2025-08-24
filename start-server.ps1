Write-Host "Starting Portfolio Server..." -ForegroundColor Green
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from: https://python.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Navigate to portfolio directory
Set-Location "D:\mywork\portfilo"

Write-Host "Starting HTTP server on port 8000..." -ForegroundColor Yellow
Write-Host "Your portfolio will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop the server, press Ctrl+C" -ForegroundColor Red
Write-Host ""

# Start the Python server
python -m http.server 8000
