# Simple PowerShell Web Server for Portfolio Testing
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Portfolio Local Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$port = 8080
$root = Get-Location

Write-Host "Starting server on port $port..." -ForegroundColor Green
Write-Host "Root directory: $root" -ForegroundColor Yellow
Write-Host "Your portfolio will be available at: http://localhost:$port" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

try {
    # Create a simple HTTP listener
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
    
    Write-Host "✓ Server started successfully!" -ForegroundColor Green
    Write-Host "✓ Open http://localhost:$port in your browser" -ForegroundColor Green
    Write-Host ""
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        $filePath = Join-Path $root $localPath.TrimStart('/')
        
        if ($localPath -eq "/") {
            $filePath = Join-Path $root "index.html"
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = Get-Content $filePath -Raw -Encoding UTF8
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            
            # Set content type based on file extension
            $extension = [System.IO.Path]::GetExtension($filePath)
            switch ($extension) {
                ".html" { $response.ContentType = "text/html" }
                ".css"  { $response.ContentType = "text/css" }
                ".js"   { $response.ContentType = "application/javascript" }
                ".json" { $response.ContentType = "application/json" }
                default { $response.ContentType = "text/plain" }
            }
            
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.OutputStream.Close()
            
            Write-Host "✓ Served: $localPath" -ForegroundColor Green
        } else {
            $response.StatusCode = 404
            $response.Close()
            Write-Host "✗ Not found: $localPath" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "Error starting server: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Try running PowerShell as Administrator" -ForegroundColor Yellow
} finally {
    if ($listener) {
        $listener.Stop()
        Write-Host "Server stopped." -ForegroundColor Yellow
    }
}
