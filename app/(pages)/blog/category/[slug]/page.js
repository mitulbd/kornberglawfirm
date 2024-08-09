import Category from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata({params, posttype, slug}) {
  const meta = await MetaData(posttype="categories", slug=`${params.slug}`);
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default async function Categoryies({ params }) {
  const perPage = 9;

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://kornberglawfirm.com/wp-json/wp/v2/categories?_fields=id,name,slug&per_page=100");
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.find(cat => cat.slug === params.slug);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return null;
    }
  };

  const fetchPosts = async (categoryId) => {
    try {
      const postRes = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&page=1&_fields=id,title,link`);
      if (!postRes.ok) throw new Error('Network response was not ok');
      const postData = await postRes.json();
      const totalPages = postRes.headers.get('X-WP-TotalPages');
      return { postData, totalPages: Number(totalPages) };
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
      return { postData: [], totalPages: 1 };
    }
  };

  const thisCategory = await fetchCategories();
  const { postData, totalPages } = thisCategory ? await fetchPosts(thisCategory.id) : { postData: [], totalPages: 1 };

  return <Category initialPosts={postData} initialTotalPages={totalPages} initialCategory={thisCategory} />;
}