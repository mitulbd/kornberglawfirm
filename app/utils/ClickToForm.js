"use client"
import { useEffect } from 'react';
const useClickToForm = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll('[href="#contact-form"]');
    buttons.forEach(button => {
      button.addEventListener('click', handleClick);
    });
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, []);

  const handleClick = () => {
    const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  };

};
export default useClickToForm;