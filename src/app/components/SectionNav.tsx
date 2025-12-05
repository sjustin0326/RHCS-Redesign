"use client";

import { useState, useEffect } from 'react';

interface SectionItem {
  label: string;
  targetId: string;
}

interface SectionNavProps {
  sections: SectionItem[];
}

const SectionNav: React.FC<SectionNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      let currentSectionId = '';
      const offset = 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            currentSectionId = section.targetId;
            break;
          }
        }
      }

      if (!currentSectionId && sections.length > 0) {
        currentSectionId = sections[0].targetId;
      }
      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const baseClasses = "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-inter font-medium transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 whitespace-nowrap";
  const inactiveClasses = "bg-darkcream text-gray-600 hover:bg-terracotta-300";
  const activeClasses = "bg-darkgreen text-white shadow-md";

  return (
    <nav className="w-full py-3 sm:py-4 md:pt-8 lg:pt-12 mb-6 sm:mb-8 sticky top-0 bg-cream bg-opacity-90 backdrop-blur-sm z-40 shadow-soft">
      <div className="container mx-auto flex justify-start sm:justify-center items-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto px-4 sm:px-6 scrollbar-hide flex-nowrap sm:flex-wrap">
        {sections.map((section) => (
          <a
            key={section.targetId}
            href={`#${section.targetId}`}
            className={`${baseClasses} ${
              activeSection === section.targetId ? activeClasses : inactiveClasses
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SectionNav;