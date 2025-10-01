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
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            {/* Date Display */}
            <div className="flex flex-col items-center min-w-[60px]">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {event.month}
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {event.dayOfMonth}
              </div>
              <div className="text-xs text-gray-600 capitalize">
                {event.dayOfWeek}
              </div>
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {event.title}
              </h4>
              
              <div className="space-y-1 text-sm text-gray-600">
                {/* Time and Location on same line for smaller cards */}
                <div className="flex flex-wrap items-center gap-4">
                  <span>
                    {event.formattedStartTime} - {event.formattedEndTime}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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