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
      })
      .catch(() => {});

    // 2. Poll for updates
    const interval = setInterval(() => {
      fetch('/version.json?t=' + Date.now())
        .then(res => res.json())
        .then(serverData => {
          if (currentVersion && serverData.version !== currentVersion) {
            // Future feature: Background silent sync
          }
        })
        .catch(() => {});
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [currentVersion]);

  return null; // Invisible logic component
}
