# Quick Setup Script for ShopHub

Write-Host "🛍️  ShopHub Setup Script" -ForegroundColor Cyan
Write-Host "========================`n" -ForegroundColor Cyan

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check MongoDB
Write-Host "`nChecking MongoDB..." -ForegroundColor Yellow
try {
    $mongoService = Get-Service MongoDB -ErrorAction SilentlyContinue
    if ($mongoService) {
        if ($mongoService.Status -eq "Running") {
            Write-Host "✅ MongoDB is running" -ForegroundColor Green
        } else {
            Write-Host "⚠️  MongoDB service found but not running" -ForegroundColor Yellow
            Write-Host "Starting MongoDB..." -ForegroundColor Yellow
            Start-Service MongoDB
            Write-Host "✅ MongoDB started" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️  MongoDB service not found. Using MongoDB Atlas or manual installation?" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  Could not check MongoDB status" -ForegroundColor Yellow
}

# Setup Backend
Write-Host "`n📦 Setting up Backend..." -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

Set-Location -Path "server"

if (Test-Path "node_modules") {
    Write-Host "✅ Backend dependencies already installed" -ForegroundColor Green
} else {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
}

# Create .env if not exists
if (-not (Test-Path ".env")) {
    Write-Host "`nCreating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created. Please update it with your settings!" -ForegroundColor Green
    Write-Host "   Edit: server/.env" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Seed Database
Write-Host "`n🌱 Seeding Database..." -ForegroundColor Cyan
Write-Host "This will create sample data and admin user" -ForegroundColor Yellow
$seed = Read-Host "Do you want to seed the database? (y/n)"
if ($seed -eq "y" -or $seed -eq "Y") {
    npm run seed
    Write-Host "✅ Database seeded successfully!" -ForegroundColor Green
    Write-Host "`n📧 Admin Credentials:" -ForegroundColor Yellow
    Write-Host "   Email: admin@shophub.com" -ForegroundColor White
    Write-Host "   Password: Admin@123" -ForegroundColor White
}

# Go back to root
Set-Location -Path ".."

# Setup Frontend
Write-Host "`n🎨 Setting up Frontend..." -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan

if (Test-Path "node_modules") {
    Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
} else {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
}

# Install axios if needed
Write-Host "`nInstalling axios..." -ForegroundColor Yellow
npm install axios

Write-Host "`n✅ Setup Complete!" -ForegroundColor Green
Write-Host "==================`n" -ForegroundColor Green

Write-Host "🚀 To start the application:`n" -ForegroundColor Cyan
Write-Host "Backend (Terminal 1):" -ForegroundColor Yellow
Write-Host "   cd server" -ForegroundColor White
Write-Host "   npm run dev`n" -ForegroundColor White

Write-Host "Frontend (Terminal 2):" -ForegroundColor Yellow
Write-Host "   npm run dev`n" -ForegroundColor White

Write-Host "📍 URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend API: http://localhost:5000" -ForegroundColor White
Write-Host "   Admin Login: http://localhost:5173/admin/login`n" -ForegroundColor White

Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   Backend: server/README.md" -ForegroundColor White
Write-Host "   Complete Guide: SETUP_GUIDE.md`n" -ForegroundColor White

$start = Read-Host "Do you want to start the servers now? (y/n)"
if ($start -eq "y" -or $start -eq "Y") {
    Write-Host "`nStarting Backend..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev"
    
    Start-Sleep -Seconds 3
    
    Write-Host "Starting Frontend..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"
    
    Write-Host "`n✅ Servers started in new windows!" -ForegroundColor Green
}
