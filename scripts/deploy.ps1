param(
    [string]$msg = "Updates"
)

Write-Host "🚀 Starting Rapid Deployment..." -ForegroundColor Cyan

# 1. Add all changes
git add .

# 2. Commit with message
git commit -m "$msg"

# 3. Push to trigger Vercel
Write-Host "☁️  Pushing to Vercel..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ Deployed! Vercel build should start immediately." -ForegroundColor Green
