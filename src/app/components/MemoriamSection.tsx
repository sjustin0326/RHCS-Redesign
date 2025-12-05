import React from 'react';
import { MemoriamSection as MemoriamSectionData, MemoriamEntry } from '@/utils/aboutUtils';
import ImageCarousel from './ImageCarousel';
import { marked } from 'marked';

interface MemoriamSectionProps {
  sectionData: MemoriamSectionData;
  entries: MemoriamEntry[];
}

const MemoriamSection: React.FC<MemoriamSectionProps> = ({ sectionData, entries }) => {
  // Helper to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Helper to calculate years lived
  const calculateYearsLived = (birth: string, death: string) => {
    const birthDate = new Date(birth);
    const deathDate = new Date(death);
    const years = deathDate.getFullYear() - birthDate.getFullYear();
    return years;
  };

  return (
    <section
      id="in-memoriam"
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-darkcream to-cream px-4 sm:px-6"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center text-darkgreen font-inter">
          {sectionData.title}
        </h2>
        
        {sectionData.description && (
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg mx-auto mb-8 sm:mb-12 text-center text-gray-700 font-poppins max-w-3xl"
            dangerouslySetInnerHTML={{ __html: marked.parse(sectionData.description) as string }}
          />
        )}

        {/* Entries */}
        {entries.length === 0 ? (
          <p className="text-center text-gray-600 font-poppins italic">
            No memorial entries at this time.
          </p>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {entries.map((entry, index) => {
              const carouselImages = entry.images && entry.images.length > 0
                ? entry.images.map((imgSrc) => ({
                    src: imgSrc,
                    width: 1200,
                    height: 800,
                  }))
                : null;

              // Determine if we have images to show
              const hasImages = carouselImages !== null;

              return (
                <div
                  key={entry.slug}
                  className="bg-white rounded-2xl shadow-medium p-6 sm:p-8 lg:p-10 hover:shadow-strong transition-shadow duration-300"
                >
                  <div className={`grid grid-cols-1 ${hasImages ? 'lg:grid-cols-2' : ''} gap-6 sm:gap-8 items-start`}>
                    {/* Text Content */}
                    <div className={hasImages ? (index % 2 === 0 ? 'lg:order-1' : 'lg:order-2') : ''}>
                      {/* Name */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-darkgreen mb-3 font-inter">
                        {entry.fullName}
                      </h3>
                      
                      {/* Dates */}
                      <p className="text-base sm:text-lg text-gray-600 mb-4 font-opensans">
                        {formatDate(entry.dateOfBirth)} – {formatDate(entry.dateOfDeath)}
                        <span className="text-sm text-gray-500 ml-2">
                          ({calculateYearsLived(entry.dateOfBirth, entry.dateOfDeath)} years)
                        </span>
                      </p>

                      {/* Description */}
                      {entry.description && (
                        <div
                          className="prose prose-sm sm:prose-base text-gray-700 font-poppins max-w-none"
                          dangerouslySetInnerHTML={{ __html: marked.parse(entry.description) as string }}
                        />
                      )}
                    </div>

                    {/* Images (only if they exist) */}
                    {hasImages && (
                      <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                        <ImageCarousel
                          images={carouselImages}
                          altText={`In memory of ${entry.fullName}`}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MemoriamSection;