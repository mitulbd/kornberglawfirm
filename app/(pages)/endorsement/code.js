"use client";
import { useState } from "react";
import Breadcrumbs from "@/app/component/Breadcrumbs";
import Image from "next/image";
import quoteIcon from "@/app/assets/images/quote-icon.svg";
import iconGoogle from "@/app/assets/images/posted-on-google.svg";
import Loading from "@/app/component/Loading";

export default function EndorsementCode({ endorsementPage, review }) {
  const [visiblePosts, setVisiblePosts] = useState(3);

  const loadMorePosts = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 2);
  };

  const formatNameInitials = (name) => {
    const names = name.split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
  };

  if (!endorsementPage || !review) {
    return <Loading />;
  }

  return (
    <>
      <section className="endorsement-page-sec">
        <div className="container">
          <Breadcrumbs pageName={endorsementPage.title?.rendered} />
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="endorsement-page-title">
                <div className="h3">{endorsementPage.acf.endorsement_top_title}</div>
                <h1>{endorsementPage.acf.endorsement_yellow_text}</h1>
                <div className="h3">{endorsementPage.acf.endorsement_sub_heading_text}</div>
              </div>
            </div>
          </div>
          <div className="endorsement-list">
            {review.slice(0, visiblePosts).map((data, index) => (
              <div key={index} className="row justify-content-center endorsement-block blogBox moreBox">
                <div className="col-xl-10">
                  <span className="endorsement-quote-icon">
                    <span><Image src={quoteIcon} width={60} height={49} alt="quote" /></span>
                  </span>
                  <div className="row justify-content-center endorsement-content">
                    <div className="col-xl-10">
                      {data.testimonial_text}
                      <div className="review-by">
                        <p>— {formatNameInitials(data.testimonial_name)} &nbsp;
                          <Image src={iconGoogle} alt="Posted on google" width={iconGoogle.width} height={iconGoogle.height} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {visiblePosts < review.length && (
            <div id="loadMore" className="loadmore-endorsement" onClick={loadMorePosts}>Load More Reviews</div>
          )}
          <div className="clearfix">&nbsp;</div>
        </div>
        {endorsementPage.acf.ebackground_image && (
          <div className="endorsement-page-bg">
            <Image src={endorsementPage.acf.ebackground_image.url} alt={endorsementPage.acf.ebackground_image.alt} width={endorsementPage.acf.ebackground_image.width} height={endorsementPage.acf.ebackground_image.height} />
          </div>
        )}
      </section>
    </>
  );
}