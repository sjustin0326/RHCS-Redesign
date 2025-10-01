import React from 'react';
import { ParsedEvent } from '@/utils/eventUtils';

interface OtherUpcomingEventsProps {
  events: ParsedEvent[];
}

const OtherUpcomingEvents: React.FC<OtherUpcomingEventsProps> = ({ events }) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div 
          key={event.slug} 
          className="bg-cream border-darkgreen border-2 rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col justify-center sm:flex-row gap-6 h-full">
            {/* Date Display */}
            <div className="flex justify-center sm:justify-start sm:self-stretch">
              <div className="bg-darkgreen flex flex-col justify-center px-2 py-4 sm:py-0 min-w-[5rem] sm:w-[5rem] text-center sm:h-full">
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
                <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                  <div dangerouslySetInnerHTML={{ 
                    __html: event.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
                  }} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherUpcomingEvents;