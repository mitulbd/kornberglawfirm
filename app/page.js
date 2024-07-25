import Image from "next/image";
import Link from 'next/link';
import { replaceBaseUrl } from "@/app/utils/urlUtils";
import Reviews from "@/app/component/GoogleReviews";
import RatinStar from "@/app/assets/images/rating-star.svg";
import CaseSlider from "@/app/component/CasesSlider";
import practiceAreaPleaceholder from "@/app/assets/images/car-accident.png";
import iconCheck from "@/app/assets/images/icon-check.svg";
import HomeBottomResult from "@/app/component/HomeCaseSlider";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype,slug) {
  const meta = await MetaData(posttype="pages", slug="home");
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default async function Home() {
  const [[homeApi], practiceFields, postList] = await Promise.all([
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=home&_fields=acf', {next:{revalidate:3600 }}).then(res => res.json()),
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/practice-area?area-cat=231&_fields=id,title,link,yoast_head_json.og_image&per_page=6', {next:{revalidate:3600 }}).then(res => res.json()),
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/posts/?_fields=link,title&per_page=3', {next:{revalidate:3600 }}).then(res => res.json())
  ]);
  const homeAcf = homeApi.acf;

  return (
    <>
      <section className="home-banner">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row">
                {homeAcf.banner_title_content &&
                  <div className="col-md-7 home-title-content" dangerouslySetInnerHTML={{ __html: homeAcf.banner_title_content }} />
                }
                <div className="col-md-5">
                  <div className="home-banner-photo">
                    {homeAcf.home_banner_photo &&
                      <Image className="att_photo" src={homeAcf.home_banner_photo?.url} alt={homeAcf.home_banner_photo?.alt} width={434} height={557} title={homeAcf.home_banner_photo?.title}  />
                    }
                    {homeAcf.home_banner_photo_name &&
                      <div className="home-banner-photo-name" dangerouslySetInnerHTML={{ __html: homeAcf.home_banner_photo_name }} />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {homeAcf.home_background_image &&
          <div className="home-banner-bg">
            <Image src={homeAcf.home_background_image.url} width={1903} height={693} alt={homeAcf.home_background_image.alt} priority={true} />
          </div>
        }
      </section>
      <section className="home-top-review">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <Image src={RatinStar} width={140} height={25} alt="Rating Star" />
              {homeAcf.home_top_review_text &&
                <div className="home-top-review-content" dangerouslySetInnerHTML={{ __html: homeAcf.home_top_review_text }} />
              }
              <div className="home-top-review-posted">
                <div className="home-top-review-by">
                  {homeAcf.user_photo &&
                    <div className="home-top-review-by-icon">
                      <Image src={homeAcf.user_photo?.url} alt={homeAcf.user_photo?.alt} width={homeAcf.user_photo?.width} height={homeAcf.user_photo?.height} />
                    </div>
                  }
                  <span className="home-top-review-by-text">
                    {homeAcf.user_name},<br />
                    {homeAcf.review_date}
                  </span>
                </div>
                <div className="home-top-review-on-google">
                  {homeAcf.google_review_link && homeAcf.google_review_link && (
                    <>
                      {/*<Link href={homeAcf.google_review_link} target="_blank" rel="noreferrer noopener nofollow">*/}
                        <Image src={homeAcf.review_on_google_image.url} alt={homeAcf.review_on_google_image.alt} width={93} height={32} />
                      {/*</Link>*/}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CaseSlider />
      <section className="personal-injury-sec">
        <div className="container">
          <h3>PERSONAL INJURY LAW</h3>
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row g-0 practice-areas-list">
                {practiceFields?.map(data => (
                  <div key={data.id} className="col-sm-6 col-lg-4">
                    <div className="practice-area-block">
                      {data.yoast_head_json.og_image ? <Image src={data.yoast_head_json.og_image?.[0].url} alt={data.title?.rendered} width={345} height={330} /> : <Image src={practiceAreaPleaceholder} alt="Practice Area" width={practiceAreaPleaceholder.width} height= {practiceAreaPleaceholder.height} />}
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
        </div>
      </section>
      <section className="ethicle-sec">
        <div className="container">
          <div className="ethicle-sec-title">
            {homeAcf.ethicle_sec_title_top &&
              <div className="ethicle-sec-title-top" dangerouslySetInnerHTML={{ __html: homeAcf.ethicle_sec_title_top }} />
            }
            {homeAcf.ethicle_sec_title &&
              <h2>{homeAcf.ethicle_sec_title}</h2>
            }
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              {homeAcf.ethical_image &&
                <Image src={homeAcf.ethical_image?.url} alt={homeAcf.ethical_image?.alt} width={1076} height={422} />
              }
            </div>
          </div>
        </div>
      </section>
      <section className="home-awards-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row">
                <div className="col-md-6">
                  {homeAcf.ethical_content_left &&
                    <div className="ethicle-content-left" dangerouslySetInnerHTML={{ __html: homeAcf.ethical_content_left }} />
                  }
                </div>
                {homeAcf.ethical_content_right &&
                  <div className="col-md-6 ethicle-content-right" dangerouslySetInnerHTML={{ __html: homeAcf.ethical_content_right }} />
                }
              </div>
            </div>
          </div>
          <div className="home-awards">
            {homeAcf.awards_left_logo &&
              <div className="home-awards-left-logo">
                <Image src={homeAcf.awards_left_logo?.url} alt={homeAcf.awards_left_logo?.alt} width={homeAcf.awards_left_logo?.width} height={homeAcf.awards_left_logo?.height} />
              </div>
            }
            <div className="row awards-logos justify-content-center">
              {homeAcf.awards_logos_rpt?.map(data => (
                <div key={data.award_logo.id} className="col-6 col-sm-4 col-md-3">
                  <div className="awards-logo">
                    <Image src={data.award_logo?.url} alt={data.award_logo?.alt} title={data.award_logo?.title} width={data.award_logo?.width} height={data.award_logo?.height} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="specializes-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="specializes-sec-title">
                {homeAcf.specializes_main_title &&
                  <div className="h3">{homeAcf.specializes_main_title}</div>
                }
                {homeAcf.specializes_sub_title &&
                  <h2>{homeAcf.specializes_sub_title}</h2>
                }
                {homeAcf.sheading_title &&
                  <div className="h3">{homeAcf.sheading_title}</div>
                }
              </div>
              <div className="row">
                <div className="col-lg-8">
                  {homeAcf.white_text_content && <div dangerouslySetInnerHTML={{ __html: homeAcf.white_text_content }} />}
                  {homeAcf.primary_text_content && <div dangerouslySetInnerHTML={{ __html: homeAcf.primary_text_content }} />}
                  {homeAcf.primary_button_link && homeAcf.primary_button_text &&
                    <a className="btn btn-primary" href={homeAcf.primary_button_link}>{homeAcf.primary_button_text}</a>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonials-sec">
        <div className="container">
          <Reviews />
          {homeAcf.why_choose_content &&
            <div className="why-choose-top-block">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="why-choose-title" dangerouslySetInnerHTML={{ __html: homeAcf.why_choose_content }} />
                </div>
              </div>
            </div>
          }
        </div>
      </section>
      <section className="why-choose">
        <div className="container">
          <div className="row">
            {homeAcf.why_choose_block_rpt?.map((data, index) => (
              <div key={index} className="col-md-4">
                <div className="why-choose-block">
                  <span className="why-block-check"><Image src={iconCheck} alt="icon-check" /></span>
                  <div dangerouslySetInnerHTML={{ __html: data.why_choose_block_content }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {homeAcf.why_choose_bg_image &&
          <Image className="why-choose-bg" src={homeAcf.why_choose_bg_image?.url} alt={homeAcf.why_choose_bg_image?.alt} width={homeAcf.why_choose_bg_image?.width} height={homeAcf.why_choose_bg_image?.height} />
        }
        <div className="container why-sec-review">
          <div className="row justify-content-center why-sec-review-block">
            <div className="col-10 col-xxl-10">
              {homeAcf.review_block_quote_icon &&
                <span className="why-review-quote-icon"><span><Image src={homeAcf.review_block_quote_icon?.url} alt={homeAcf.review_block_quote_icon?.alt} width={65} height={53} /></span></span>
              }
              <div className="row justify-content-center why-review-content">
                <div className="col-xlx-10">
                  {homeAcf.review_block_quote_text &&
                    <div dangerouslySetInnerHTML={{ __html: homeAcf.review_block_quote_text }} />
                  }
                  {homeAcf.reviewer_name &&
                    <p>-{homeAcf.reviewer_name}</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trial-lawyer-sec">
        <div className="container">
          {homeAcf.trial_title_content &&
            <div className="zigzag-title why-choose-title" dangerouslySetInnerHTML={{ __html: homeAcf.trial_title_content }} />
          }
        </div>
        <div className="container trial-lawyer-bg">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-md-5">
                  {homeAcf.trail_lawyer_image &&
                    <Image className="trial-lawyer-img" src={homeAcf.trail_lawyer_image?.url} alt="trial lawyer img" width={homeAcf.trail_lawyer_image?.width} height={homeAcf.trail_lawyer_image?.height} />
                  }
                </div>
                {homeAcf.trial_lawyer_content &&
                  <div className="col-md-7 trial-lawyer-content" dangerouslySetInnerHTML={{ __html: homeAcf.trial_lawyer_content }} />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="la-pi-sec">
        <div className="container">
          {homeAcf.la_pi_section_title &&
            <div className="row la-pi-sec-title">
              <div className="col-md-1"><hr /></div>
              <div className="col-md-10">{homeAcf.la_pi_section_title}</div>
              <div className="col-md-1"><hr /></div>
            </div>
          }
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div dangerouslySetInnerHTML={{ __html: homeAcf.la_pi_center_content }} />
              <HomeBottomResult />
            </div>
          </div>
        </div>
      </section>
      <section className="committed-sec">
        <div className="container">
          <div className="committed-title" dangerouslySetInnerHTML={{ __html: homeAcf.committed_title_content }} />
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row">
                <div className="col-lg-6" dangerouslySetInnerHTML={{ __html: homeAcf.committed_item_content }} />
                <div className="col-lg-6">
                  <div className="committed-img-blcok">
                    {homeAcf.committed_image &&
                      <Image src={homeAcf.committed_image?.url} alt={homeAcf.committed_image?.alt} width={homeAcf.committed_image?.width} height={homeAcf.committed_image?.height} />
                    }
                    {homeAcf.committed_founder_name &&
                      <div className="committed-img-name" dangerouslySetInnerHTML={{ __html: homeAcf.committed_founder_name }} />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="latest-blog-sec">
        <div className="container">
          {homeAcf.latest_blog_section_bg_image &&
            <Image className="blog-bg" src={homeAcf.latest_blog_section_bg_image?.url} alt={homeAcf.latest_blog_section_bg_image?.alt} width={homeAcf.latest_blog_section_bg_image?.width} height={homeAcf.latest_blog_section_bg_image?.height} />
          }
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              {homeAcf.latest_blog_section_title &&
                <h3>{homeAcf.latest_blog_section_title}</h3>
              }
              {postList.length > 0 ? (
                <div className="row">
                  {postList.map((data, index) => (
                    <div key={index} className="col-md-4">
                      <div className="blog-block">
                        <h6>{data.title?.rendered}</h6>
                        <a href={data.link} className="btn btn-primary btn-sm stretched-link">VIEW POST</a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="blog-block align-items-center"><h6>No Found blog post.</h6></div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}