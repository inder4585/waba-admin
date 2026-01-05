import { create } from 'zustand';
import { siteConfig } from '@/config/site';
import { persist, createJSONStorage } from 'zustand/middleware';
interface ThemeStoreState {
  theme: string;
  setTheme: (theme: string) => void;
  radius: number;
  setRadius: (value: number) => void;
  layout: string;
  setLayout: (value: string) => void;
  navbarType: string;
  setNavbarType: (value: string) => void;
  footerType: string;
  setFooterType: (value: string) => void;
}

export const useThemeStore = create<ThemeStoreState>((set) => ({
  theme: siteConfig.theme,
  setTheme: (theme: string) => set({ theme }),
  radius: siteConfig.radius,
  setRadius: (value: number) => set({ radius: value }),
  layout: siteConfig.layout,
  setLayout: (value: string) => {
    set({ layout: value });

    // If the new layout is "semibox," also set the sidebarType to "popover"
    if (value === 'semibox') {
      useSidebar.setState({ sidebarType: 'popover' });
    }
    //
    if (value === 'horizontal') {
      // update  setNavbarType
      useThemeStore.setState({ navbarType: 'sticky' });
    }
  },
  navbarType: siteConfig.navbarType,
  setNavbarType: (value: string) => set({ navbarType: value }),
  footerType: siteConfig.footerType,
  setFooterType: (value: string) => set({ footerType: value }),
}));

interface SidebarStoreState {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  sidebarType: string;
  setSidebarType: (value: string) => void;
  subMenu: boolean;
  setSubmenu: (value: boolean) => void;
  sidebarBg: string;
  setSidebarBg: (value: string) => void;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
}

export const useSidebar = create<SidebarStoreState>((set) => ({
  collapsed: false,
  setCollapsed: (value: boolean) => set({ collapsed: value }),
  sidebarType:
    siteConfig.layout === 'semibox' ? 'popover' : siteConfig.sidebarType,
  setSidebarType: (value: string) => {
    set({ sidebarType: value });
  },
  subMenu: false,
  setSubmenu: (value: boolean) => set({ subMenu: value }),
  // background image
  sidebarBg: siteConfig.sidebarBg,
  setSidebarBg: (value: string) => set({ sidebarBg: value }),
  mobileMenu: false,
  setMobileMenu: (value: boolean) => set({ mobileMenu: value }),
}));
