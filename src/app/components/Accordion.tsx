'use client';

import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  htmlContent: string;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, htmlContent, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-soft">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 text-left bg-darkgreen hover:bg-olive transition-colors duration-300"
        aria-expanded={isOpen}
      >
        <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-cream font-inter pr-4">
          {title}
        </span>
        <svg
          className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="#FEFAE0"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="px-4 sm:px-6 py-4 sm:py-5 bg-white prose prose-sm sm:prose-base lg:prose-lg max-w-none font-poppins"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
};

export default Accordion;