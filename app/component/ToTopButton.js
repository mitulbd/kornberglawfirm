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

export default ToTopButton;