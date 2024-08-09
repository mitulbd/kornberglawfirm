// components/MenuServer.js

import MenuClient from './MenuClient';

export default async function MenuServer({ menuId }) {
  // Fetch the data on the server side
  const [menuRes, postsRes, practicesRes] = await Promise.all([
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/menu/main-menu/?_fields=ID,menu_item_parent,url,title', { next: { revalidate: 3600 } }),
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/posts/?_fields=link&per_page=100', { next: { revalidate: 3600 } }),
    fetch('https://kornberglawfirm.com/wp-json/wp/v2/practice-area/?_fields=link&per_page=100', { next: { revalidate: 3600 } }),
  ]);

  // Parse the fetched data
  const menuData = await menuRes.json();
  const postsData = await postsRes.json();
  const practicesData = await practicesRes.json();

  // Pass the data to the client component as props
  return <MenuClient menuId={menuId} menuItems={menuData} posts={postsData} practices={practicesData} />;
}
