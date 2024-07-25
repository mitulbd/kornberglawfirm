import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";
import Image from "next/image";
import Link from "next/link";
import {replaceBaseUrl} from "@/app/utils/urlUtils";

export async function generateMetadata(posttype, slug) {
  const meta = await MetaData(posttype = "pages", slug = "about");
  if (meta) { return meta; }
  else { console.error('Metadata not found'); return {}; }
};

export default async function About() {
  const [[aboutApi], cases, practiceAreas] = await Promise.all([
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=about&_fields=acf', {next:{revalidate:3600 }}).then(res => res.json()),
    fetch('https://kornberglawfirm.com/wp-json/acf/v2/options?_fields=result_blocks', {next:{revalidate:3600 }}).then(res => res.json()),
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/practice-area?area-cat=231&_fields=id,title,link,yoast_head_json.og_image&per_page=6', {next:{revalidate:3600 }}).then(res => res.json()),
  ]);
  const aboutAcf = aboutApi.acf;
  return (
    <>
      <section className="about-banner">
        <div className="container">
          <Breadcrumbs pageName="About" />
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row align-items-end">
                {aboutAcf?.about_banner_content &&
                  <div className="col-md-8">
                    <div className="about-banner-content" dangerouslySetInnerHTML={{ __html: aboutAcf?.about_banner_content }} />
                  </div>
                }
                <div className="col-md-4">
                  {aboutAcf.about_banner_bg_image &&
                    <Image className="about-banner-img" src={aboutAcf.about_banner_bg_image?.url} alt={aboutAcf.about_banner_bg_image?.alt} width={aboutAcf.about_banner_bg_image?.width} height={aboutAcf.about_banner_bg_image?.height} priority={true} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="track-record-sec">
        <div className="container">
          <div className="track-record-title">
            {aboutAcf.tmain_title &&
              <div className="h3">{aboutAcf.tmain_title}</div>
            }
            {aboutAcf.sub_yellow_title &&
              <h2>{aboutAcf.sub_yellow_title}</h2>
            }
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row timeline">
                <div className="col-md-1 timeline-center-col order-md-2">
                  {aboutAcf.timeline_year &&
                    <strong className="timeline-year">{aboutAcf.timeline_year}</strong>
                  }
                  <span className="timeline-line"></span>
                </div>
                <div className="col-md order-md-1">
                  <div className="award-icon">
                    {aboutAcf.award_icon &&
                      <Image src={aboutAcf.award_icon?.url} alt={aboutAcf.award_icon?.alt} width={aboutAcf.award_icon?.width} height={aboutAcf.award_icon?.height} />
                    }
                  </div>
                  <div className="row awards-logos justify-content-center">
                    {aboutAcf.awards_logos &&
                      aboutAcf.awards_logos?.map((data, index) => (
                        <div className="col-6" key={index}>
                          <div className="awards-logo">
                            <Image src={data.alogo_image?.url} alt={data.alogo_image?.alt} width={data.alogo_image?.width} height={data.alogo_image?.height} />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                {aboutAcf.timeline_right_content &&
                  <div className="col-md order-md-3" dangerouslySetInnerHTML={{ __html: aboutAcf.timeline_right_content }} />
                }
              </div>
              <div className="row timeline">
                {aboutAcf.timeline_year2 &&
                  <div className="col-md-1 timeline-center-col order-md-2">
                    <strong className="timeline-year">{aboutAcf.timeline_year2}</strong>
                    <span className="timeline-line"></span>
                  </div>
                }
                <div className="col-md order-md-1" dangerouslySetInnerHTML={{ __html: aboutAcf.timeline_left_content }} />
                {aboutAcf.timeline_right_image &&
                  <div className="col-md order-md-3">
                    <Image className="timeline-2018" src={aboutAcf.timeline_right_image?.url} alt={aboutAcf.timeline_right_image?.alt} width={aboutAcf.timeline_right_image?.width} height={aboutAcf.timeline_right_image?.height} />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-recent-cases-sec">
        <div className="container">
          <h4 className="about-recent-cases-title">Recent Case Results</h4>
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row">
                {cases.result_blocks &&
                  cases.result_blocks?.slice(0, 3).map((data, index) => (
                    <div key={index} className="col-md-4">
                      <div className="case-block">
                        <div className="case-block-top">
                          <div className="h3">{data.block_amount}</div>
                          <p>{data.block_title}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              {aboutAcf.view_more_text &&
                <a className="load-more" href={aboutAcf.view_more_link}>{aboutAcf.view_more_text}</a>
              }
            </div>
          </div>
        </div>
      </section>
      <section className="about-personal-injury personal-injury-sec">
        <div className="container">
          <h3>PERSONAL INJURY LAW</h3>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="row g-0 practice-areas-list">
                {practiceAreas?.map(data => (
                  <div key={data.id} className="col-sm-6 col-lg-4">
                    <div className="practice-area-block">
                      {data.yoast_head_json.og_image ? <Image src={data.yoast_head_json.og_image?.[0].url} alt={data.title?.rendered} width={data.yoast_head_json.og_image?.[0].width} height={data.yoast_head_json.og_image?.[0].height} /> : <Image src={practiceAreaPleaceholder} alt="Practice Area" width={practiceAreaPleaceholder.width} height={practiceAreaPleaceholder.height} />}
                      <div className="practice-area-content">
                        <div className="practice-area-content-center">
                          <h6>{data.title?.rendered}</h6>
                          <Link className="stretched-link" href={replaceBaseUrl(data.link)}>DISCOVER More</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link className="load-more" href="/practice-areas/">View Practice Areas</Link>
        </div>
      </section>
    </>
  );
}