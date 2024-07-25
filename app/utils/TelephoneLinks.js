"use client"
import { useEffect } from 'react';

const useTelephoneLinks = () => {
  useEffect(() => {
    const updateTelephoneLinks = () => {
      const telLinks = document.querySelectorAll('a[href^="tel:"]');
      telLinks.forEach(link => {
        const telNumber = link.getAttribute('href').slice(4).trim();
        link.setAttribute('data-other', '1');
        link.setAttribute('title', telNumber);
        link.setAttribute('onclick', `gtag('event', 'Clicked to Call ${telNumber}', { 'event_category' : 'Phone Number (${telNumber})' });`);
      });
    };
    updateTelephoneLinks();
    const observer = new MutationObserver(updateTelephoneLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
};
export default useTelephoneLinks;