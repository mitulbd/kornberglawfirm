"use client";
import { useEffect, useState } from 'react';
import Script from 'next/script';
import Loading from '@/app/component/Loading';

const WebStoryCode = () => {
  const [storyContent, setStoryContent] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    fetch('https://kornberglawfirm.com/wp-json/web-stories/v1/web-story/15058/?_fields=content', {next:{revalidate:3600}})
      .then(response => response.json())
      .then(data => {
        let htmlData = data.content.rendered.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br\s*\/?>/gi,'');
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(htmlData, 'text/html');
        const ampStoryElement = htmlDocument.querySelector('amp-story');
        const ampCss = htmlDocument.querySelectorAll('style');
        const ampLinkStyle = htmlDocument.querySelectorAll('link[rel="stylesheet"]');

        if (ampStoryElement) {
          // Remove <html> tag if present
          ampStoryElement.querySelectorAll('html').forEach(el => el.remove());

          ampCss.forEach(style => {
            const styleElement = document.createElement('style');
            styleElement.innerHTML = style.innerHTML;
            document.head.appendChild(styleElement);
          });
          
          ampLinkStyle.forEach(link => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = link.href;
            document.head.appendChild(linkElement);
          });

          const ampStoryHtml = ampStoryElement.outerHTML;
          setStoryContent(ampStoryHtml);
        } else {
          console.error('No <amp-story> element found');
          setStoryContent('<p>No story content available</p>');
        }
      })
      .catch(error => console.error('Error fetching story:', error));
      const ampStoryStyle = document.createElement('style');
      ampStoryStyle.innerHTML = 'amp-story-grid-layer a{color:#000;text-decoration:none;}';
      document.head.appendChild(ampStoryStyle);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>  
     <style jsx>{`header, .offcanvas, .footer-attorney-sec, .testimonials-sec, footer, .footer-bottom, .free-consultation{display:none}`}</style>
      <Script src="https://cdn.ampproject.org/v0.js"></Script>
      <Script src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></Script>
      {storyContent ? (
        <div dangerouslySetInnerHTML={{ __html: storyContent }} />
      ) : (
        <Loading/>
      )}
      </>
  );
};

export default WebStoryCode;
