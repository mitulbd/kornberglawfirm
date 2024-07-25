"use client"
import{useEffect, useState, useRef } from 'react';
import{register } from 'swiper/element/bundle';
import Image from "next/image";
import prevArrow from "../assets/images/icon-arrow-left.svg";
import nextArrow from "../assets/images/icon-arrow-right.svg";

register();
export default function CaseSlider() {
  const [cases, setCases] = useState();
  const swiperContainerRef = useRef(null);
  async function fetchCases() {
    try {
      const response = await fetch('https://kornberglawfirm.com/wp-json/acf/v2/options?_fields=result_blocks', {next:{revalidate:3600}})
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
          slidesPerView:6,
          spaceBetween:20,
          loop:true,
          breakpoints:{
            320:{slidesPerView:1, },
            480:{slidesPerView:2, },
            576:{slidesPerView:3, },
            991:{slidesPerView:4, },
            1024:{slidesPerView:6, }
          },
          navigation:{nextEl:'.cases-next', prevEl:'.cases-prev', }
        });
        swiperEl.initialize();
      }
    }
  }, [cases]);

  const processCaseAmount = (homeCaseAmt) => {
    const finalVal = parseFloat(homeCaseAmt.replace(/[^0-9.]/g, ''));
    let sortVal;  
    if (finalVal >= 1000000000) {
      const absVal = finalVal / 1000000000;
      const roundVal = Math.round(absVal * 100) / 100;
      sortVal = `${roundVal}B`;
    } else if (finalVal >= 1000000) {
      const absVal = finalVal / 1000000;
      const roundVal = Math.round(absVal * 100) / 100;
      sortVal = `${roundVal}M`;
    } else if (finalVal >= 1000) {
      const absVal = finalVal / 1000;
      const roundVal = Math.round(absVal * 100) / 100;
      sortVal = `${roundVal}K`;
    } else {
      sortVal = Math.round(finalVal * 100) / 100;
    }  
    return sortVal;
  };

  return (
    <section className="home-cases-slider-sec">
      <div className="container">
        <div className="home-cases-slider-container">
          <Image src={prevArrow} alt="Previous" width={prevArrow.width} height={prevArrow.height} className="cases-prev" />
          <div className="swiper-wrapper">
            <swiper-container init="false" ref={swiperContainerRef} class="home-cases-slider">
              {cases?.map((data, index) => (
                <swiper-slide key={index} class="home-case-item swiper-slide">
                  <div className="home-case-amt">
                    ${processCaseAmount(data.block_amount)}
                  </div>
                  {data.block_title}
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
          <Image src={nextArrow} width={nextArrow.width} height={nextArrow.height} alt="Next" className="cases-next" />
        </div>
      </div>
    </section>
  );
}