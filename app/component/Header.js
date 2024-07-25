"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Menu from './Menu';
import Searchbar from './Searchbar';
import iconPhone from '@/app/assets/images/icon-phone.svg';
import useReplaceSvgImages from '../utils/ReplaceSvgImages';
import useLocalUrls from '../utils/useLocalUrls';
import useTelephoneLinks from '../utils/TelephoneLinks';
import useMailtoLinks from '../utils/Mailtolinks';
import useExternalLinks from '../utils/ExternalLinks';
import useImageAttributes from '../utils/ImageAttributes';

export default function Header() {
  const [headerFixed, setHeaderFixed] = useState(false);
  const [options, setOptions] = useState([]);
  const pathname = usePathname();

  const getOptions = async () => {
    try {
      const response = await fetch('https://kornberglawfirm.com/wp-json/acf/v2/options', {next:{revalidate:3600}});
      const responseData = await response.json();
      if (responseData) {
        setOptions(responseData);
      } else {
        console.error('No options found');
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const changeHeaderFixed = () => {
    if (window.scrollY >= 70) { setHeaderFixed(true); }
    else { setHeaderFixed(false); }
  };

  useEffect(() => {
    require("bootstrap/js/dist/offcanvas");
    require("bootstrap/js/dist/collapse");
    require("bootstrap/js/dist/tab");
    getOptions();
    window.addEventListener('scroll', changeHeaderFixed);
  }, []);
  
  useReplaceSvgImages();
  useLocalUrls();
  useTelephoneLinks();
  useMailtoLinks();
  useExternalLinks();  
  useImageAttributes();

  return (
    <>
      {pathname !== '/web-stories/understanding-car-accidents-lessons-responses-and-representation/' && <>
        <header className={headerFixed ? 'header-fix' : ''}>
          <nav className="navbar navbar-expand-lg">
            <div className="container">
              {options.site_logo && <Link className="navbar-brand" href="/"> <Image src={options.site_logo?.url} width={288} height={48} alt={options.site_logo.alt} /></Link>}
              <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <Menu menuId="main-menu" />
                <div className="navbar-text">
                  {options.phone_no && <Link className="header-call" href={`tel:${options.phone_no}`}><Image className="svg" src={iconPhone} decoding="async" width="28" height="28" alt="Call Konberg Law Firm" title="Call Konberg Law Firm" /><span>{options.phone_no}</span></Link>}
                  <Searchbar />
                </div>
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" aria-label="navbar-toggler"><span className="navbar-toggler-icon"></span></button>
            </div>
          </nav>
        </header>
        <div className="offcanvas offcanvas-start" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header" data-bs-theme="dark">
            <div className="offcanvas-title" id="staticBackdropLabel">Menu</div>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body"><Menu menuId="mobile-menu" /></div>
        </div>        
      </>
      }
    </>
  );
}