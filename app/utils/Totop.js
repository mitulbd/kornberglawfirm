"use client"
import { useEffect, useRef } from 'react';
import Image from 'next/image';

import toTopIcon from "../assets/images/to-top-icon.svg";
const ToTopButton = () => {
  const progressPathRef = useRef(null);
  useEffect(() => {
    const progressPath = progressPathRef.current;
    const pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    const updateProgress = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = 50;
      if (window.scrollY > offset) {
        document.querySelector('.to-top').classList.add('active-progress');
      } else {
        document.querySelector('.to-top').classList.remove('active-progress');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="to-top" onClick={scrollToTop}>
      <Image className="to-top-icon" src={toTopIcon} alt="Top Icon" decoding="async" width={20} height={20}/>
      <svg className="progress-circle" width="100%" height="100%" viewBox="0 0 100 100">
        <path ref={progressPathRef} d="M50,1 a49,49 0 1,1 -1,0" />
      </svg>
    </div>
  );
};
export default ToTopButton;