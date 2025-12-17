# PowerShell script to start MongoDB using Docker
Write-Host "Starting MongoDB container..." -ForegroundColor Green

# Check if container already exists
$existing = docker ps -a --filter "name=mongodb" --format "{{.Names}}"

if ($existing -eq "mongodb") {
    Write-Host "MongoDB container exists. Starting it..." -ForegroundColor Yellow
    docker start mongodb
} else {
    Write-Host "Creating new MongoDB container..." -ForegroundColor Yellow
    docker run -d -p 27017:27017 --name mongodb mongo:latest
}

Write-Host "Waiting for MongoDB to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Check if MongoDB is running
$running = docker ps --filter "name=mongodb" --format "{{.Names}}"
if ($running -eq "mongodb") {
    Write-Host "MongoDB is running successfully!" -ForegroundColor Green
    Write-Host "Connection string: mongodb://localhost:27017/student-notes" -ForegroundColor Cyan
} else {
    Write-Host "Failed to start MongoDB. Check Docker logs:" -ForegroundColor Red
    Write-Host "docker logs mongodb" -ForegroundColor Yellow
}

