import React from 'react';
import Image from 'next/image';
import ImageCarousel from './ImageCarousel';
import { Achievements } from '@/utils/aboutUtils';

interface AchievementsSectionProps {
  data: Achievements;
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ data }) => {
  // Prepare images for carousel format
  const carouselImages = data.images.map((imgSrc) => ({
    src: imgSrc,
    width: 1200,
    height: 800,
  }));

  return (
    <section id="achievements" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-darkgreen">
          {data.title}
        </h2>
        
        {data.description && (
          <div 
            className="prose prose-lg mx-auto mb-10 text-center text-gray-700"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        )}
        
        {/* Image Carousel */}
        <div className="mt-8">
          <ImageCarousel 
            images={carouselImages}
            altText={data.title}
          />
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;