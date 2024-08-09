import EndorsementCode from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype,slug) {
  const meta = await MetaData(posttype="pages", slug="endorsement");
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default async function Endorsement() {
  const fetchData = async () => {
    try {
      const [endorsementRes, reviewRes] = await Promise.all([
        fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=endorsement&_fields=title,acf', { next: { revalidate: 3600 } }),
        fetch('https://kornberglawfirm.com/wp-json/acf/v2/options?_fields=google_review_slider', { next: { revalidate: 3600 } }),
      ]);

      if (!endorsementRes.ok || !reviewRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const endorsementData = await endorsementRes.json();
      const reviewData = await reviewRes.json();

      return {
        endorsementPage: endorsementData[0],
        review: reviewData.google_review_slider,
      };
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return { endorsementPage: null, review: [] };
    }
  };

  const { endorsementPage, review } = await fetchData();

  return <EndorsementCode endorsementPage={endorsementPage} review={review} />;
}