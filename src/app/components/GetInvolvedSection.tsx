import React from 'react';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import { GetInvolved } from '@/utils/aboutUtils';

interface GetInvolvedSectionProps {
  data: GetInvolved;
}

const GetInvolvedSection: React.FC<GetInvolvedSectionProps> = ({ data }) => {
  // Prepare images for carousel (only if images exist)
  const carouselImages = data.images && data.images.length > 0
    ? data.images.map((imgSrc) => ({
        src: imgSrc,
        width: 1200,  // Default width
        height: 800,  // Default height
      }))
    : null;

  return (
    <section id="get-involved" className="py-16 bg-gradient-to-b from-cream to-darkcream">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-darkgreen">
          {data.title}
        </h2>
        
        {/* Image Carousel - Only show if images exist */}
        {carouselImages && (
          <div className="mb-10">
            <ImageCarousel 
              images={carouselImages}
              altText="Volunteers and Members"
            />
          </div>
        )}
        
        <div 
          className="prose prose-lg mx-auto mb-8 text-center text-gray-700"
          dangerouslySetInnerHTML={{ __html: data.htmlContent }}
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={data.primaryButton.url}
            className="px-8 py-3 bg-terracotta text-cream rounded-xl text-lg font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300"
          >
            {data.primaryButton.text}
          </Link>
          
          <Link
            href={data.secondaryButton.url}
            className="px-8 py-3 border-2 border-terracotta text-terracotta rounded-xl text-lg font-semibold hover:bg-terracotta hover:text-cream transition-colors duration-300"
          >
            {data.secondaryButton.text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;