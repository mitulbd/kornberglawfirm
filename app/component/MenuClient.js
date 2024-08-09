"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import backArrow from '@/app/assets/images/left-arrow.svg';

const MenuClient = ({ menuId, menuItems, posts, practices }) => {
  const pathname = usePathname();

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
    return currentPath === itemUrl || (item.children.length > 0 && item.children.some((child) => isItemActive(child, currentPath)));
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
  }, []);

  const renderMenu = (items, isTopLevel = true) => {
    const postActive = posts.some((post) => post.link.split('kornberglawfirm.com')[1] === pathname) || pathname.startsWith('/blog/category');
    const practiceActive = practices.some((practice) => practice.link.split('kornberglawfirm.com')[1] === pathname) || pathname.startsWith('/city/');

    return (
      <ul id={isTopLevel ? menuId : null} className={isTopLevel ? 'list-unstyled' : 'sub-menu'}>
        {!isTopLevel && menuId === "mobile-menu" && (
          <li className="menu-item menu-back">
            <a>
              <Image src={backArrow} width="24" height="24" alt="arrow" /> Back
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
                <span data-bs-dismiss="offcanvas"><Link href={itemUrl} dangerouslySetInnerHTML={{ __html: item.title }} /></span>
              ) : (
                <Link href={itemUrl} dangerouslySetInnerHTML={{ __html: item.title }} />
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

export default MenuClient;