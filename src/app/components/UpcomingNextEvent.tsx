import React from 'react';
import { ParsedEvent } from '@/utils/eventUtils';

interface UpcomingNextEventProps {
  event: ParsedEvent;
}

const UpcomingNextEvent: React.FC<UpcomingNextEventProps> = ({ event }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-6">
        {/* Date Display */}
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            NEXT EVENT
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {event.month}
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {event.dayOfMonth}
            </div>
            <div className="text-xs text-gray-600 capitalize">
              {event.dayOfWeek}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {event.title}
          </h3>
          
          <div className="space-y-2 mb-4">
            {/* Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {event.formattedStartTime} - {event.formattedEndTime}
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {event.location}
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