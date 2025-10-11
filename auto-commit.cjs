const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Iniciando auto-commit para HubbaX...');

try {
  // Verificar si hay cambios
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (status.trim()) {
    console.log('📝 Cambios detectados, creando commit...');
    
    // Agregar todos los archivos
    execSync('git add .');
    
    // Crear commit con timestamp
    const timestamp = new Date().toLocaleString('es-MX');
    const commitMessage = `auto: Cambios automáticos - ${timestamp}`;
    execSync(`git commit -m "${commitMessage}"`);
    
    // Push a main
    console.log('📤 Subiendo cambios a GitHub...');
    execSync('git push origin main');
    
    console.log('✅ Auto-commit completado - Cambios en vivo en https://hubbax.vercel.app/');
    console.log(`💾 Commit: ${commitMessage}`);
  } else {
    console.log('ℹ️  No hay cambios que commitear');
  }
} catch (error) {
  console.error('❌ Error en auto-commit:', error.message);
  process.exit(1);
}