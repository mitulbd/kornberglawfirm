import City from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata({params, posttype, slug}) {
  const meta = await MetaData(posttype="city", slug=`/${params.slug}`);
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default async function Cities({ params }) {
  const perPage = 9;

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://kornberglawfirm.com/wp-json/wp/v2/city?_fields=id,name,slug&per_page=100", { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data.find(cat => cat.slug === params.slug);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return null;
    }
  };

  const fetchPosts = async (cityId) => {
    try {
      const postRes = await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/practice-area?city=${cityId}&per_page=${perPage}&page=1&_fields=id,title,link,slug`);
      if (!postRes.ok) throw new Error('Network response was not ok');
      const postData = await postRes.json();
      const totalPages = postRes.headers.get('X-WP-TotalPages');
      return { postData, totalPages: Number(totalPages) };
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
      return { postData: [], totalPages: 1 };
    }
  };

  const thisCity = await fetchCategories();
  const { postData, totalPages } = thisCity ? await fetchPosts(thisCity.id) : { postData: [], totalPages: 1 };

  return <City initialPosts={postData} initialTotalPages={totalPages} initialCity={thisCity} />;
}