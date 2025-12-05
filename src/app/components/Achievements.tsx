import React from 'react';
import ImageCarousel from './ImageCarousel';
import { Achievements } from '@/utils/aboutUtils';

interface AchievementsSectionProps {
  data: Achievements;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ data }) => {
  const carouselImages = data.images && data.images.length > 0
    ? data.images
        .filter(imgSrc => imgSrc && imgSrc.trim() !== '')
        .map((imgSrc) => ({
          src: imgSrc,
          width: 1200,
          height: 800,
        }))
    : null;

  return (
    <section 
      id="achievements" 
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center text-darkgreen font-inter">
          {data.title}
        </h2>
        
        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left column: Description text */}
          <div className="order-2 lg:order-1">
            {data.description && (
              <div
                className="prose prose-sm sm:prose-base lg:prose-lg text-gray-700 font-poppins max-w-none"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            )}
          </div>
          
          {/* Right column: Image Carousel */}
          {carouselImages && carouselImages.length > 0 && (
            <div className="order-1 lg:order-2 flex items-center">
              <ImageCarousel
                images={carouselImages}
                altText={data.title}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;