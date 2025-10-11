#!/bin/bash

# Auto-commit script para HubbaX
echo "🚀 Iniciando auto-commit para HubbaX..."

# Verificar si hay cambios
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Cambios detectados, creando commit..."
    
    # Agregar todos los archivos
    git add .
    
    # Crear commit con timestamp
    TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
    git commit -m "auto: Cambios automáticos - $TIMESTAMP"
    
    # Push a main
    echo "📤 Subiendo cambios a GitHub..."
    git push origin main
    
    echo "✅ Auto-commit completado - Cambios en vivo en https://hubbax.vercel.app/"
else
    echo "ℹ️  No hay cambios que commitear"
fi