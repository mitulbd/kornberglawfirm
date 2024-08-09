import ArticleCode from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype,slug) {
  const meta = await MetaData(posttype="pages", slug="articles");
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default async function ArticleServer() {
  const fetchData = async () => {
    try {
      const [pageRes, articlesRes] = await Promise.all([
        fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=articles&_fields=title', { next: { revalidate: 3600 } }),
        fetch('https://kornberglawfirm.com/wp-json/wp/v2/articles?per_page=9&page=1', { next: { revalidate: 3600 } })
      ]);

      if (!pageRes.ok || !articlesRes.ok) {
        throw new Error('Network response was not ok');
      }

      const articlePageData = await pageRes.json();
      const articlesData = await articlesRes.json();
      const totalPages = articlesRes.headers.get('X-WP-TotalPages');

      return {
        articlePage: articlePageData[0],
        articles: articlesData,
        totalPages: Number(totalPages)
      };
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
      return {
        articlePage: null,
        articles: [],
        totalPages: 1
      };
    }
  };

  const { articlePage, articles, totalPages } = await fetchData();

  return <ArticleCode articlePage={articlePage} articles={articles} totalPages={totalPages} />;
}