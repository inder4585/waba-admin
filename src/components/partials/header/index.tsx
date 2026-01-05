'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import ThemeButton from './theme-button';
import { useSidebar, useThemeStore } from '@/store';
import ProfileInfo from './profile-info';
import Inbox from './inbox';
import VerticalHeader from './vertical-header';
import { useMediaQuery } from '@/hooks/use-media-query';
import MobileMenuHandler from './mobile-menu-handler';
import ClassicHeader from './layout/classic-header';

const NavTools = ({ isDesktop, isMobile, sidebarType }) => {
  return (
    <div className="nav-tools flex items-center  gap-2">
      <ThemeButton />
      <Inbox />

      <div className=" pl-2">
        <ProfileInfo />
      </div>
      {!isDesktop && sidebarType !== 'module' && <MobileMenuHandler />}
    </div>
  );
};
const Header = ({ handleOpenSearch }) => {
  const { collapsed, sidebarType, setCollapsed, subMenu, setSidebarType } =
    useSidebar();
  const { layout, navbarType, setLayout } = useThemeStore();

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const isMobile = useMediaQuery('(min-width: 768px)');

  React.useEffect(() => {
    if (!isDesktop && layout === 'horizontal') {
      setSidebarType('classic');
    }
  }, [isDesktop]);

  return (
    <ClassicHeader
      className={cn('', {
        'xl:ml-[300px]': !collapsed,
        'xl:ml-[72px]': collapsed,
        'sticky top-0': navbarType === 'sticky',
      })}
    >
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader
            sidebarType={sidebarType}
            handleOpenSearch={handleOpenSearch}
          />
          <NavTools
            isDesktop={isDesktop}
            isMobile={isMobile}
            sidebarType={sidebarType}
          />
        </div>
      </div>
    </ClassicHeader>
  );
};

export default Header;
