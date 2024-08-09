import BlogCode from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype,slug) {
  const meta = await MetaData(posttype="pages", slug="blog");
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default async function Blog() {
  const postsPerPage = 9;
  const fetchInitialData = async () => {
    const res = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?per_page=${postsPerPage}&page=1&_fields=title,link,id`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Network response was not ok');
    const postData = await res.json();
    const totalPages = res.headers.get('X-WP-TotalPages');
    return { postData, totalPages: Number(totalPages) };
  };
  const { postData, totalPages } = await fetchInitialData();
  return <BlogCode initialPosts={postData} initialTotalPages={totalPages} />;
}