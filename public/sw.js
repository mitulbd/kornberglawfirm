if(!self.define){let e,i={};const a=(a,s)=>(a=new URL(a+".js",s).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(s,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};i[c]=Promise.all(s.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/4JQjebX6UiFCiF6A0w2Jz/_buildManifest.js",revision:"7fe3c6dbfdfd559a4c9278af72e63953"},{url:"/_next/static/4JQjebX6UiFCiF6A0w2Jz/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/127-22651272e5fcba91.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/130-9a54311fa32933c9.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/173-4b6935860e79cc58.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/190-2bf0c35b01d7b52d.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/223-0c69dc2af1604aa0.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/231-9137208f21c9bbba.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/91-4618da1afce0dfe5.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(archive)/city/%5Bslug%5D/page-6c6c69a99548c81e.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/about/howard-c-kornberg/page-1c98acda040d6c0c.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/about/page-c7a5e7fbeafecd94.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/articles/%5Bslug%5D/page-46aa4b89dd0baf1e.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/blog/%5Bslug%5D/page-0f79857aa792b836.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/blog/category/%5Bslug%5D/page-24e2e096fc31693b.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/blog/page-96321dc297715459.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/case-results/page-cdfc65bc9c3f8445.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/contact/page-db3adcbcd5819d24.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/disclaimer/page-710378136b57e743.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/endorsement/page-6168e6b804654faf.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/faqs/page-bd68eee4a609709b.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/our-articles/page-a1cb0787a71a264f.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/practice-areas/%5Bslug%5D/page-a3812824ca942c2b.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/practice-areas/page-33568ad870bd4ea6.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/privacy-policy/page-91c8c937778e5714.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/search/page-5be6631755819208.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/site-map/page-34bb632d915c329d.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/thank-you-sidebar/page-27d50a8b3b59aff5.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/thank-you/page-00de124740b3e960.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/(pages)/web-stories/understanding-car-accidents-lessons-responses-and-representation/page-6658291ff0041ff3.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/_not-found/page-a815d726b191f2b0.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/layout-42d96313f3cb0c2e.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/not-found-2288bab8229a1407.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/app/page-36abbcac2d1df3e3.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/fd9d1056-4e1a26e2d413ba3c.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/main-app-15c5c53bb17ef03d.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/main-b6f98997d37a39e8.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-ad4efb6ee0148149.js",revision:"4JQjebX6UiFCiF6A0w2Jz"},{url:"/_next/static/css/7850158e197badbb.css",revision:"7850158e197badbb"},{url:"/_next/static/media/about-banner-shadow.10c4eacc.webp",revision:"10c4eacc"},{url:"/_next/static/media/about-banner1.8ef2eed6.webp",revision:"8ef2eed6"},{url:"/_next/static/media/arrow-next.b0754cac.svg",revision:"e7537dccd037ff17f4f5312b50fdacf2"},{url:"/_next/static/media/arrow-prev.4345044d.svg",revision:"488a7700fb0234d1de834b72d1434658"},{url:"/_next/static/media/blog-bg-img.2c35fe00.webp",revision:"da886ab1bce80329703652888bf34e7a"},{url:"/_next/static/media/blog-bg.2b475d2c.png",revision:"10c3074b66521e20fa8b7305b66038b2"},{url:"/_next/static/media/car-accident.dd321032.png",revision:"0093d8acbebf4abf8d89dbcc11494674"},{url:"/_next/static/media/endorsement-page-bg.1dd2ec2b.webp",revision:"1dd2ec2b"},{url:"/_next/static/media/favicon.032ef9f8.png",revision:"337a3e77b3cc8b8efd5e9aa2e2238854"},{url:"/_next/static/media/foote-top-shadow.77d53ed7.webp",revision:"77d53ed7"},{url:"/_next/static/media/footer-bg.3bac4f78.webp",revision:"3bac4f78"},{url:"/_next/static/media/hk-icon.563e7a8c.svg",revision:"aebf3a2872f6b024b32b55181a20009d"},{url:"/_next/static/media/home-banner.3390056a.webp",revision:"3390056a"},{url:"/_next/static/media/icon-arrow-left.03d6524b.svg",revision:"4f3ca1f6206c4a95a3471e52223c455d"},{url:"/_next/static/media/icon-arrow-right.6a7419fe.svg",revision:"12ebb6a111f1784567000172e45a9cd6"},{url:"/_next/static/media/icon-call.688c52ab.svg",revision:"1947e3d51c8af6362d2d6225f6703a40"},{url:"/_next/static/media/icon-check-arrow.8ef09ccd.svg",revision:"8ef09ccd"},{url:"/_next/static/media/icon-check.380417cb.svg",revision:"72d471e9040fbcfb22d37429f7123dad"},{url:"/_next/static/media/icon-list-arrow.7fa72a2e.svg",revision:"7fa72a2e"},{url:"/_next/static/media/icon-location.1a2702c8.svg",revision:"43700f3bd6ddfcfdafa38a25e0e6506e"},{url:"/_next/static/media/icon-phone.9158d927.svg",revision:"8db87a4e994c18c26f835797d7e1ad16"},{url:"/_next/static/media/icon-search-yellow.40d3ca4f.svg",revision:"f3e4c354dd744c2dffe2648bc1d898dc"},{url:"/_next/static/media/icon-search.dde56dc6.svg",revision:"2932de333570f1224d7eb7e2c040c79b"},{url:"/_next/static/media/icon-top-arrow.3459f53e.svg",revision:"b4bd97cccfdbb35930b8d28124cbdb6a"},{url:"/_next/static/media/left-arrow.de837279.svg",revision:"45a0d03e33e59bcd7b9758b7b9aaebf7"},{url:"/_next/static/media/menu-arrow.686dd76d.svg",revision:"686dd76d"},{url:"/_next/static/media/page-sec-top-shadow.ed906473.webp",revision:"ed906473"},{url:"/_next/static/media/posted-on-google.54b6ddc5.svg",revision:"8db0dd1655f13fec7801e543915690a9"},{url:"/_next/static/media/practice-area-bg.cea6d369.webp",revision:"05ba0c1581b3bd1fee20f6ee6a26f171"},{url:"/_next/static/media/quote-icon.29f50b9c.svg",revision:"97003f352375d2e94caa1fd43c61f69f"},{url:"/_next/static/media/rating-star.20f2725d.svg",revision:"94b16a8c8bc796683c3be71356acc29b"},{url:"/_next/static/media/sidebar-form-bg.32814252.webp",revision:"32814252"},{url:"/_next/static/media/single-practice-area-bg.40c15e10.webp",revision:"fa0c538faef34e42939ac2954a6aeb25"},{url:"/_next/static/media/single-practice-area.10fe3fca.png",revision:"a5237eac8cdcf5fcd13d77267fd142f0"},{url:"/_next/static/media/specializes-bg.5f346ae8.webp",revision:"5f346ae8"},{url:"/_next/static/media/testimonials-sec-shadow.0b2779a5.webp",revision:"0b2779a5"},{url:"/_next/static/media/trial-lawyer-bg.65d42f02.webp",revision:"65d42f02"},{url:"/icons/android-chrome-192x192.png",revision:"38f222e3f35f04275c8b7aa7d3bcf13f"},{url:"/icons/android-chrome-384x384.png",revision:"ebd8709b8df97079769aeb6b998841a1"},{url:"/icons/icon-144x144.png",revision:"1f9518647d3ce710b0a43ad61d33caa3"},{url:"/icons/icon-512x512.png",revision:"d39065b77a135f38fa23e03657cc1166"},{url:"/icons/screenshot-narrow1.png",revision:"f58b29ec97c66682450f8142b289a563"},{url:"/icons/screenshot-narrow2.png",revision:"fd1c21ff636d01cf57958930e08760b3"},{url:"/icons/screenshot-narrow3.png",revision:"bf061e2b006394970519083e1e824537"},{url:"/icons/screenshot1.png",revision:"027ac00922268ce9f2c6119460b767f8"},{url:"/icons/screenshot2.png",revision:"7e46881a83e764dcddbc444a463fe3c3"},{url:"/icons/screenshot3.png",revision:"5ec734c6faabc5257b50f0d1e68dbed0"},{url:"/manifest.json",revision:"d83f17ff6559f12f1d0eff058ea33b90"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:i}})=>!(!e||i.startsWith("/api/auth/callback")||!i.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:i},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!i.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:i},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!i.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:i})=>i&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
