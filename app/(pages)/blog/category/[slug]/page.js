import Category from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata({params, posttype, slug}) {
  const meta = await MetaData(posttype="categories", slug=`${params.slug}`);
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default function Blog() {return <Category/>}