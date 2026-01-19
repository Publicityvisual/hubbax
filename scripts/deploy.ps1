param(
    [string]$msg = "Updates"
)

Write-Host "🚀 Starting Rapid Deployment..." -ForegroundColor Cyan


# 0. Cache Busting - Update version.json
$versionFile = "public/version.json"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$jsonContent = @"
{
  "version": "$timestamp",
  "buildId": "$(New-Guid)",
  "status": "deployed"
}
"@
Set-Content -Path $versionFile -Value $jsonContent
Write-Host "🔄 Cache Buster Updated: $timestamp" -ForegroundColor Magenta

# 1. Add all changes
git add .


# 2. Commit with message
git commit -m "$msg"

# 3. Push to trigger Vercel
Write-Host "☁️  Pushing to Vercel..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ Deployed! Vercel build should start immediately." -ForegroundColor Green
