"use client"
import { useEffect } from 'react';

const useLocalUrls = () => {
  useEffect(() => {
    const updateUrls = () => {
      document.querySelectorAll('Link, a').forEach(element => {
        if (element.href.includes('https://kornberglawfirm.com')) {
          element.href = element.href.replace('https://kornberglawfirm.com', '');
        }      
      });
    };

    updateUrls();
    const observer = new MutationObserver(updateUrls);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
};

export default useLocalUrls;
