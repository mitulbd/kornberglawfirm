import {notFound } from "next/navigation";

const MetaData = async (posttype, slug, isStory) => {
  const url = isStory  ? `https://kornberglawfirm.com/wp-json/web-stories/v1/web-story/15058/?_fields=yoast_head_json` : `https://kornberglawfirm.com/wp-json/wp/v2/${posttype}?slug=${slug}&_fields=yoast_head_json`;
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const post = await response.json();

  //const post = await (await fetch(`https://kornberglawfirm.com/wp-json/wp/v2/${posttype}?slug=${slug}&_fields=yoast_head_json`, {next:{revalidate:3600 }})).json();
  
  const yostJson =  isStory  ? post.yoast_head_json : post[0].yoast_head_json ;

  //const isIndex = yostJson.robots.index ? "index" :"noindex";
  //const isFollow = yostJson.robots.follow ? "follow" :"nofollow";

  return {
    manifest:"/manifest.json",
    title:yostJson.title,
    description:yostJson.description,
    robots:yostJson.robots,
    openGraph:{
      title:yostJson.og_title,
      description:yostJson.description,
      url:yostJson.og_url,
      siteName:yostJson.og_site_name,      
      locale:yostJson.og_locale,
      type:yostJson.og_type
    },
    formatDetection:{
      telephone:false,
    },
    alternates:{
      canonical:yostJson.og_url,
    },
    robots:{
      index:false,
      follow:false,
      googleBot:{
        index:false,
        follow:false,
        noimageindex:true,
        'max-video-preview':-1,
        'max-image-preview':'large',
        'max-snippet':-1,
      },
    },
    authors:[{name:'Howard Kornberg'}],
    twitter:{
      card:yostJson.twitter_card
    } 
  };
}
export default MetaData;