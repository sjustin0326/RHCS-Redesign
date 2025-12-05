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
  heightClass = 'h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[350px] sm:min-h-[400px]',
  textClasses
}) => {
  if (!data) {
    return null;
  }

  const { title, description, backgroundImage, primaryButton, secondaryButton } = data;

  const imageOverlayClasses = twMerge(
    'absolute inset-0 z-0 rounded-lg',
    backgroundImage ? 'bg-darkgreen/[.5]' : '',
    'brightness-90'
  );

  const imageFilterClasses = twMerge(
    backgroundImage ? 'blur-20' : ''
  );

  const containerClasses = twMerge(
    'relative w-full flex items-center justify-center text-center p-4 sm:p-6 md:p-8 overflow-hidden',
    'bg-forest-light',
    heightClass
  );

  const contentWrapperClasses = 'relative z-10 flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-4';
  const defaultTitleClasses = `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tekton font-bold mb-3 sm:mb-4 text-cream shadow-inner-soft ${tektonFont.className} leading-tight`;
  const defaultDescriptionClasses = `text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 font-poppins text-cream max-w-2xl lg:max-w-3xl mx-auto shadow-inner-soft ${description && description.length > 100 ? 'lg:max-w-4xl' : ''}`;

  const titleClasses = twMerge(defaultTitleClasses, textClasses?.title);
  const descriptionClasses = twMerge(defaultDescriptionClasses, textClasses?.description);

  return (
    <section className={containerClasses}>
      {/* Background Image */}
      {backgroundImage && (
        <div className={twMerge('absolute inset-0 w-full h-full rounded-lg', imageFilterClasses)}>
          <Image
            src={backgroundImage}
            alt="Hero Background Image"
            fill
            style={{ objectFit: 'cover' }}
            quality={75}
            priority
            className="z-0 rounded-lg"
            sizes="100vw"
          />
          <div className={imageOverlayClasses}></div>
        </div>
      )}

      {/* Content Wrapper */}
      <div className={contentWrapperClasses}>
        <h1 className={titleClasses}>{title}</h1>
        {description && (
          <p className={descriptionClasses}>{description}</p>
        )}

        {/* Buttons */}
        {(primaryButton?.text && primaryButton.url) || (secondaryButton?.text && secondaryButton.url) ? (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto">
            {primaryButton?.text && primaryButton.url && (
              <Link
                href={primaryButton.url}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-terracotta text-cream rounded-xl text-base sm:text-lg font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter focus:outline-none focus:ring-2 focus:ring-terracottalight focus:ring-opacity-50 text-center"
              >
                {primaryButton.text}
              </Link>
            )}
            {secondaryButton?.text && secondaryButton.url && (
              <Link
                href={secondaryButton.url}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-cream text-cream rounded-xl text-base sm:text-lg font-semibold hover:bg-forest-cream/10 transition-colors duration-300 font-inter focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-center"
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