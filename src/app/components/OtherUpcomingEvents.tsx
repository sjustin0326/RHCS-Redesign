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
      <div className="space-y-4">
        {currentEvents.map((event) => {
          const isDescriptionTruncated = event.description && event.description.length > 100;
          const truncatedDescription = event.description 
            ? event.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
            : '';

          return (
            <div
              key={event.slug}
              className=" bg-white rounded-xl shadow-soft hover:shadow-strong transition-shadow duration-300"
            >

              <div className="flex flex-row justify-center gap-6 h-full">
                {/* Date Display */}
                <div className="flex justify-center sm:justify-start sm:self-stretch">
                  <div className="bg-darkgreen rounded-l-xl flex flex-col justify-center min-w-[5rem] sm:w-[5rem] text-center sm:h-full">
                    <div className="text-xs font-poppins font-bold text-white uppercase tracking-wide">{event.month}</div>
                    <div className="text-2xl my-2 font-poppins font-bold text-white">{event.dayOfMonth}</div>
                    <div className="text-xs font-poppins font-bold text-white capitalize">{event.dayOfWeek}</div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center my-4 pr-6">
                  <h4 className="text-md md:text-lg font-semibold text-darkgreen mb-2">{event.title}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <svg className="w-4 h-4" fill="#283618" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className='lex items-start gap-2 text-sm md:text-md font-opensans font-semibold text-olive'>{event.formattedStartTime} - {event.formattedEndTime}</span>
                        {event.location && ( <span className="flex items-start gap-2 text-sm md:text-md font-opensans font-semibold text-olive"><svg className="w-4 h-4" fill="#283618" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>{event.location}</span>)}
                    </div>
                  </div>
                  {event.description && (
                    <div className="text-sm md:text-md font-opensans font-semibold text-gray-700">
                      <div dangerouslySetInnerHTML={{ __html: isDescriptionTruncated ? truncatedDescription : event.description }} />
                      {isDescriptionTruncated && (
                        <button onClick={() => handleReadMore(event)} className="text-terracotta hover:text-darkgreen font-medium mt-1 transition-colors duration-200 underline">Read More &rarr;</button>
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