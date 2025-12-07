'use client';

import React, { useState } from 'react';
import { SerializedEvent } from '@/utils/eventUtils';
import Modal from './Modal';
import EventDetailsModal from './EventDetailsModal';
import Pagination from './Pagination';

interface OtherUpcomingEventsProps {
  events: SerializedEvent[];
}

const ITEMS_PER_PAGE = 3;

const OtherUpcomingEvents: React.FC<OtherUpcomingEventsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<SerializedEvent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (events.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = events.slice(startIndex, endIndex);

  const handleReadMore = (event: SerializedEvent) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        {currentEvents.map((event) => {
          // Usa descriptionHTML para truncar
          const plainText = event.descriptionHTML 
            ? event.descriptionHTML.replace(/<[^>]*>/g, '')
            : '';
          const isDescriptionTruncated = plainText.length > 100;
          const truncatedDescription = isDescriptionTruncated 
            ? plainText.substring(0, 100) + '...'
            : plainText;

          return (
            <div
              key={event.slug}
              className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 md:gap-6 h-full">
                {/* Date Display */}
                <div className="flex justify-center sm:justify-start sm:self-stretch">
                  <div className="bg-darkgreen rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none flex flex-col justify-center py-2 sm:py-3 md:py-4 px-6 sm:px-8 md:px-10 w-full sm:w-auto sm:min-w-[5rem] md:min-w-[6rem] text-center">
                    <div className="text-xs sm:text-sm font-poppins font-bold text-white uppercase tracking-wide">
                      {event.month}
                    </div>
                    <div className="text-2xl sm:text-3xl my-1 sm:my-2 font-poppins font-bold text-white">
                      {event.dayOfMonth}
                    </div>
                    <div className="text-xs sm:text-sm font-poppins font-bold text-white capitalize">
                      {event.dayOfWeek}
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center my-3 sm:my-4 mx-4 sm:mx-0 sm:pr-4 md:pr-6">
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold text-darkgreen mb-2 font-inter">
                    {event.title}
                  </h4>
                  <div className="space-y-1.5 sm:space-y-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-opensans font-semibold text-olive">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="#606C38" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{event.formattedStartTime} - {event.formattedEndTime}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="#606C38" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="break-words">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {event.descriptionHTML && (
                    <div className="text-sm sm:text-base font-poppins text-gray-700">
                      {isDescriptionTruncated ? (
                        <p>{truncatedDescription}</p>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: event.descriptionHTML }} />
                      )}
                      {isDescriptionTruncated && (
                        <button
                          onClick={() => handleReadMore(event)}
                          className="text-terracotta hover:text-terracottalight font-medium mt-1.5 sm:mt-2 transition-colors duration-200 underline font-inter text-sm sm:text-base"
                        >
                          Read More &rarr;
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      <Modal isOpen={!!selectedEvent} onClose={closeModal}>
        {selectedEvent && <EventDetailsModal event={selectedEvent} />}
      </Modal>
    </>
  );
};

export default OtherUpcomingEvents;