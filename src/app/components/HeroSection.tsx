'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { HeroSectionData } from '@/utils/heroUtils';
import { tektonFont } from '@/lib/fonts';

interface HeroSectionProps {
  data: HeroSectionData | null;
  /** Optional: override default height, e.g., 'h-[300px]' */
  heightClass?: string;
  /** Optional: override default font sizes for title/description */
  textClasses?: {
    title?: string;
    description?: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  heightClass = 'h-[50vh] min-h-[400px]', // Default height
  textClasses
}) => {
  if (!data) {
    // render a placeholder or nothing if no data is provided
    return null;
  }

  const { title, description, backgroundImage, primaryButton, secondaryButton } = data;

  // Image overlay and filter styles
  const imageOverlayClasses = twMerge(
    'absolute inset-0 z-0 rounded-lg',
    backgroundImage ? 'bg-darkgreen/[.5]' : '', // Apply tint with specified opacity only if there's an image
    'brightness-90' // Apply brightness filter
  );

  const imageFilterClasses = twMerge(
    backgroundImage ? 'blur-20' : '' // Apply blur filter
  );

  const containerClasses = twMerge(
    'relative w-full flex items-center justify-center text-center p-8 overflow-hidden',
    'bg-forest-light', 
    heightClass // Apply height class
  );

  const contentWrapperClasses = 'relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto w-full';

  // Customizable text classes using props or defaults
  const defaultTitleClasses = `text-5xl font-bold mb-4 text-cream shadow-inner-soft ${tektonFont.className}`;
  const defaultDescriptionClasses = `text-xl mb-8 font-opensans text-cream max-w-2xl mx-auto shadow-inner-soft ${description?.length > 100 ? 'lg:max-w-3xl' : ''}`; // Adjust max-width for longer descriptions if needed

  const titleClasses = twMerge(defaultTitleClasses, textClasses?.title);
  const descriptionClasses = twMerge(defaultDescriptionClasses, textClasses?.description);

  return (
    <section className={containerClasses}>
      {/* Background Image (if provided) */}
      {backgroundImage && (
        <div className={twMerge('absolute inset-0 w-full h-full rounded-lg', imageFilterClasses)}>
          <Image
            src={backgroundImage}
            alt="Hero Background Image"
            fill // Next.js 15 uses 'fill' instead of layout="fill"
            style={{ objectFit: 'cover' }} // Use style prop for objectFit
            quality={75} // Adjust image quality as needed
            className="z-0 rounded-lg" // Ensure image is behind content and has rounded corners
          />
          {/* Tint Overlay */}
          <div className={imageOverlayClasses}></div>
        </div>
      )}

      {/* Content Wrapper */}
      <div className={contentWrapperClasses}>
        <h1 className={titleClasses}>{title}</h1>
        {description && ( // Only render paragraph if description exists
          <p className={descriptionClasses}>{description}</p>
        )}

        {/* Buttons */}
        {(primaryButton?.text && primaryButton.url) || (secondaryButton?.text && secondaryButton.url) ? (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {primaryButton?.text && primaryButton.url && (
              <Link
                href={primaryButton.url}
                className="px-8 py-3 bg-terracotta text-cream rounded-xl text-lg font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter
                           focus:outline-none focus:ring-2 focus:ring-terracottalight focus:ring-opacity-50"
              >
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton?.text && secondaryButton.url && (
              <Link
                href={secondaryButton.url}
                className="px-8 py-3  border-2 border-cream text-cream rounded-xl text-lg font-semibold hover:bg-forest-cream/10 transition-colors duration-300 font-inter
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HeroSection;