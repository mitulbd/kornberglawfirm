"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies
import Image from 'next/image';
import Favicon from "@/app/assets/images/favicon.png"

const DownloadPwa = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);  

  useEffect(() => {
    const checkInstalled = async () => {
      const isIosStandalone = window.navigator.standalone;
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsInstalled(isIosStandalone || isStandalone);
      console.log("isStandalone "+isStandalone)
    };

    const handleBeforeInstallPrompt = (event) => {
      console.log("beforeinstallprompt event fired and handled");
      event.preventDefault();
      setDeferredPrompt(event);
      setIsSupported(true);
    };

    checkInstalled();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', checkInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', checkInstalled);
    };
  }, []);

  useEffect(() => {
    if (!isInstalled && isSupported) {
      const lastDismissal = Cookies.get('lastDismissal');
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastDismissal || Date.now() - Number(lastDismissal) > oneDay) {
        const timeout = setTimeout(() => {
          setIsVisible(true);
        }, 5000);

        return () => clearTimeout(timeout);
      }
    }
  }, [isInstalled, isSupported]);

  const handleDownload = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    } else {
      window.location.href = '/install';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    Cookies.set('lastDismissal', Date.now(), { expires: 1 });
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      <div id="liveToast" className={isVisible === true ?"show" : null}>
        <div className='d-flex'>
          <div className='flex-shrink-0'>
            <Image src={Favicon} alt="Howard Kornberg" width={90} height={90} />
          </div>
          <div className='flex-grow-1 ms-3'>
            <div className='d-flex'>
              <div className='flex-grow-1'><p>Download the Howard’s Law Office app.</p></div>
              <div className='flex-shrink-0'><button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button></div>
            </div>
            <div className="mt-1 pt-1 border-top">
              <button type="button" className="btn btn-primary btn-sm" onClick={handleDownload}>Download App</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadPwa;
