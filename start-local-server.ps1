# Simple Local Server for Portfolio Testing
Write-Host "Starting local server..." -ForegroundColor Green
Write-Host "Your portfolio will be available at: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Check if Python is available
try {
    python --version | Out-Null
    Write-Host "Using Python server..." -ForegroundColor Green
    python -m http.server 8000
} catch {
    try {
        python3 --version | Out-Null
        Write-Host "Using Python3 server..." -ForegroundColor Green
        python3 -m http.server 8000
    } catch {
        # Fallback to Node.js if available
        try {
            node --version | Out-Null
            Write-Host "Using Node.js server..." -ForegroundColor Green
            npx http-server -p 8000
        } catch {
            Write-Host "No Python or Node.js found. Installing simple server..." -ForegroundColor Yellow
            Write-Host "Please install Python from: https://python.org" -ForegroundColor Cyan
            Read-Host "Press Enter to exit"
        }
    }
}
