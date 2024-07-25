import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";

export async function generateMetadata(posttype, slug) {
  const meta = await MetaData(posttype = "pages", slug = "contact");
  if (meta) { return meta; }
  else { console.error('Metadata not found'); return {}; }
};

export default async function PracticeAreas() {
  const [[pageApi]] = await Promise.all([
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=disclaimer&_fields=link,title,content', {next:{revalidate:3600 }}).then(res => res.json()),
  ]);
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <Breadcrumbs pageName={pageApi.title?.rendered} />
          <div className="row justify-content-center">
            <h1>{pageApi.title?.rendered}</h1>
          </div>
        </div>	
      </section>
      <section className="page-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 single-content" dangerouslySetInnerHTML={{__html:pageApi.content?.rendered}} />             
          </div>
        </div>
      </section>
    </>
  );
}