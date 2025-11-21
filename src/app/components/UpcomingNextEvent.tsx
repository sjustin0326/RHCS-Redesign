'use client';

import React, { useState } from 'react';
import { SerializedEvent } from '@/utils/eventUtils';
import Modal from './Modal';
import EventDetailsModal from './EventDetailsModal';

interface UpcomingNextEventProps {
  event: SerializedEvent; // Cambiar de ParsedEvent a SerializedEvent
}

const UpcomingNextEvent: React.FC<UpcomingNextEventProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if description is truncated (you can adjust this logic)
  const isDescriptionTruncated = event.description && event.description.length > 200;

  const truncatedDescription = event.description 
    ? event.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
    : '';

  return (
    <>
      <div className="bg-white rounded-lg  mb-4 shadow-strong">
        <div className="flex flex-col justify-center rounded-xl  sm:flex-row gap-2 md:gap-6 h-full ">
          {/* Date Display */}
          <div className="flex md:justify-center justify-start self-stretch ">
            <div className="bg-darkgreen rounded-t-lg md:rounded-l-xl flex flex-col md:justify-center md:py-6  py-2 md: md:px-12 min-w-[5rem] w-full text-center h-full">
              <div className="text-lg font-poppins font-bold text-white uppercase tracking-wide">
                {event.month}
              </div>
              <div className="text-3xl my-2 font-poppins font-bold text-white">
                {event.dayOfMonth}
              </div>
              <div className="text-md font-poppins font-bold text-white capitalize">
                {event.dayOfWeek}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="flex-1 min-w-0 my-4 mx-4 md:mx-0 md:mr-6">
            <h3 className="text-md md:text-lg font-semibold text-darkgreen mb-3">
              {event.title}
            </h3>

            <div className="space-y-2 mb-4">
              {/* Time */}
              <div className="flex items-center gap-2 text-sm md:text-md font-opensans font-semibold text-olive">
                <svg className="w-4 h-4 flex-shrink-0" fill="#606C38" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="break-words">{event.formattedStartTime} - {event.formattedEndTime}</span>
              </div>

              {/* Location */}
              {event.location && (
                <div className="flex items-start gap-2 text-sm md:text-md font-opensans font-semibold text-olive">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="#606C38" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="break-words">{event.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {event.description && (
              <div className="text-sm md:text-md font-opensans font-semibold text-gray-700">
                <div dangerouslySetInnerHTML={{ __html: isDescriptionTruncated ? truncatedDescription : event.description }} />
                {isDescriptionTruncated && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-terracotta hover:text-darkgreen font-medium mt-1 transition-colors duration-200 underline mb-4"
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