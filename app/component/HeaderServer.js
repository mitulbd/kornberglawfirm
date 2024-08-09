import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MenuServer from './Menu';
import Searchbar from './Searchbar';
import iconPhone from '@/app/assets/images/icon-phone.svg';

async function fetchOptions() {
  const response = await fetch('https://kornberglawfirm.com/wp-json/acf/v2/options', { next: { revalidate: 3600 } });
  const data = await response.json();
  return data;
}

export default async function HeaderServer() {
  const options = await fetchOptions();
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {options.site_logo && (
            <Link className="navbar-brand" href="/">
              <Image src={options.site_logo.url} width={288} height={48} alt={options.site_logo.alt} loading="eager" />
            </Link>
          )}
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <MenuServer menuId="main-menu" />
            <div className="navbar-text">
              {options.phone_no && (
                <Link className="header-call" href={`tel:${options.phone_no}`}>
                  <Image className="svg" src={iconPhone} decoding="async" width="28" height="28" alt="Call Konberg Law Firm" title="Call Konberg Law Firm" />
                  <span>{options.phone_no}</span>
                </Link>
              )}
              <Searchbar />
            </div>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" aria-label="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div className="offcanvas offcanvas-start" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
        <div className="offcanvas-header" data-bs-theme="dark">
          <div className="offcanvas-title" id="staticBackdropLabel">Menu</div>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body"><MenuServer menuId="mobile-menu" /></div>
      </div>
    </>
  );
}