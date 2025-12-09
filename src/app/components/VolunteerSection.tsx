'use client';

import React, { useState } from 'react';
import { VolunteerSection as VolunteerSectionData, VolunteerPosition } from '@/utils/getInvolved';
import Modal from './Modal';
import Pagination from './Pagination';
import ImageCarousel from './ImageCarousel';
import { marked } from 'marked';

interface VolunteerSectionProps {
  sectionData: VolunteerSectionData;
  positions: VolunteerPosition[];
  carouselImages?: { src: string; width: number; height: number; }[];
}

const ITEMS_PER_PAGE = 6;

const VolunteerSection: React.FC<VolunteerSectionProps> = ({ 
  sectionData, 
  positions,
  carouselImages = []
}) => {
  const [selectedPosition, setSelectedPosition] = useState<VolunteerPosition | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(positions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPositions = positions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getContactInfo = (position: VolunteerPosition) => {
    if (position.contactType === 'Email' && position.contactEmail) {
      return {
        text: `Email: ${position.contactEmail}`,
        subject: `Volunteer - ${position.title}`,
      };
    }
    if (position.contactType === 'External Link' && position.contactURL) {
      return {
        url: position.contactURL,
      };
    }
    return null;
  };

  return (
    <section id="volunteer" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center text-darkgreen font-inter">
          {sectionData.title}
        </h2>

        

        {/* Description */}
        {sectionData.description && (
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg mx-auto mb-10 sm:mb-12 text-gray-700 font-poppins text-center max-w-3xl"
            dangerouslySetInnerHTML={{ __html: marked.parse(sectionData.description) as string }}
          />
        )}

        {/*Image Carousel*/}
        {carouselImages.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <ImageCarousel
              images={carouselImages}
              altText="Volunteer Activities"
              maxWidth="60%"
            />
          </div>
        )}

        {/* Positions Grid */}
        {positions.length === 0 ? (
          <p className="text-center text-gray-600 font-poppins italic">
            No volunteer positions available at this time. Check back soon!
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPositions.map((position) => (
                <div
                  key={position.slug}
                  className="bg-cream rounded-2xl p-6 border-2 border-darkgreen/10 hover:border-darkgreen/30 hover:shadow-medium transition-all cursor-pointer group"
                  onClick={() => setSelectedPosition(position)}
                >
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-darkgreen mb-3 font-inter group-hover:text-terracotta transition-colors">
                    {position.title}
                  </h3>

                  {/* Time Commitment */}
                  {position.timeCommitment && (
                    <p className="text-sm text-gray-600 font-opensans mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {position.timeCommitment}
                    </p>
                  )}

                  {/* Truncated Description */}
                  <div className="text-sm sm:text-base text-gray-700 font-poppins line-clamp-3 mb-4">
                    <div dangerouslySetInnerHTML={{ __html: position.htmlDescription }} />
                  </div>

                  {/* Learn More Link */}
                  <button className="text-terracotta font-semibold text-sm sm:text-base font-inter flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

        {/* Modal for Position Details */}
        {selectedPosition && (
          <Modal isOpen={!!selectedPosition} onClose={() => setSelectedPosition(null)}>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-darkgreen font-inter">
                  {selectedPosition.title}
                </h2>
                {selectedPosition.timeCommitment && (
                  <p className="text-sm text-gray-600 font-opensans mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {selectedPosition.timeCommitment}
                  </p>
                )}
              </div>

              {/* Description */}
              <div
                className="prose prose-sm sm:prose-base max-w-none text-gray-700 font-poppins"
                dangerouslySetInnerHTML={{ __html: selectedPosition.htmlDescription }}
              />

              {/* Contact Information */}
              {(() => {
                const contactInfo = getContactInfo(selectedPosition);
                if (!contactInfo) return null;

                if ('url' in contactInfo) {
                  return (
                    <div className="pt-4 border-t border-gray-200">
                      <a
                        href={contactInfo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-cream rounded-xl font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Apply Now
                      </a>
                    </div>
                  );
                }

                return (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 font-opensans mb-3">
                      Interested? Send an email to apply:
                    </p>
                    <a
                      href={`mailto:${selectedPosition.contactEmail}?subject=${encodeURIComponent(contactInfo.subject)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-terracotta text-cream rounded-xl font-semibold shadow-md hover:bg-terracottalight transition-colors duration-300 font-inter"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {contactInfo.text}
                    </a>
                  </div>
                );
              })()}
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default VolunteerSection;