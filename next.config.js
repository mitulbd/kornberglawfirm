/** @type {import('next').NextConfig} */
async function fetchRewriteData() {

  async function fetchAll(url) {
    let allItems = [];
    let page = 1;
    let totalPages = 1;
  
    while (page <= totalPages) {
      const response = await fetch(`${url}&page=${page}`, {next:{revalidate:3600 }});
      const data = await response.json();
      totalPages = parseInt(response.headers.get('X-WP-TotalPages'));
      allItems = [...allItems, ...data];
      page += 1;
    }
    return allItems;
  }

  const [pages, practices, articles, blogs] = await Promise.all([
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/pages/?_fields=id,link,title,slug&per_page=100'),
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/practice-area/?_fields=id,link,title,city,slug&per_page=100'),
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/articles/?_fields=id,link,title,count,slug&per_page=100'),
    fetchAll('https://kornberglawfirm.com/wp-json/wp/v2/posts/?_fields=id,link,title,slug&per_page=100')
  ]);

  const extractSlugsAndUrls = (data, type) => {
    return data.map(item => ({
      type: type,
      slug: item.slug,
      url: item.link.replace('https://kornberglawfirm.com', '').replace(/\/$/, "")
    }));
  };

  const allData = [
    ...extractSlugsAndUrls(pages, 'pages'),
    ...extractSlugsAndUrls(practices, 'practice-area'),
    ...extractSlugsAndUrls(blogs, 'blog'),
    ...extractSlugsAndUrls(articles, 'articles')
  ];
  return allData;
}

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = async (phase) => {
  const rewriteData = await fetchRewriteData();
  const rewrites = rewriteData
  .filter(item => item.url !== '') // Exclude home page
  .map(item => {
    let destination = '';
    switch (item.type) {
      case 'page':
        destination = `/pages/${item.slug}`;
        break;
      case 'practice-area':
        destination = `/practice-areas/${item.slug}`;
        break;
      case 'blog':
        destination = `/blog/${item.slug}`;
        break;
      case 'articles':
        destination = `/articles/${item.slug}`;
        break;
      default:
        destination = `/${item.slug}`;
    }
    return {
      source: item.url === '' ? '/' : item.url,
      destination: destination
    };
  })
  .filter(rewrite => rewrite.source !== rewrite.destination);

  const redirects = rewriteData
  .filter(item => item.url !== '')
  .map(item => {
    let source = '';
    switch (item.type) {
      case 'page':
        source = `/pages/${item.slug}`;
        break;
      case 'practice-area':
        source = `/practice-areas/${item.slug}`;
        break;
      case 'blog':
        source = `/blog/${item.slug}`;
        break;
      case 'articles':
        source = `/articles/${item.slug}`;
        break;
      default:
        source = `/${item.slug}`;
    }
    return {
      source:source,
      destination:item.url,
      permanent: true,
    };
  })
  .filter(redirect => redirect.source !== redirect.destination);
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require("@ducanh2912/next-pwa").default({
      dest: "public",
    });
    return withPWA ({
      reactStrictMode: true,
      trailingSlash: true,
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "kornberglawfirm.com",
          },
          {
            protocol: 'https',
            hostname: "lh3.googleusercontent.com",
          },
          {
            protocol: 'https',
            hostname: "cdn.ampproject.org",
          }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      },
      compiler: {
        styledComponents: true,
        removeConsole: false,
      },
      async rewrites() {
        return rewrites;
      },
      async redirects() {
        return redirects;
      }        
    });
  }
};