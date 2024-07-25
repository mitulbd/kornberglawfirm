import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";
import Image from "next/image";
import Link from "next/link";
import { replaceBaseUrl } from "@/app/utils/urlUtils";

export async function generateMetadata(posttype, slug) {
  const meta = await MetaData(posttype = "pages", slug = "howard-c-kornberg");
  if (meta) { return meta; }
  else { console.error('Metadata not found'); return {}; }
};

export default async function KornbergPage() {
  const [[kornbergApi], cases, practiceAreas] = await Promise.all([
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=howard-c-kornberg&_fields=acf', {next:{revalidate:3600 }}).then(res => res.json()),
    fetch('https://kornberglawfirm.com/wp-json/acf/v2/options?_fields=result_blocks', {next:{revalidate:3600 }}).then(res => res.json()),
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/practice-area?area-cat=231&_fields=id,title,link,yoast_head_json.og_image&per_page=6', {next:{revalidate:3600 }}).then(res => res.json()),
  ]);
  const kornbergAcf = kornbergApi.acf;
  return (
    <>
      <section className="howard-page-sec">
        <div className="container">
          <Breadcrumbs pageName="Howard C. Kornberg" />
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row">
                <div className="col-md-7">
                  {kornbergAcf.banner_title_text &&
                    <div className="h3" dangerouslySetInnerHTML={{ __html: kornbergAcf.banner_title_text }} />
                  }
                  {kornbergAcf.banner_yellow_text &&
                    <h1 dangerouslySetInnerHTML={{ __html: kornbergAcf.banner_yellow_text }} />
                  }
                </div>
                <div className="col-md-5">
                  {kornbergAcf.banner_howard_img &&
                    <Image className="howard-banner-img" src={kornbergAcf.banner_howard_img?.url} alt={kornbergAcf.banner_howard_img?.alt} width={kornbergAcf.banner_howard_img?.width} height={kornbergAcf.banner_howard_img?.height} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-awards-sec howard-awards-sec">
        <div className="container">
          {kornbergAcf.howard_awards_content &&
            <div className="row justify-content-center">
              <div className="col-xl-10" dangerouslySetInnerHTML={{ __html: kornbergAcf.howard_awards_content }} />
            </div>
          }
          <div className="home-awards">
            {kornbergAcf.awards_left_logo &&
              <div className="home-awards-left-logo">
                <Image src={kornbergAcf.awards_left_logo?.url} alt={kornbergAcf.awards_left_logo?.alt} width={kornbergAcf.awards_left_logo?.width} height={kornbergAcf.awards_left_logo?.height} />
              </div>
            }
            <div className="row awards-logos justify-content-center">
              {kornbergAcf.hp_awards_logos &&
                kornbergAcf.hp_awards_logos?.map((data, index) => (
                  <div key={index} className="col-6 col-sm-4 col-md-3">
                    <div className="awards-logo">
                      <Image src={data.hp_award_logo?.url} alt={data.hp_award_logo?.alt} width={data.hp_award_logo?.width} height={data.hp_award_logo?.height} />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
      <section className="personal-injury-sec">
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
              <Link className="load-more mt-5" href="/practice-areas/">View Practice Areas</Link>

            </div>
          </div>

        </div>
      </section>
      <section className="la-pi-sec pt-0 la-pi-howard">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              {kornbergAcf.recent_case_title &&
                <h3>{kornbergAcf.recent_case_title}</h3>
              }
              <div dangerouslySetInnerHTML={{__html:kornbergAcf.case_results_descripton}} />
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
              <Link className="load-more" href="/case-results/">View More Results</Link>
              <br /><br />
              <div dangerouslySetInnerHTML={{__html:kornbergAcf.howard_bottom_content}} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}