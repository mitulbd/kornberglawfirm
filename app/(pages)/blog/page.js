
import BlogCode from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype,slug) {
  const meta = await MetaData(posttype="pages", slug="blog");
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default function Article() {return <BlogCode/>}