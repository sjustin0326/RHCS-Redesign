'use client';

import React, { useState } from 'react';
import { SerializedEvent } from '@/utils/eventUtils';
import Modal from './Modal';
import EventDetailsModal from './EventDetailsModal';

interface OtherUpcomingEventsProps {
  events: SerializedEvent[]; // Cambiar de ParsedEvent[] a SerializedEvent[]
}

const OtherUpcomingEvents: React.FC<OtherUpcomingEventsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<SerializedEvent | null>(null);

  if (events.length === 0) {
    return null;
  }

  const handleReadMore = (event: SerializedEvent) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="space-y-4 px-4">
        {events.map((event) => {
          const isDescriptionTruncated = event.description && event.description.length > 100;
          const truncatedDescription = event.description 
            ? event.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
            : '';

          return (
            <div
              key={event.slug}
              className="bg-cream border-darkgreen border-2 rounded-lg hover:shadow-md transition-shadow p-4"
            >
              <div className="flex flex-row justify-center gap-6 h-full">
                {/* Date Display */}
                <div className="flex justify-center sm:justify-start sm:self-stretch">
                  <div className="bg-darkgreen rounded-lg flex flex-col justify-center py-4 sm:py-0 min-w-[5rem] sm:w-[5rem] text-center sm:h-full">
                    <div className="text-xs pt-2 font-bold text-cream uppercase tracking-wide">
                      {event.month}
                    </div>
                    <div className="text-2xl font-bold text-cream">
                      {event.dayOfMonth}
                    </div>
                    <div className="text-xs pb-2 font-bold text-cream capitalize">
                      {event.dayOfWeek}
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {event.title}
                  </h4>

                  <div className="space-y-1 text-sm text-gray-600">
                    {/* Time and Location on same line for smaller cards */}
                    <div className="flex flex-wrap items-center gap-2">
                      <svg className="w-4 h-4" fill="#283618" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>
                        {event.formattedStartTime} - {event.formattedEndTime}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="#283618" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description - truncated for card view */}
                  {event.description && (
                    <div className="my-2 text-sm text-gray-700">
                      <div dangerouslySetInnerHTML={{
                        __html: isDescriptionTruncated ? truncatedDescription : event.description
                      }} />
                      {isDescriptionTruncated && (
                        <button
                          onClick={() => handleReadMore(event)}
                          className="text-terracotta hover:text-darkgreen font-medium mt-1 transition-colors duration-200 underline"
                        >
                          Read more
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

      {/* Modal */}
      <Modal isOpen={!!selectedEvent} onClose={closeModal}>
        {selectedEvent && <EventDetailsModal event={selectedEvent} />}
      </Modal>
    </>
  );
};

export default OtherUpcomingEvents;