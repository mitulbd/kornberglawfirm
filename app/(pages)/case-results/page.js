import Breadcrumbs from "@/app/component/Breadcrumbs";
import MetaData from "@/app/utils/Metas";
import Image from "next/image";

export async function generateMetadata(posttype, slug) {
  const meta = await MetaData(posttype = "pages", slug = "case-results");
  if (meta) { return meta; }
  else { console.error('Metadata not found'); return {}; }
};

export default async function Contact() {
  const [[resultApi], cases] = await Promise.all([
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/pages/?slug=case-results&_fields=acf', {next:{revalidate:3600 }}).then(res => res.json()),
    fetch('https://kornberglawfirm.com/wp-json/acf/v2/options?_fields=result_blocks', {next:{revalidate:3600 }}).then(res => res.json()),
  ]);
  const resultAcf = resultApi.acf;

  return (
    <>
      <section className="result-page-sec">
        <div className="container">
          <Breadcrumbs pageName="Result" />
          <div className="row justify-content-center">
            <div className="col-xxl-10">
              <div className="result-page-title">
                {resultAcf.result_top_title &&
                  <div className="h3" dangerouslySetInnerHTML={{ __html:resultAcf.result_top_title}}/>
                }
                {resultAcf.result_yellow_heading &&
                  <h1>{resultAcf.result_yellow_heading}</h1>
                }
              </div>
              <div className="row">
                {cases.result_blocks &&
                  cases.result_blocks.map((data, index) => (
                    <div key={index} className="col-md-4">
                      <div className="case-block">
                        <div className="case-block-top">
                          <div className="h3">{data.block_amount}</div>
                          <p>{data.block_title}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        {resultAcf.result_page_bg_image &&
          <div className="result-page-bg">
            <Image src={resultAcf.result_page_bg_image?.url} alt={resultAcf.result_page_bg_image?.alt} width={resultAcf.result_page_bg_image?.width} height={resultAcf.result_page_bg_image?.height} priority={true} />
          </div>
        }
      </section>
    </>
  );
}