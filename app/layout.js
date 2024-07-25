import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import '@/app/assets/sass/main.scss';
import Script from "next/script";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en"  className={`${poppins.variable}`}>
      <body>
        <Header/>
        <main>
          {children}
        </main>
        <Footer/>
        {/*<Script>{`(function(ng,a,g,e,l,i,ve){l=a.createElement(g),l.async=1,l.src=ng+e;var c=a.getElementsByTagName(g)[0];c.parentNode.insertBefore(l,c);var i=a.createElement('div');var ve='style';i.id='nGageLH',i[ve].position='fixed',i[ve].right='0px',i[ve].bottom='0px',i[ve].zIndex='5000',a.body&&a.body.appendChild(i)}('https://messenger.ngageics.com/ilnksrvr.aspx?websiteid=',document,'script','197-33-49-216-8-70-49-32'));`}</Script>*/}
      </body>
    </html>
  );
}