"use client"
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import backArrow from '@/app/assets/images/left-arrow.svg';

const Menu = ({ menuId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [posts, setPosts] = useState([]);
  const [practices, setPractice] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, postsRes, practicesRes] = await Promise.all([
          fetch('https://kornberglawfirm.com/wp-json/wp/v2/menu/main-menu/?_fields=ID,menu_item_parent,url,title', {next:{revalidate:3600 }}),
          fetch('https://kornberglawfirm.com/wp-json/wp/v2/posts/?_fields=link&per_page=100', {next:{revalidate:3600 }}),
          fetch('https://kornberglawfirm.com/wp-json/wp/v2/practice-area/?_fields=link&per_page=100', {next:{revalidate:3600 }}),
        ]);
        
        const menuData = await menuRes.json();
        const postsData = await postsRes.json();
        const practicesData = await practicesRes.json();

        setMenuItems(menuData);
        setPosts(postsData);
        setPractice(practicesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const createMenuHierarchy = (menuItems) => {
    const menuMap = {};
    const topLevelItems = [];
    menuItems.forEach((item) => { menuMap[item.ID] = { ...item, children: [] }; });
    menuItems.forEach((item) => {
      if (item.menu_item_parent && menuMap[item.menu_item_parent]) {
        menuMap[item.menu_item_parent].children.push(menuMap[item.ID]);
      } else {
        topLevelItems.push(menuMap[item.ID]);
      }
    });
    return topLevelItems;
  };

  const isItemActive = (item, currentPath) => {
    const itemUrl = item.url.split('kornberglawfirm.com')[1];
    const isActive = currentPath === itemUrl;
    if (isActive) {
      return true;
    }
    return item.children.length > 0 && item.children.some((child) => isItemActive(child, currentPath));
  };

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;
      if (target.closest('.menu-back')) {
        const parentMenu = target.closest('.menu-show');
        if (parentMenu) {
          parentMenu.classList.remove('menu-show');
        }
      }
      if (target.classList.contains('caret')) {
        target.parentElement.classList.add('menu-show');
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [menuItems]);

  const renderMenu = (items, isTopLevel = true) => {
    const postActive = posts.some((post) => post.link.split('kornberglawfirm.com')[1] === pathname) || pathname.startsWith('/blog/category');
    const practiceActive = practices.some((practice) => practice.link.split('kornberglawfirm.com')[1] === pathname) || pathname.startsWith('/city/');
    
    return (
      <ul id={isTopLevel ? menuId : null} className={isTopLevel ? 'list-unstyled' : 'sub-menu'}>
        {!isTopLevel && menuId === "mobile-menu" && (
          <li className="menu-item menu-back">
            <a>
              <Image src={backArrow} width="24" height="24" alt="arrow"/> Back
            </a>
          </li>
        )}
        {items.map((item) => {
          const itemUrl = item.url.split('kornberglawfirm.com')[1];
          const hasChildren = item.children.length > 0;
          const isActive = pathname === itemUrl;
          const isParentActive = hasChildren && item.children.some((child) => isItemActive(child, pathname));
          const isBlogActive = postActive && item.title === 'Blog';
          const isPracticeActive = practiceActive && item.title === 'Practice Areas';
          const itemClasses = [
            isActive ? 'current-menu-item' : '',
            isParentActive ? 'current-menu-parent' : '',
            hasChildren ? 'menu-item-has-children' : '',
            isBlogActive ? 'current-menu-item' : '',
            isPracticeActive ? 'current-menu-item' : ''
          ].filter(Boolean).join(' ');

          return (
            <li key={item.ID} className={itemClasses}>
              {hasChildren && <i className="caret" />}
              {menuId === "mobile-menu" ? (
                <span data-bs-dismiss="offcanvas"><Link href={itemUrl} dangerouslySetInnerHTML={{__html:item.title}}/></span>
              ) : (
                <Link href={itemUrl} dangerouslySetInnerHTML={{__html:item.title}}/>
              )}
              {hasChildren && renderMenu(item.children, false)}
            </li>
          );
        })}
      </ul>
    );
  };

  return <>{renderMenu(createMenuHierarchy(menuItems))}</>;
};

export default Menu;