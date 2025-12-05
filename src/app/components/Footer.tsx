import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSocialMediaLinks } from '@/utils/socialMediaUtils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const socialMedia = getSocialMediaLinks();

  const footerLinks = {
    explore: [
      { label: 'Tree Tours', href: '/tree-tours' },
      { label: 'News & Updates', href: '/news' },
      { label: 'History', href: '/history' },
      { label: 'About Us', href: '/about-us' },
    ],
    getInvolved: [
      { label: 'Membership', href: '/get-involved#membership' },
      { label: 'Donate', href: '/get-involved#donate' },
      { label: 'Volunteer', href: '/get-involved#volunteer' },
    ],
    resources: [
      { label: 'Riverview Lands', href: '/riverview-lands' },
      { label: 'Contact Us', href: '/contact' },
    ],
  };

  const developers = [
    {
      name: 'Mabel Castillo',
      links: [
        { url: 'https://www.linkedin.com/in/mabel-castillo-374482238', label: 'LinkedIn' },
        { url: 'https://mabs.dev', label: 'mabs.dev' },
      ],
    },
    {
      name: 'Belem Castillo',
      links: [
        { url: 'https://www.linkedin.com/in/belem-castillo/', label: 'LinkedIn' },
      ],
    },
    {
      name: 'Zaida Salazar',
      links: [
        { url: 'https://www.linkedin.com/in/zaida-salazar-correa/', label: 'LinkedIn' },
      ],
    },
  ];

  const socialMediaPlatforms = [
    {
      name: 'Facebook',
      url: socialMedia.facebook,
      icon: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      ),
    },
    {
      name: 'Instagram',
      url: socialMedia.instagram,
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      ),
    },
    {
      name: 'Twitter',
      url: socialMedia.twitter,
      icon: (
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      ),
    },
  ];

  return (
    <footer className="bg-darkgreen text-cream">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Organization Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="RHCS Logo"
                width={180}
                height={60}
                className="h-12 sm:h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm sm:text-base font-poppins text-cream/90 mb-4">
              Preserving the historic səmiq̓ʷəʔelə / Riverview Lands and its unique tree arboretum for future generations.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4">
              {socialMediaPlatforms.map((platform) => 
                platform.url ? (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors group"
                    aria-label={platform.name}
                  >
                    <svg className="w-5 h-5 text-cream group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      {platform.icon}
                    </svg>
                  </a>
                ) : null
              )}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 font-inter">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base font-poppins text-cream/80 hover:text-cream hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 font-inter">Get Involved</h3>
            <ul className="space-y-2">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base font-poppins text-cream/80 hover:text-cream hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 font-inter">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base font-poppins text-cream/80 hover:text-cream hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs sm:text-sm font-opensans text-cream/70 text-center md:text-left">
              © {currentYear} Riverview Horticultural Centre Society. All rights reserved.
            </p>

            {/* Developer Credits */}
            <div className="text-xs sm:text-sm font-opensans text-cream/70 text-center md:text-right">
              <span>Website designed and developed by </span>
              {developers.map((dev, index) => (
                <span key={dev.name}>
                  {dev.links.map((link, linkIndex) => (
                    <span key={linkIndex}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream hover:text-terracottalight transition-colors underline"
                      >
                        {linkIndex === 0 ? dev.name : link.label}
                      </a>
                      {linkIndex < dev.links.length - 1 && ' / '}
                    </span>
                  ))}
                  {index < developers.length - 1 && ', '}
                  {index === developers.length - 2 && 'and '}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;