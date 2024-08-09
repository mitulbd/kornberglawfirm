import FaqsCode from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype,slug) {
  const meta = await MetaData(posttype="pages", slug="faqs");
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default async function FaqsServer() {
  const fetchData = async () => {
    try {
      const response = await fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=faqs&_fields=acf', { next: { revalidate: 3600 } });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data[0]?.acf || {};
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return {};
    }
  };

  const faqsAcf = await fetchData();

  return <FaqsCode faqsAcf={faqsAcf} />;
}