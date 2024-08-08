"use client"
import { useState, useEffect } from "react";
import Breadcrumbs from "@/app/component/Breadcrumbs";
import Image from "next/image";
import blogBg from "@/app/assets/images/blog-bg-img.webp";
import Loading from "@/app/component/Loading";

export default function FaqsCode() {
  const [faqsAcf, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [faqRes] = await Promise.all([
        fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=faqs&_fields=acf', { next: { revalidate: 3600 }}).then(res => res.json())
      ]);
      setFaqs(faqRes[0]?.acf);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <FaqComp faqsAcf={faqsAcf} />;  

  function FaqComp({ faqsAcf }) {
    const [visiblePosts, setVisiblePosts] = useState(3);
    const loadMorePosts = () => {
      setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 2);
    };

    return (
      <section className="faq-page-sec">
        <div className="container">
          <Breadcrumbs pageName="FAQ" />
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="faq-page-title">
                {faqsAcf?.faq_top_title &&
                  <div className="h3">{faqsAcf.faq_top_title}</div>
                }
                {faqsAcf?.faq_sub_title &&
                  <h1>{faqsAcf.faq_sub_title}</h1>
                }
              </div>
              <div className="faq-page-block">
                <div className="row justify-content-center">
                  <div className="col-xxl-11">
                    <div className="accordion accordion-flush" id="faqList">
                      {faqsAcf?.faqs_list_rpt.slice(0, visiblePosts).map((data, index) => (
                        <div key={index} className="accordion-item blogBox">
                          <div className="accordion-header">
                            <div className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#question${index}`} aria-expanded="false" aria-controls={`question${index}`}>{data?.fquestion}</div>
                          </div>
                          <div id={`question${index}`} className="accordion-collapse collapse" data-bs-parent="#faqList">
                            <div className="accordion-body" dangerouslySetInnerHTML={{ __html: data?.answers }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {visiblePosts < faqsAcf?.faqs_list_rpt.length && (
                <h3 id="loadMore" onClick={loadMorePosts} className="text-center">Got More Questions?</h3>
              )}
            </div>
          </div>
        </div>
        <div className="faq-page-bg">
          <Image src={blogBg} width={blogBg.width} height={blogBg.height} alt="Blog Bg" />
        </div>
      </section>
    );
  }
}
