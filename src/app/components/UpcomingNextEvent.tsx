import React from 'react';
import { ParsedEvent } from '@/utils/eventUtils';

interface UpcomingNextEventProps {
  event: ParsedEvent;
}

const UpcomingNextEvent: React.FC<UpcomingNextEventProps> = ({ event }) => {
  return (
    <div className="bg-cream rounded-lg p-4 sm:p-6 mb-4">
      <div className="flex flex-col justify-center sm:flex-row gap-6 h-full">
        {/* Date Display */}
        <div className="flex justify-center sm:justify-start sm:self-stretch">
          <div className="bg-darkgreen flex flex-col justify-center py-6 sm:py-0 rounded-md min-w-[5rem] sm:w-[5rem] text-center sm:h-full">
            <div className="text-xs font-bold text-cream uppercase tracking-wide">
              {event.month}
            </div>
            <div className="text-3xl my-2 font-bold text-cream">
              {event.dayOfMonth}
            </div>
            <div className="text-xs font-bold text-cream capitalize">
              {event.dayOfWeek}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-darkgreen mb-3">
            {event.title}
          </h3>
          
          <div className="space-y-2 mb-4">
            {/* Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 flex-shrink-0" fill="#283618" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="break-words">{event.formattedStartTime} - {event.formattedEndTime}</span>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="#283618" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="break-words">{event.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className="text-sm text-gray-700 prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingNextEvent;