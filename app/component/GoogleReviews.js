"use client"
import { useEffect, useState, useRef} from 'react';
import { register } from 'swiper/element/bundle';
import Image from "next/image";
import prevArrow from "../assets/images/arrow-prev.svg";
import nextArrow from "../assets/images/arrow-next.svg";
import stars from "../assets/images/rating-star.svg";
import postedGoogle from "../assets/images/posted-on-google.svg";

register();
export default function Reviews() {
  const [testimonials, setTestimonials] = useState([]);
  const swiperContainerRef = useRef(null);

  async function fetchTestimonials() {
    try {
      const response = await fetch('https://kornberglawfirm.com/wp-json/acf/v2/options?_fields=google_review_slider', {next:{revalidate:3600}});
      const data = await response.json();
      if (data) {
        setTestimonials(data.google_review_slider);
      } else {
        console.error('No testimonials data found');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  } 
  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {    
    if (testimonials.length > 0) {
      const swiperEl = swiperContainerRef.current;
      if (swiperEl) {
        Object.assign(swiperEl, {        
          spaceBetween:8,
          loop:true,
          navigation:{
            nextEl:".button-next",
            prevEl:".button-prev",
          },
          breakpoints:{
            320:{slidesPerView:1,},
            768:{slidesPerView:2,},
            992:{slidesPerView:3,},
            1199:{slidesPerView:4,}
          }
        });
        swiperEl.initialize();
      }
    }
  }, [testimonials]);

  return (
    <div className="testimonials">
      <div className="swiper-wrapper">
        <div className="testimonials">
          <swiper-container init="false" ref={swiperContainerRef} class="testimonials-swiper">
            {testimonials.map((data, index) => (
              <swiper-slide key={index} class="testimonial-block swiper-slide">
                <div className="testimonial-name">
                  <div className="test-name-icon">{data.testimonial_name.substring(0, 1)}</div>
                  <div className="test-name">
                    <div className="test-name-rating">
                      <Image src={stars} width={100} height={18} alt="rating star"/>
                      <span className="testimonials-post-date"> {data.testimonial_date}</span>
                    </div>
                  </div>
                </div>
                <div className="testimonials-text">
                  {data.testimonial_text.length > 70 ? data.testimonial_text.substring(0, 70) + '...' : data.testimonial_text}
                  {/*<br/><Link className="link-stretched" title="Read more" href={data.review_read_more_link} target="_blank" rel="noopener noreferrer nofollow">Read more</Link>*/}
                </div>
                <span className="google-icon"><Image src={postedGoogle} width={102} height={30} alt="google"/></span>
              </swiper-slide>
            ))}
          </swiper-container>
          <div className="testi-arrow-icon button-next"><Image width={10} height={10} alt="Next Arrow" className="svg" src={nextArrow}/></div>
          <div className="testi-arrow-icon button-prev"><Image width={10} height={10} alt="Previous Arrow" className="svg" src={prevArrow}/></div>
        </div>
      </div>
    </div>
  );
}