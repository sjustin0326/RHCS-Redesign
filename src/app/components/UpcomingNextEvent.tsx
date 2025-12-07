'use client';

import React, { useState } from 'react';
import { SerializedEvent } from '@/utils/eventUtils';
import Modal from './Modal';
import EventDetailsModal from './EventDetailsModal';

interface UpcomingNextEventProps {
  event: SerializedEvent;
}

const UpcomingNextEvent: React.FC<UpcomingNextEventProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plainText = event.descriptionHTML 
    ? event.descriptionHTML.replace(/<[^>]*>/g, '')
    : '';
  const isDescriptionTruncated = plainText.length > 200;
  const truncatedDescription = isDescriptionTruncated 
    ? plainText.substring(0, 200) + '...'
    : plainText;

  return (
    <>
      <div className="bg-white rounded-xl shadow-medium hover:shadow-strong transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 md:gap-6 h-full">
          {/* Date Display */}
          <div className="flex justify-center sm:justify-start sm:self-stretch">
            <div className="bg-darkgreen rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none flex flex-col justify-center py-3 sm:py-4 md:py-6 px-8 sm:px-10 md:px-12 w-full sm:w-auto sm:min-w-[7rem] text-center">
              <div className="text-sm sm:text-base md:text-lg font-poppins font-bold text-white uppercase tracking-wide">
                {event.month}
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl my-1 sm:my-2 font-poppins font-bold text-white">
                {event.dayOfMonth}
              </div>
              <div className="text-sm sm:text-base md:text-lg font-poppins font-bold text-white capitalize">
                {event.dayOfWeek}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="flex-1 min-w-0 my-4 mx-4 sm:mx-0 sm:my-4 sm:mr-4 md:mr-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-darkgreen mb-3 font-inter">
              {event.title}
            </h3>

            <div className="space-y-2 mb-4">
              {/* Time */}
              <div className="flex items-center gap-2 text-sm sm:text-base md:text-md font-opensans font-semibold text-olive">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="#606C38" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="break-words">{event.formattedStartTime} - {event.formattedEndTime}</span>
              </div>

              {/* Location */}
              {event.location && (
                <div className="flex items-start gap-2 text-sm sm:text-base md:text-md font-opensans font-semibold text-olive">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" fill="#606C38" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="break-words">{event.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {event.descriptionHTML && (
              <div className="text-sm sm:text-base md:text-md font-poppins text-gray-700">
                {isDescriptionTruncated ? (
                  <p>{truncatedDescription}</p>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: event.descriptionHTML }} />
                )}
                {isDescriptionTruncated && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-terracotta hover:text-terracottalight font-medium mt-2 transition-colors duration-200 underline font-inter text-sm sm:text-base"
                  >
                    Read More &rarr;
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EventDetailsModal event={event} />
      </Modal>
    </>
  );
};

export default UpcomingNextEvent;