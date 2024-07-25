import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";
import Image from "next/image";
import Link from "next/link";
import { replaceBaseUrl } from "@/app/utils/urlUtils";
import blogBg from "@/app/assets/images/blog-bg-img.webp";
import arrowPrev from "@/app/assets/images/arrow-prev.svg";
import arrowNext from "@/app/assets/images/arrow-next.svg";

export async function generateMetadata({ params, posttype, slug }) {
  const meta = await MetaData(posttype = "posts", slug = `${params.slug}`);
  if (meta) { return meta; }
  else { console.error('Metadata not found'); return {}; }
};

export default async function SingleBlogPost({ params }) {
  const response = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?slug=${params.slug}`, {next:{revalidate:3600 }});
  const [thisPost] = await response.json();
  const [nextPost, prevPost, thisPostCat, categories] = await Promise.all([
    fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?per_page=1&order=desc&orderby=date&after=${thisPost.date}`, {next:{revalidate:3600 }}).then(res => res.json()),
    fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?per_page=1&order=desc&orderby=date&before=${thisPost.date}`, {next:{revalidate:3600 }}).then(res => res.json()),
    fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?categories=${thisPost.categories}&_fields=id,title,link&per_page=3`, {next:{revalidate:3600 }}).then(res => res.json()),
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/categories?_fields=id,name,slug&per_page=100', {next:{revalidate:3600 }}).then(res => res.json())
  ]);

  const date = new Date(thisPost.date);
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const finaldate = month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

  return (
    <>
      <section className="post-page-sec">
        <div className="container">
          <Breadcrumbs pageName={thisPost.title.rendered} pageMiddle="Blog" pageMiddleslug="/blog" />
          <div className="row justify-content-center">
            <div className="col-xl-11">
              <div className="single-post-block">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="single-post-title">
                      <div className="single-post-date">{finaldate}</div>
                      <h1 className="h3" dangerouslySetInnerHTML={{__html:thisPost.title?.rendered}}/>
                      <div className="post-behalf-of-cat"><strong>On behalf of</strong> The Law Offices of Howard Kornberg <strong>Posted in </strong>
                        {categories.filter(data => thisPost.categories.includes(data.id)).map((data, index) => (
                          <strong key={index}><Link href={`/blog/category/${data.slug}`}>{data.name}</Link></strong>
                        ))}
                      </div>
                    </div>
                    <div className="single-post-content single-content" dangerouslySetInnerHTML={{ __html: thisPost.content.rendered }} />
                  </div>
                </div>
              </div>
              <div className="post-pagination">
                {prevPost.length > 0 && (
                  <Link href={replaceBaseUrl(prevPost[0].link)} className="btn btn-primary btn-sm btn-prev" title={prevPost[0].title.rendered}><Image src={arrowPrev} alt="Arrow Prev" width={arrowPrev.width} height={arrowPrev.height} /> &nbsp; Prev</Link>
                )}
                {nextPost.length > 0 && (
                  <Link href={replaceBaseUrl(nextPost[0].link)} className="btn btn-primary btn-sm btn-next" title={nextPost[0].title.rendered}>Next &nbsp; <Image src={arrowNext} alt="Arrow Next" width={arrowPrev.width} height={arrowPrev.height} /></Link>
                )}
              </div>
              {thisPostCat.length > 1 && 
                <div className="related-posts">
                  <h3>RELATED POSTS</h3>
                  <div className="row">
                    {thisPostCat.map(data =>(
                      <div key={data.id} className="col-md-4">
                        <div className="blog-list-block">
                        <h5 dangerouslySetInnerHTML={{__html:data.title?.rendered}}/>
                          <div><Link href={replaceBaseUrl(data.link)} className="btn btn-primary btn-sm stretched-link">View Post</Link></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="blog-page-bg">
          <Image src={blogBg} width={blogBg.width} alt="Blog Bg" height={blogBg.height} />
        </div>
      </section>
    </>
  );
}