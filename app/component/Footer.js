// app/components/FooterServer.js
import React from 'react';
import FooterClient from './FooterClient';

async function fetchData() {
  try {
    const [menuResponse, optionsResponse] = await Promise.all([
      fetch("https://kornberglawfirm.com/wp-json/wp/v2/menu/footer?_fields=ID,url,title", { next: { revalidate: 3600 } }),
      fetch("https://kornberglawfirm.com/wp-json/acf/v2/options", { next: { revalidate: 3600 } })
    ]);

    if (!menuResponse.ok || !optionsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const [footermenu, options] = await Promise.all([
      menuResponse.json(),
      optionsResponse.json()
    ]);

    return { footermenu, options };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { footermenu: [], options: {} };
  }
}

export default async function Footer() {
  const { footermenu, options } = await fetchData();

  return (
    <FooterClient footermenu={footermenu} options={options} />
  );
}
