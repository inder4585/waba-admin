'use client';
import React from 'react';
import Header from '@/components/partials/header';
import Sidebar from '@/components/partials/sidebar';
import { cn } from '@/lib/utils';
import { useSidebar, useThemeStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import MobileSidebar from '@/components/partials/sidebar/mobile-sidebar';
import { useMounted } from '@/hooks/use-mounted';
import LayoutLoader from '@/components/layout-loader';
import { redirect } from 'next/navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, sidebarType, setCollapsed, subMenu } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const { layout } = useThemeStore();
  const location = usePathname();
  const isMobile = useMediaQuery('(min-width: 768px)');
  const mounted = useMounted();

  if (!mounted) {
    return <LayoutLoader />;
  }

  return (
    <>
      {/* <Header handleOpenSearch={() => setOpen(true)} /> */}
      <Sidebar />

      <div
        className={cn('content-wrapper transition-all duration-150 ', {
          'xl:ml-[300px]': !collapsed,
          'xl:ml-[72px]': collapsed,
        })}
      >
        <div
          className={cn(
            '  md:pt-6 md:pb-[37px] pb-28 pt-[15px] md:px-6 px-4  page-min-height ',
            {}
          )}
        >
          <LayoutWrapper
            isMobile={isMobile}
            setOpen={setOpen}
            open={open}
            location={location ?? ''}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>
    </>
  );
};

export default MainLayout;

const LayoutWrapper = ({
  children,
  isMobile,
  setOpen,
  open,
  location,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  location: string;
}) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar className="left-[300px]" />
    </>
  );
};
