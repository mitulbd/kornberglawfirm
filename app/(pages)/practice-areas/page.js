import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";
import Image from "next/image";
import Link from "next/link";
import {replaceBaseUrl} from "@/app/utils/urlUtils";
import practiceAreaBg from "@/app/assets/images/practice-area-bg.webp";
import paceHolderImg from "@/app/assets/images/car-accident.png";
import ScrollToActive from "@/app/utils/ScrollToActive";

export async function generateMetadata() {
  const meta = await MetaData("pages", "practice-areas");
  if (meta) { return meta;
  } else {
    console.error('Metadata not found');
    return {};
  }
}

async function fetchAllPages(url) {
  let allPosts = [];
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const response = await fetch(`${url}&page=${page}`, {next:{revalidate:3600 }});
    const data = await response.json();
    if (response.headers.get('X-WP-TotalPages')) {
      totalPages = parseInt(response.headers.get('X-WP-TotalPages'), 10);
    }
    allPosts = [...allPosts, ...data];
    page++;
  }
  return allPosts;
}

export default async function PracticeAreas() {
  const [practiceApi, practiceAreasApi, areaCat] = await Promise.all([
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=practice-areas&_fields=acf', {next:{revalidate:3600 }}).then(res => res.json()),
    fetchAllPages('https://kornberglawfirm.com/wp-json/wp/v2/practice-area?_fields=id,title,link,yoast_head_json.og_image,area-cat&_embed&per_page=100'),
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/area-cat?_fields=id,slug,name&order=desc', {next:{revalidate:3600 }}).then(res => res.json())
  ]);

  const practiceAcf = practiceApi[0]?.acf || {};
  const practiceAreas = practiceAreasApi.filter(item => item['area-cat'] && item['area-cat'].length > 0);

  // Organize posts by area-cat
  const postsByAreaCat = {};
  practiceAreas.forEach(post => {
    post['area-cat'].forEach(cat => {
      if (!postsByAreaCat[cat]) {
        postsByAreaCat[cat] = [];
      }
      postsByAreaCat[cat].push(post);
    });
  });

  return (
    <>
      <section className="practice-area-page-sec">
        <div className="container">
          <Breadcrumbs pageName="Practice Areas" />
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              {practiceAcf.practice_area_title_content &&
                <div className="practice-area-title" dangerouslySetInnerHTML={{ __html: practiceAcf.practice_area_title_content }} />
              }
              <ul className="nav nav-pills list-unstyled practice-area-tabs" id="pills-tab" role="tablist">
                {areaCat.length > 0 && areaCat.map((term, index) => (
                  <li key={term.id} className="nav-item" role="presentation">
                    <button className={`nav-link ${index === 0 ? 'active' : ''}`} id={`pills-${term.slug}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${term.slug}`} type="button" role="tab" aria-controls={`pills-${term.slug}`} aria-selected={index === 0 ? 'true' : 'false'}>
                      {term.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="pills-tabContent">
                {areaCat.map((term, index) => (
                  <div key={term.id} className={`tab-pane fade ${index === 0 ? 'active show' : ''}`} id={`pills-${term.slug}`} role="tabpanel" aria-labelledby={`pills-${term.slug}-tab`}>
                    <div className="row g-0 practice-areas-list">
                      {postsByAreaCat[term.id] && postsByAreaCat[term.id].length > 0 ? (
                        postsByAreaCat[term.id].map(post => (
                          <div key={post.id} className="col-sm-6 col-lg-4">
                            <div className="practice-area-block">
                              {post.yoast_head_json?.og_image ? (
                                <Image src={post.yoast_head_json.og_image[0].url} alt={post.title.rendered} width={post.yoast_head_json.og_image[0].width} height={post.yoast_head_json.og_image[0].height} />
                              ) : (
                                <Image src={paceHolderImg} width={paceHolderImg.width} height={paceHolderImg.headers} alt="default"/>
                              )}
                              <div className="practice-area-content">
                                <div className="practice-area-content-center">
                                  <h6 dangerouslySetInnerHTML={{__html:post.title.rendered}} />
                                  <Link className="stretched-link" href={replaceBaseUrl(post.link)}>Discover More</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No posts found</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="practice-area-page-bg">
          <Image src={practiceAreaBg} alt="practice area page bg" width={practiceAreaBg?.width} height={practiceAreaBg?.height} priority={true} />
        </div>
      </section>
      <ScrollToActive />
    </>
  );
}