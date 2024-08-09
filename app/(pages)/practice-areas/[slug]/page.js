import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";
import Image from "next/image";
import singlePracticeBg from "@/app/assets/images/single-practice-area-bg.webp";
import singleFeatured from "@/app/assets/images/single-practice-area.png";
import HkIcon from "@/app/assets/images/hk-icon.svg";
import SidebarSearch from "@/app/component/SidebarSearch";
import SidebarForm from "@/app/component/SidebarForm";

export async function generateMetadata({ params, posttype, slug }) {
  const meta = await MetaData(posttype = "practice-area", slug = `${params.slug}`);
  if (meta) { return meta; }
  else { console.error('Metadata not found'); return {}; }
};

export default async function SinglePractice({ params }) {
  const response = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/practice-area?slug=${params.slug}&_fields=slug,title,content,city,acf,yoast_head_json.og_image`, {next:{revalidate:3600 }});
  const [thisPost] = await response.json();
  const thisPostAcf = thisPost.acf;
  const featuredMedia = thisPost.yoast_head_json.og_image?.[0];

  const [thisCity, areaCat] = await Promise.all([
    fetch(`https://kornberglawfirm.com/wp-json/wp/v2/city/${thisPost.city}?_fields=name`, {next:{revalidate:3600 }}).then(res => res.json()),
    fetch("https://kornberglawfirm.com/wp-json/wp/v2/area-cat?_fields=id,slug,name", {next:{revalidate:3600 }}).then(res => res.json()),
  ]);

  return (
    <>
      <section className="single-practice-area-page-sec">
        <div className="practice-area-page-bg">
          <Image src={singlePracticeBg} alt="Background Image" title={singlePracticeBg?.title} width={singlePracticeBg?.width} height={singlePracticeBg?.height} loading="eager"/>
        </div>
        <div className="container">

          <Breadcrumbs pageName={thisPost.title?.rendered} pageMiddle="Practice Areas" pageMiddleslug="/practice-areas" />
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="single-practice-area-title">
                <span className="h3 text-white text-capitalize">{thisPost.city.length === 0 ? "Los Angeles" : thisCity.name}</span>
                <h1 dangerouslySetInnerHTML={{__html:thisPost.title?.rendered+" Attorney"}}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9 single-content">
              <div className="single-feature-img">
                {featuredMedia ? <Image src={featuredMedia?.url} alt={thisPost.title?.rendered} title={thisPost.title?.rendered} width={featuredMedia?.width} height={featuredMedia?.height} loading="eager" /> : <Image src={singleFeatured?.url} alt={thisPost.title?.rendered} title={thisPost.title?.rendered} width={singleFeatured?.width} height={singleFeatured?.height} loading="eager"/>}
              </div>
              {thisPost.content?.rendered && <div dangerouslySetInnerHTML={{ __html: thisPost.content?.rendered }} />}
              {thisPostAcf?.content2 && <div dangerouslySetInnerHTML={{ __html: thisPostAcf?.content2 }} />}
              {thisPostAcf?.middle_content && <div dangerouslySetInnerHTML={{ __html: thisPostAcf?.middle_content }} />}
              {thisPostAcf?.last_content && <div dangerouslySetInnerHTML={{ __html: thisPostAcf?.last_content }} />}
              {thisPostAcf?.protecting_title && <h2>{thisPostAcf?.protecting_title}</h2>}
              {thisPostAcf?.protecting_des && <div dangerouslySetInnerHTML={{ __html: thisPostAcf?.protecting_des }} />}
              {thisPostAcf?.fighting_title && <h3>{thisPostAcf?.fighting_title}</h3>}
              {thisPostAcf?.fighting_des && <div dangerouslySetInnerHTML={{ __html: thisPostAcf?.fighting_des }} />}
              {thisPostAcf?.types_of_premise_title && <h3>{thisPostAcf?.types_of_premise_title}</h3>}
              {thisPostAcf?.types_of_premise_des && <div dangerouslySetInnerHTML={{ __html: thisPostAcf?.types_of_premise_des }} />}
              {thisPostAcf?.riverside_contact_title && <h3>{thisPostAcf?.riverside_contact_title}</h3>}
              {thisPostAcf?.riverside_contact_des && <div dangerouslySetInnerHTML={{ __html: thisPostAcf?.riverside_contact_des }} />}

              {thisPostAcf?.faqs.length > 0 &&
                <>
                  <div className="faq-page-block">
                    <div className="row justify-content-center">
                      <div className="col-xxl-11">
                        <div className="accordion accordion-flush" id="faqList">
                          {thisPostAcf?.faqs.map((faq, index) => (
                            <div key={index} className="accordion-item blogBox moreBox">
                              <div className="accordion-header">
                                <div className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#question${index}`} aria-expanded="false" aria-controls={`#question${index}`}>
                                  {faq.question && <span>{faq.question}</span>}
                                </div>
                              </div>
                              <div id={`question${index}`} className="accordion-collapse collapse" data-bs-parent="#faqList">
                                <div className="accordion-body">
                                  {faq.answer && <div dangerouslySetInnerHTML={{ __html: faq.answer }} />}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              }
              <div className="line-title"><span><Image src={HkIcon} alt="HK Icon" title="HK Icon" width={HkIcon.width} height={HkIcon.height} /></span></div>
            </div>

            <div className="col-md-3 d-flex">
              <div className="sticky-sidebar">
                <div className="sidebar-block">
                  <SidebarSearch/>
                </div>
                <div className="sidebar-block">
                  <div className="sidebar-practice-btn">
                    {areaCat.reverse().map(data => (
                       <a key={data.id} href={`/practice-areas/#pills-${data.slug}`} className="btn btn-primary btn-block">
                       {data.name}
                     </a>
                    ))}
                  </div>
                </div>
                <div className="sidebar-block">
                  <div className="sidebar-form">
                    <div className="sidebar-form-title">
                      <h2>No Win,<br/>No Fee!</h2>
                      <h4>You do not pay us any of our fees unless we win or settle your case.</h4>
                      <h6>CONTACT OUR LOS ANGELES PERSONAL INJURY LAW FIRM TODAY</h6>
                    </div>
                    <SidebarForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}