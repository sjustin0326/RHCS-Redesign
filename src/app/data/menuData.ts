export interface SubPage {
    name: string;
    href: string;
    id?: string; // For scrolling to sections
  }
  
  export interface MenuItem {
    name: string;
    href: string;
    subPages?: SubPage[];
  }
  
  export const menuData: MenuItem[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Tree Tours",
      href: "/tree-tours",
      // subPages: [
      //   { name: "Schedule", href: "/events", id: "calendar" },
      //   { name: "Maps and Virtual Tree Tour", href: "/events", id: "maps-tour" },
      //   { name: "Interactive Tree Survey Map", href: "/events", id: "tree-map" },
      //   { name: "Visit Information", href: "/events", id: "plan-visit" },
      // ],
    },
    {
      name: "News",
      href: "/news",
    },
    {
      name: "Photo Gallery",
      href: "/gallery",
    },
    {
      name: "Get Involved",
      href: "/get-involved",
      subPages: [
        { name: "Membership", href: "/support", id: "membership" },
        { name: "Donations", href: "/support", id: "donations" },
        { name: "Volunteering", href: "/support", id: "volunteering" },
      ],
    },
    {
      name: "About Us",
      href: "/about-us",
      subPages: [
        { name: "Mission, Vision, Founding History", href: "/about-us", id: "mission-vision" },
        { name: "About Riverview Lands and Finnie's Garden", href: "/about-us/riverview-lands", id: "riverview-lands" },
        { name: "Our Achievements", href: "/about", id: "achievements" },
        { name: "In Memoriam", href: "/about", id: "memoriam" },
      ],
    },
    {
      name: "Resource Library",
      href: "/resources",
      subPages: [
        { name: "Reports", href: "/resources", id: "reports" },
        { name: "Brochures and Books", href: "/resources", id: "brochures" },
        { name: "Other Blogs", href: "/resources", id: "blogs" },
        { name: "Newsletter Archive", href: "/resources", id: "newsletter" },
      ],
    },
  ];