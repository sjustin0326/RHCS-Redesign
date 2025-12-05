import React from 'react';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import { GetInvolved } from '@/utils/aboutUtils';

interface GetInvolvedSectionProps {
  data: GetInvolved;
}

const GetInvolvedSection: React.FC<GetInvolvedSectionProps> = ({ data }) => {
  const carouselImages = data.images && data.images.length > 0
    ? data.images.map((imgSrc) => ({
        src: imgSrc,
        width: 1200,
        height: 800,
      }))
    : null;

  return (
    <section 
      id="get-involved" 
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-cream to-darkcream px-4 sm:px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center text-darkgreen font-inter">
          {data.title}
        </h2>
        
        {/* Image Carousel */}
        {carouselImages && (
          <div className="mb-8 sm:mb-10">
            <ImageCarousel
              images={carouselImages}
              altText="Volunteers and Members"
            />
          </div>
        )}
        
        {/* Content */}
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg mx-auto mb-6 sm:mb-8 text-center text-gray-700 font-poppins max-w-3xl"
          dangerouslySetInnerHTML={{ __html: data.htmlContent }}
        />
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
          <Link
            href={data.primaryButton.url}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-terracotta text-cream rounded-xl text-base sm:text-lg font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter text-center"
          >
            {data.primaryButton.text}
          </Link>
          <Link
            href={data.secondaryButton.url}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-terracotta text-terracotta rounded-xl text-base sm:text-lg font-semibold hover:bg-terracotta hover:text-cream transition-colors duration-300 font-inter text-center"
          >
            {data.secondaryButton.text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;