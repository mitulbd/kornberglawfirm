import City from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata({params, posttype, slug}) {
  const meta = await MetaData(posttype="city", slug=`/${params.slug}`);
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default function Cities() {return <City/>}