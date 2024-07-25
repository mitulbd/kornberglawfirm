"use client"
import { useEffect } from 'react';
const useExternalLinks = () => {
  useEffect(() => {
    const isExternal = (url) => {
      var anchor = document.createElement('a');
      anchor.href = url;		
      return anchor.hostname !== window.location.hostname;
    };  
    const updateLinks = () => {
      document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (isExternal(href) && !href.startsWith('tel:')  && !href.startsWith('mailto:')) {
          if(link.getAttribute('target') !== '_blank'){
            link.setAttribute('target', '_blank');
          } 
          if(link.getAttribute('rel') !== 'nofollow noopener noreferrer'){
            link.setAttribute('rel', 'nofollow noopener noreferrer');
          }
        }
      });
    };
    updateLinks();
    const observer = new MutationObserver(updateLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
};
export default useExternalLinks;