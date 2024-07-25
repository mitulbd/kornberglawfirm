"use client"
import { useEffect } from 'react';
const useMailtoLinks = () => {
  useEffect(() => {
    const updateMailtoLinks = () => {
      const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
      mailtoLinks.forEach(link => {
        const emailAddress = link.getAttribute('href').slice(7).trim(); // Remove "mailto:" and trim any whitespace
        link.setAttribute('data-other', '1');
        link.setAttribute('title', emailAddress);
        link.setAttribute('onclick', `gtag('event', 'Clicked to Email ${emailAddress}', { 'event_category' : 'Email (${emailAddress})' });`);
      });
    };
    updateMailtoLinks();
    const observer = new MutationObserver(updateMailtoLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
};
export default useMailtoLinks;