Write-Host "Iniciando limpieza de Hubbax para liberar espacio..." -ForegroundColor Cyan

# Definir carpetas y archivos a eliminar
$paths = @("dist", "node_modules", ".next", "coverage", ".turbo", "lint_log.txt", "eslint_report.json")

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "Eliminando $path..." -NoNewline
        try {
            Remove-Item -Path $path -Recurse -Force -ErrorAction Stop
            Write-Host " [OK]" -ForegroundColor Green
        }
        catch {
            Write-Host " [ERROR]" -ForegroundColor Red
            Write-Host $_.Exception.Message -ForegroundColor Red
        }
    }
}

Write-Host "`nLimpieza completada." -ForegroundColor Cyan
Write-Host "¡IMPORTANTE!: Recuerda ejecutar 'npm install' antes de volver a iniciar el proyecto." -ForegroundColor Yellow
