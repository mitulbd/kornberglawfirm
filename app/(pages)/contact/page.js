import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";
import Image from "next/image";

export async function generateMetadata(posttype, slug) {
  const meta = await MetaData(posttype = "pages", slug = "contact");
  if (meta) { return meta; }
  else { console.error('Metadata not found'); return {}; }
};

export default async function Contact() {
  const [[contactApi]] = await Promise.all([
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=contact&_fields=acf', {next:{revalidate:3600 }}).then(res => res.json()),
  ]);
  const contactAcf = contactApi.acf;
  return (
    <>
      <section className="contact-page-sec">
        <div className="container">
          <Breadcrumbs pageName="Contact" />
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="row">
                <div className="col-md-7">
                  {contactAcf.banner_top_heading &&
                    <div className="h3" dangerouslySetInnerHTML={{__html:contactAcf.banner_top_heading}} />
                  }
                  <div dangerouslySetInnerHTML={{__html:contactAcf.banner_sub_content}} />
                </div>
                <div className="col-md-5">
                  {contactAcf.banner_bg_image &&
                    <Image className="contact-banner-img" src={contactAcf.banner_bg_image?.url} alt={contactAcf.banner_bg_image?.alt} width={contactAcf.banner_bg_image?.width} height={contactAcf.banner_bg_image?.height} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}