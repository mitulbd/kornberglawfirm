import WebStoryCode from "./code";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype, slug, isStory) {  
  const meta = await MetaData(posttype, slug, isStory = true);
  if (meta) {return meta;}
  else {console.error('Metadata not found');return {};}
};

export default function WebStory() {return <WebStoryCode/>}