'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { menuData, MenuItem } from '../data/menuData';


const HamburgerIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" className="h-6 w-6">
    <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
  </svg>
);

const ChevronDown = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/>
  </svg>
);

const ChevronUp = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M18 15l-6-6-6 6"/>
  </svg>
);

const ArrowDropDown = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5"/>
  </svg>
);

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobile(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDesktopDropdown = (menuName: string) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const handleMobileExpand = (menuName: string) => {
    setExpandedMobile(expandedMobile === menuName ? null : menuName);
  };

  const handleSubPageClick = (href: string, id?: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
    
    if (id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const isActivePage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };


  const desktopMenuItems = menuData.filter(item => item.name !== "Home");

  // Function to check if dropdown should open to the left (for last 2 items with dropdowns)
  const shouldOpenLeft = (item: MenuItem) => {
    // Check if this is one of the last 2 items that have subPages
    const itemsWithDropdowns = desktopMenuItems.filter(menuItem => menuItem.subPages);
    const dropdownIndex = itemsWithDropdowns.findIndex(menuItem => menuItem.name === item.name);
    const isLastTwoDropdowns = dropdownIndex >= itemsWithDropdowns.length - 2;
    
    return isLastTwoDropdowns;
  };

  return (
    <nav className={`sticky top-0 z-50 bg-nav-bg shadow-nav ${className}`} ref={dropdownRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/logo cream.png"
              alt="The Riverview Horticultural Centre Society"
              width={280}
              height={40}
              className="h-12 w-auto "
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex items-center space-x-1">
              {desktopMenuItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.subPages ? (
                    <div className="relative">
                      <button
                        onClick={() => handleDesktopDropdown(item.name)}
                        className={`group flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                          isActivePage(item.href)
                            ? 'text-nav-text-desktop-active bg-nav-bg-hover'
                            : 'text-nav-text-desktop hover:text-nav-text-desktop-hover hover:bg-nav-bg-hover'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ArrowDropDown />
                      </button>

                      {/* Desktop Dropdown */}
                      {openDropdown === item.name && (
                        <div className={`absolute top-full mt-1 w-64 bg-nav-dropdown rounded-lg shadow-dropdown border border-nav-border z-50 animate-dropdown-appear ${
                          shouldOpenLeft(item) ? 'right-0' : 'left-0'
                        }`}>
                          <div className="py-2">
                            {item.subPages.map((subPage) => (
                              <Link
                                key={subPage.name}
                                href={subPage.href}
                                onClick={() => handleSubPageClick(subPage.href, subPage.id)}
                                className="block px-4 py-2 text-sm text-nav-subtext-desktop hover:text-nav-subtext-desktop-hover hover:bg-nav-subtext-desktop-bg-hover transition-colors duration-150"
                              >
                                {subPage.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                        isActivePage(item.href)
                          ? 'text-nav-text-desktop-active bg-nav-bg-hover'
                          : 'text-nav-text-desktop hover:text-nav-text-desktop-hover hover:bg-nav-bg-hover'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-nav-hamburger hover:text-nav-text-desktop-hover hover:bg-nav-bg-hover transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-dropdown border-t border-nav-border z-40 animate-slide-down">
          <div className="px-4 py-2 space-y-1 max-h-[80vh] overflow-y-auto">
            {menuData.map((item) => (
              <div key={item.name}>
                {item.subPages ? (
                  <div>
                    <button
                      onClick={() => handleMobileExpand(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-3 text-base font-medium text-nav-text-mobile hover:text-nav-text-mobile-hover hover:bg-gray-50 rounded-md transition-colors duration-200 ${
                        isActivePage(item.href) ? 'text-nav-text-mobile-hover bg-gray-50' : ''
                      }`}
                    >
                      <span>{item.name}</span>
                      {expandedMobile === item.name ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {/* Mobile Submenu */}
                    {expandedMobile === item.name && (
                      <div className="ml-4 space-y-1 animate-submenu-expand">
                        {item.subPages.map((subPage) => (
                          <Link
                            key={subPage.name}
                            href={subPage.href}
                            onClick={() => handleSubPageClick(subPage.href, subPage.id)}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-nav-text-mobile-hover hover:bg-gray-50 rounded-md transition-colors duration-150"
                          >
                            {subPage.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-3 text-base font-medium text-nav-text-mobile hover:text-nav-text-mobile-hover hover:bg-gray-50 rounded-md transition-colors duration-200 ${
                      isActivePage(item.href) ? 'text-nav-text-mobile-hover bg-gray-50' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;