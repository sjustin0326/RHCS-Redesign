import React from 'react';
import ImageCarousel from './ImageCarousel';
import { Achievements } from '@/utils/aboutUtils';

interface AchievementsSectionProps {
  data: Achievements;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ data }) => {
  // Only prepare images if they exist and are valid
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
    <section id="achievements" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-8 text-center text-darkgreen">
          {data.title}
        </h2>
        
        {/* Two-column grid layout on medium+ screens */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column: Description text */}
          <div>
            {data.description && (
              <div 
                className="prose prose-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            )}
          </div>
          
          {/* Right column: Image Carousel */}
          {carouselImages && carouselImages.length > 0 && (
            <div className="flex items-center">
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