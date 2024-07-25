"use client"
import { useEffect, useState, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import Image from "next/image";
import arrowPrev from "@/app/assets/images/arrow-prev.svg";
import arrowNext from "@/app/assets/images/arrow-next.svg";

register();
export default function HomeBottomResult() {
  const [cases, setCases] = useState();
  const swiperContainerRef = useRef(null);
  async function fetchCases() {
    try {
      const response = await fetch('https://kornberglawfirm.com/wp-json/acf/v2/options?_fields=result_blocks', {next:{revalidate:3600 }})
      const data = await response.json();
      if (data) {
        setCases(data.result_blocks);
      } else {
        console.error('No Cases found');
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  }
  useEffect(() => {
    fetchCases();
  }, []);

  useEffect(() => {
    if (cases?.length > 0) {
      const swiperEl = swiperContainerRef.current;
      if (swiperEl) {
        Object.assign(swiperEl, {
          spaceBetween: 24,
          loop: true,
          navigation: { nextEl: ".la-button-next", prevEl: ".la-button-prev", },
          breakpoints: {
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
          }
        });
        swiperEl.initialize();
      }
    }
  }, [cases]);

  return (
    <div className="la-pi-blocks">
      <swiper-container init="false" ref={swiperContainerRef} class="swiper-wrapper">
        {cases?.map((data, index) => (
          <swiper-slide key={index} class="la-pi-block swiper-slide">
            <h3>{data.block_amount}</h3>
            <p>{data.block_title}</p>
          </swiper-slide>
        ))}
      </swiper-container>
      <div className="la-pi-arrows">
        <div className="la-button la-button-prev"><Image src={arrowPrev} alt="arrow prev" width={arrowPrev.width} height={arrowPrev.height} /></div>
        <div className="la-button la-button-next"><Image src={arrowNext} alt="arrow next" width={arrowNext.width} height={arrowNext.height} /></div>
      </div>
    </div>
  );
}

