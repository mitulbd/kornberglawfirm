"use client";
import { usePathname } from 'next/navigation';
import DownloadPwa from '../utils/DownloadButton';
import ToTopButton from '@/app/component/ToTopButton';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleMapsEmbed } from '@next/third-parties/google';
import ContactForm from '@/app/component/ContactForm';
import Reviews from '@/app/component/GoogleReviews';
import iconLocation from '@/app/assets/images/icon-location.svg';
import iconCall from '@/app/assets/images/icon-call.svg';

const FooterClient = ({ options, footermenu }) => {
  const pathname = usePathname();  
  const currentYear = new Date().getFullYear();
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const targetElement = document.getElementById('footer-form');
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      {pathname !== '/web-stories/understanding-car-accidents-lessons-responses-and-representation/' && <>
        {pathname !== '/' ? (
          <>
            {pathname !== '/contact' && pathname !== '/contact/' && pathname !== '/endorsement' && pathname !== '/endorsement/' ? (
              <section className="footer-attorney-sec">
                <div className="container">
                  <div className="footer-attorney-title">
                    <h2>{options.footer_attorney_title}</h2>
                    <h3 dangerouslySetInnerHTML={{ __html: options.footer_attorney_sub_title }} />
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-xxl-10">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="footer-attorney-photo">
                            {options.footer_attorney_photo && <Image className="footer-attorney-img" src={options.footer_attorney_photo?.url} alt={options.footer_attorney_photo?.alt} title={options.footer_attorney_photo?.alt} width={options.footer_attorney_photo?.width} height={options.footer_attorney_photo?.height} />}
                            {options.footer_attorney_icon && <Image className="footer-attorney-icon" src={options.footer_attorney_icon?.url} alt={options.footer_attorney_icon?.alt} title={options.footer_attorney_icon?.alt} width={options.footer_attorney_icon?.width} height={options.footer_attorney_icon?.height} />}
                          </div>
                        </div>
                        <div className="col-md-6" dangerouslySetInnerHTML={{ __html: options.footer_attorney_content }} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
            <section className="testimonials-sec">
              <div className="container">
                <Reviews />
                {pathname === '/contact' || pathname === '/contact/' ? (
                  <div className="container contact-para-footer">
                    <div className="row justify-content-center">
                      <div className="col-md-9" dangerouslySetInnerHTML={{ __html: options.contact_page_footer_text }} />
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          </>
        ) : null}
        <footer>
          <div className="footer-form-sec">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xxl-10">
                  <div className="footer-form-title">
                    <h2>{options.footer_form_title}</h2>
                    <h3>{options.footer_form_sub_title}</h3>
                    <div className="line-title"><span>{options.footer_form_line_title}</span></div>
                  </div>
                  <div id="footer-form">                    
                    <ContactForm/>
                  </div>
                  <div className="footer-logo-menu">
                    {options.site_logo && <Link className="footer-logo" href="/" aria-label="footer-logo"><Image src={options.site_logo?.url} alt="footer logo" title={options.site_logo.title} width={384} height={64} /></Link>}
                    <div className="footer-menu-top">
                      {!!(footermenu) ?
                        <ul className="footer-menu list-unstyled">
                          {footermenu?.map((data => {
                            return (
                              <li key={data.ID}><Link href={(data.url).split('kornberglawfirm.com')[1]}>{data.title}</Link></li>
                            )
                          }))}
                        </ul>
                        : null}
                      <ToTopButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-location-sec">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xxl-10">
                  <div className="social-list">
                    {options?.social_link_list.map((data, index) => (
                      <Link key={index} href={data.social_link} target="_blank" rel="nofollow noopener noreferrer" className="social-block" title={data.social_title} aria-label={data.social_title}><Image src={data.social_image?.url} alt={data.social_title} title={data.img_title} width={data.social_image?.width} height={data.social_image?.height} />{data.social_title}</Link>
                    ))}
                  </div>
                  <div className="row footer-location">
                    {options?.office_addresses.map((data, index) => (
                      <div className="col-lg-6" key={index}>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="footer-add-call">
                              <Image src={iconLocation} alt="icon location" width={iconLocation.width} height={iconLocation.height} title={iconLocation.title} />
                              <div>
                                <strong>{data.office_title}</strong>
                                <Link href={data.office_gbp_link} target="_blank" rel="nofollow noopener noreferrer">{data.office_address}</Link>
                              </div>
                            </div>
                            <div className="footer-add-call">
                              <Image src={iconCall} width={iconCall.width} height={iconCall.height} alt="icon call" />
                              {data.office_phone_number ? <div><a href={`tel:${data.office_phone_number}`}>{data.office_phone_number}</a></div> : <div><a>By Appointment Only</a></div>}
                            </div>
                          </div>
                          <div className="col-sm-6"><div className="mapiframe"><GoogleMapsEmbed height={140} width="100%" src={data.office_map_iframe}/></div></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-row">
              <div className="footer-bottom-col footer-bottom-left">
                <span className="copy-text">© {currentYear} Law Offices of Howard Kornberg</span><span>|</span><a href="/privacy-policy/">Privacy Policy</a> <span>|</span> <a href="/disclaimer/">Disclaimer</a> <span>|</span> <a href="/site-map/">Sitemap</a>
              </div>
              <div className="footer-bottom-col design-by" dangerouslySetInnerHTML={{ __html: options.copyright_right_text }} />
            </div>
          </div>
        </div>
        {options.iconPhone && options.phone_no &&
          <Link className="mobile-call" href={`tel:${options.phone_no}`} aria-label="Mobile call"><Image src={options.iconPhone} alt="Phone" title="Phone" width={38} height={38} /></Link>
        }
        <a onClick={handleScrollToContact} className="free-consultation" dangerouslySetInnerHTML={{ __html: options.free_consultation_button_title }} />
        <DownloadPwa/>
      </>
      }
    </>
  );
};

export default FooterClient;