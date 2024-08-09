"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useReplaceSvgImages from '../utils/ReplaceSvgImages';
import useLocalUrls from '../utils/useLocalUrls';
import useTelephoneLinks from '../utils/TelephoneLinks';
import useMailtoLinks from '../utils/Mailtolinks';
import useExternalLinks from '../utils/ExternalLinks';
import useImageAttributes from '../utils/ImageAttributes';
import useClickToForm from '../utils/ClickToForm';
import useRefreshPageLink from '../utils/useRefreshPageLink';


export default function HeaderClient({ children }) {
  const [headerFixed, setHeaderFixed] = useState(false);
  const pathname = usePathname();

  const changeHeaderFixed = () => {
    if (window.scrollY >= 70) { setHeaderFixed(true); }
    else { setHeaderFixed(false); }
  };

  useEffect(() => {
    require("bootstrap/js/dist/offcanvas");
    require("bootstrap/js/dist/collapse");
    require("bootstrap/js/dist/tab");
    window.addEventListener('scroll', changeHeaderFixed);
    return () => window.removeEventListener('scroll', changeHeaderFixed);
  }, []);

  useReplaceSvgImages();
  useLocalUrls();
  useTelephoneLinks();
  useMailtoLinks();
  useExternalLinks();  
  useImageAttributes();
  useClickToForm();
  useRefreshPageLink();

  return (
    <>
      {pathname !== '/web-stories/understanding-car-accidents-lessons-responses-and-representation/' && (
        <header className={headerFixed ? 'header-fix' : ''}>
          {children}
        </header>
      )}
    </>
  );
}
