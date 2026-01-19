import { useEffect, useState } from 'react';

// Check for updates every 30 seconds
const CHECK_INTERVAL = 30 * 1000; 

export function VersionManager() {
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);

  useEffect(() => {
    // 1. Get initial version on mount
    fetch('/version.json?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        setCurrentVersion(data.version);
        console.log('📱 System Version:', data.version);
      })
      .catch(err => console.warn('Version check failed', err));

    // 2. Poll for updates
    const interval = setInterval(() => {
      fetch('/version.json?t=' + Date.now())
        .then(res => res.json())
        .then(serverData => {
          if (currentVersion && serverData.version !== currentVersion) {
            console.log('🚀 New version detected!', serverData.version);
            
            // Intelligence: Auto-update if the user is idle, or show a toast
            // For now, let's just force a clean reload to ensure they get the fixes
            // But let's be "Facebook Smart" - maybe only if critical? 
            // We'll trust the user wants the latest.
            
            if (confirm('🎉 Hubbax se ha actualizado con mejoras. ¿Recargar ahora?')) {
                 window.location.reload();
            }
          }
        })
        .catch(() => {});
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [currentVersion]);

  return null; // Invisible logic component
}
