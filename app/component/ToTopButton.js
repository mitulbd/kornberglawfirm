'use client';
import { useEffect } from 'react';
import iconTopArrow from "@/app/assets/images/icon-top-arrow.svg";
import Image from 'next/image';

const ToTopButton = () => {
  useEffect(() => {
    const handleScrollToTop = (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const button = document.getElementById('toTop');
    button.addEventListener('click', handleScrollToTop);

    return () => {
      button.removeEventListener('click', handleScrollToTop);
    };
  }, []);

  return (
    <div id="toTop"><Image src={iconTopArrow} alt="Top Icon" title={iconTopArrow.title} width={iconTopArrow.width} height={iconTopArrow.height} /></div>
  );
};

const buttonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ToTopButton;
