@echo off
REM Auto-commit script para HubbaX (Windows)
echo 🚀 Iniciando auto-commit para HubbaX...

REM Verificar si hay cambios
git status --porcelain > temp_status.txt
for /f %%i in (temp_status.txt) do set HAS_CHANGES=1
del temp_status.txt

if defined HAS_CHANGES (
    echo 📝 Cambios detectados, creando commit...
    
    REM Agregar todos los archivos
    git add .
    
    REM Crear commit con timestamp
    for /f "tokens=1-5 delims=/ " %%d in ('date /t') do set DATE=%%f-%%e-%%d
    for /f "tokens=1-2 delims=: " %%h in ('time /t') do set TIME=%%h:%%i
    git commit -m "auto: Cambios automáticos - %DATE% %TIME%"
    
    REM Push a main
    echo 📤 Subiendo cambios a GitHub...
    git push origin main
    
    echo ✅ Auto-commit completado - Cambios en vivo en https://hubbax.vercel.app/
) else (
    echo ℹ️  No hay cambios que commitear
)