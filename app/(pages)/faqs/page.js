import FaqsCode from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype,slug) {
  const meta = await MetaData(posttype="pages", slug="faqs");
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default function Faqpage() {return <FaqsCode/>}