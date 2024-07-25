"use client"
import { useEffect } from 'react';
const useImageAttributes = () => {
  useEffect(() => {
    const updateImageAttributes = () => {
      document.querySelectorAll('img').forEach(img => {
        const src = decodeURIComponent(img.getAttribute('src'));
        const baseNameWithExtension = src.substring(src.lastIndexOf("/") + 1).split('.')[0];
        const baseNameWithoutExtension = baseNameWithExtension.replace(/\.[^/.]+$/, "");
        const formattedName = baseNameWithoutExtension
          .split(/[-_]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        if (!img.getAttribute('title')) {
          img.setAttribute('title', formattedName);
        }
        if (!img.getAttribute('alt')) {
          img.setAttribute('alt', formattedName);
        }
      });
    };

    updateImageAttributes();    
    const observer = new MutationObserver(updateImageAttributes);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
};
export default useImageAttributes;