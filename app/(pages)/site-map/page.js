import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";
import Link from "next/link";
import { replaceBaseUrl } from "@/app/utils/urlUtils";

export async function generateMetadata(posttype, slug) {
  const meta = await MetaData(posttype = "pages", slug = "site-map");
  if (meta) { return meta; }
  else { console.error('Metadata not found'); return {}; }
};

async function fetchAll(url) {
  let allItems = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await fetch(`${url}&page=${page}`, {next:{revalidate:3600 }});
    const data = await response.json();
    totalPages = parseInt(response.headers.get('X-WP-TotalPages'));
    allItems = [...allItems, ...data];
    page += 1;
  }
  return allItems;
}

export default async function Sitemap() {
  const [pages, practices, cities, articles, blogs] = await Promise.all([
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/pages/?_fields=id,link,title&per_page=100'),
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/practice-area/?_fields=id,link,title,city&per_page=100'),
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/city/?_fields=id,link,name,count&per_page=100'),
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/articles/?_fields=id,link,title,count&per_page=100'),
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/posts/?_fields=id,link,title&per_page=100')
  ]);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <Breadcrumbs pageName="Sitemap" />
          <div className="banner-headings">
            <h1>Sitemap</h1>
          </div>
        </div>
      </section>

      <section className="page-sec2 sitemap-page-sec">
        <div className="container">
          <div className="sitemap-list">
            <div className="sitemap-block">
              <h5>Pages</h5>
              <ul className="three-col-list">
                {pages.filter(page => ![14631, 13527, 13523, 15309].includes(page.id)).reverse().map(page => (
                  <li key={page.id}><Link href={replaceBaseUrl(page?.link)}>{page?.title?.rendered}</Link></li>
                ))}
              </ul>
            </div>
            <div className="sitemap-block">
              <h5>Practice Areas</h5>
              <ul className="three-col-list">
                {practices.filter(practice => practice.city == "").reverse().map(practice => (
                  <li key={practice.id}><Link href={replaceBaseUrl(practice?.link)} dangerouslySetInnerHTML={{ __html: practice.title.rendered }} /></li>
                ))}
              </ul>
            </div>
            <div className="sitemap-block">
              {cities.sort((a, b) => b.count - a.count).filter(city => city.id !== "").map(city => (
                <div className="sitemap-block" key={city.id}>
                  <h5>{city.name}</h5>
                  <ul className="three-col-list">
                    {practices.filter(practice => practice.city.includes(city.id)).map(practice => (
                      <li key={practice.id}>
                        <Link href={replaceBaseUrl(practice?.link)} dangerouslySetInnerHTML={{ __html: practice.title.rendered }} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="sitemap-block">
              <h5>Articles</h5>
              <ul className="three-col-list">
                {articles.reverse().map(data => (
                  <li key={data.id}><Link href={replaceBaseUrl(data?.link)} dangerouslySetInnerHTML={{ __html: data?.title?.rendered }} /></li>
                ))}
              </ul>
            </div>
            <div className="sitemap-block">
              <h5>Blogs</h5>
              <ul>
                {blogs.reverse().map(blog => (
                  <li key={blog.id}><Link href={replaceBaseUrl(blog?.link)} dangerouslySetInnerHTML={{ __html: blog?.title?.rendered }} /></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}