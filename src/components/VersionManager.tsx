import { useEffect, useRef } from 'react';

// Check for updates every 30 seconds
const CHECK_INTERVAL = 30 * 1000; 

export function VersionManager() {
  const versionRef = useRef<string | null>(null);

  useEffect(() => {
    let active = true;

    const checkVersion = async (isInitial = false) => {
      try {
        const res = await fetch('/version.json?t=' + Date.now());
        const data = await res.json();
        
        if (!active) return;

        if (isInitial) {
          versionRef.current = data.version;
        } else if (versionRef.current && data.version !== versionRef.current) {
          console.log('🚀 Hubbax Sync: New version detected. Refreshing for latest updates...');
          
          // Force a hard reload to clear cache and get latest assets
          window.location.reload();
        }
      } catch {
        // Silent fail
      }
    };

    checkVersion(true);
    const interval = setInterval(() => checkVersion(), CHECK_INTERVAL);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return null;
}
