'use client';

import React from 'react';
import { SerializedEvent } from '@/utils/eventUtils';

interface EventDetailsModalProps {
  event: SerializedEvent;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event }) => {
  return (
    <div className="space-y-6">
      {/* Header with Date */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="bg-darkgreen rounded-lg p-4 text-center min-w-[6rem]">
          <div className="text-xs font-bold text-cream uppercase tracking-wide">
            {event.month}
          </div>
          <div className="text-3xl font-bold text-cream my-1">
            {event.dayOfMonth}
          </div>
          <div className="text-xs font-bold text-cream capitalize">
            {event.dayOfWeek}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-darkgreen mb-3">
            {event.title}
          </h2>
          <div className="space-y-2">
            {/* Time */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 flex-shrink-0" fill="#283618" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{event.formattedStartTime} - {event.formattedEndTime}</span>
            </div>
            {/* Location */}
            {event.location && (
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="#283618" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Full Description */}
      {event.descriptionHTML && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-darkgreen mb-3">Event Details</h3>
          <div
            className="prose prose-sm max-w-none text-gray-700 leading-relaxed prose-headings:text-darkgreen prose-a:text-terracotta prose-a:hover:text-terracottalight prose-strong:text-darkgreen prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: event.descriptionHTML }}
          />
        </div>
      )}
    </div>
  );
};

export default EventDetailsModal;