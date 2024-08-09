"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useRefreshPageLink = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a');
      if (anchor && anchor.getAttribute('href')) {
        const href = anchor.getAttribute('href');
        if (href.startsWith('/') || href.startsWith(window.location.origin)) {
          event.preventDefault();
          router.push(href);
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [router]);
};

export default useRefreshPageLink;