"use client"
import { useEffect } from 'react';

export default function ScrollToActive() {
  useEffect(() => {
    const activateTabFromHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const tabElement = document.querySelector(`button[data-bs-target="${hash}"]`);
        if (tabElement) {
          tabElement.click(); //Activate the tab
          const tabPosition = document.getElementById('pills-tab').offsetTop;
          window.scrollTo({ top: tabPosition, behavior: 'smooth' });
        }
      }
    };
    activateTabFromHash();
    window.addEventListener('hashchange', activateTabFromHash);
    return () => {
      window.removeEventListener('hashchange', activateTabFromHash);
    };
  }, []);

  return null;
}
