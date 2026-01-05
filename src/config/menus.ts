import {
  DashBoard,
  Device,
  Users,
  Messages,
  Files,
  Graph,
} from "@/components/svg";

export type MenuItem = {
  title: string;
  icon?: any;
  href?: string;
  isHeader?: boolean;
  child?: MenuItem[];
  multi_menu?: MenuItem[];
};

export const menusConfig: {
  mainNav: MenuItem[];
  sidebarNav: {
    modern: MenuItem[];
    classic: MenuItem[];
  };
} = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      href: "/",
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/",
      },
      {
        title: "Flow Builder",
        icon: Graph,
        href: "/waba-numbers",
      },
      {
        title: "WABA Numbers",
        icon: Device,
        href: "/waba-numbers",
      },
      {
        title: "WABA Groups",
        icon: Users,
        href: "/waba-groups",
      },
      {
        title: "Inbox",
        icon: Messages,
        href: "/inbox",
      },
      {
        title: "Templates",
        icon: Files,
        href: "/templates",
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/",
      },
      {
        title: "Flow Builder",
        icon: Graph,
        href: "/waba-numbers",
      },
      {
        title: "WABA Numbers",
        icon: Device,
        href: "/waba-numbers",
      },
      {
        title: "WABA Groups",
        icon: Users,
        href: "/waba-groups",
      },
      {
        title: "Inbox",
        icon: Messages,
        href: "/inbox",
      },
      {
        title: "Templates",
        icon: Files,
        href: "/templates",
      },
    ],
  },
};
