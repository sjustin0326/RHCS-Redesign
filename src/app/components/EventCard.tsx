import React from 'react';
import { Event } from '@/utils/eventUtils';
import { 
  formatFullDate, 
  formatTimeRange,
  getMonthAbbr, 
  getDayOfMonth, 
  getDayOfWeek 
} from '@/utils/dateUtils';

interface EventCardProps {
  event: Event;
  isNextEvent?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, isNextEvent = false }) => {
  const timeRange = formatTimeRange(event.startDateTime, event.endDateTime); // ← Usar nueva función
  const fullDate = formatFullDate(event.startDateTime);
  const monthAbbr = getMonthAbbr(event.startDateTime);
  const dayOfMonth = getDayOfMonth(event.startDateTime);
  const dayOfWeek = getDayOfWeek(event.startDateTime);

  return (
    <div className={`
      bg-white rounded-xl shadow-soft p-6 border-l-4 
      ${isNextEvent 
        ? 'border-l-accent bg-gradient-to-r from-cream/30 to-white' 
        : 'border-l-forest-light'
      }
      hover:shadow-medium transition-all duration-300
    `}>
      {/* Header with "NEXT EVENT"  */}
      {isNextEvent && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-accent rounded-full"></div>
          <span className="text-xs font-semibold text-darkgreen tracking-wide uppercase">
            Next Event
          </span>
        </div>
      )}

      <div className="flex gap-4">
        {/* Left-side date section */}
        <div className="flex-shrink-0 text-center">
          <div className="bg-darkgreen text-cream px-3 py-1 rounded-t-lg">
            <span className="text-xs font-semibold uppercase tracking-wide">
              {monthAbbr}
            </span>
          </div>
          <div className="bg-cream border-2 border-darkgreen border-t-0 px-3 py-2 rounded-b-lg">
            <span className="text-2xl font-bold text-darkgreen leading-none">
              {dayOfMonth}
            </span>
            <div className="text-xs text-forest-light font-medium mt-1">
              {dayOfWeek}
            </div>
          </div>
        </div>

        {/* Right-side event info section */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-darkgreen mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          {/* Time info */}
          <div className="flex items-center gap-1 text-forest-light mb-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">
              {timeRange} {/* ← Ahora muestra "1:00 PM - 3:00 PM" */}
            </span>
          </div>

          {/* Full date info*/}
          <div className="flex items-center gap-1 text-forest-light mb-3">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">
              {fullDate}
            </span>
          </div>

          {/* if theres description of the event, here it goes */}
          {event.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;