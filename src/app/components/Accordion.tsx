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
    <div className="border-b border-gray-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-6 text-left bg-darkcream hover:bg-terracotta-300 transition-colors duration-300 rounded-t-lg"
        aria-expanded={isOpen}
      >
        <span className="text-xl font-semibold text-darkgreen">{title}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="px-6 py-4 bg-white prose max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
};

export default Accordion;