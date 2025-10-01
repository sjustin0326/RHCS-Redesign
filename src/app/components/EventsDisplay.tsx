
import React from 'react';
import { getNextEvent, getOtherUpcomingEvents } from '@/utils/eventUtils';
import UpcomingNextEvent from './UpcomingNextEvent';
import OtherUpcomingEvents from './OtherUpcomingEvents';
import ComingSoon from './ComingSoonEvents';
interface EventsDisplayProps {
  showOnlyNext?: boolean;
}

const EventsDisplay: React.FC<EventsDisplayProps> = ({ showOnlyNext = false }) => {
  const nextEvent = getNextEvent();
  const otherEvents = showOnlyNext ? [] : getOtherUpcomingEvents();

  // If no events at all, show coming soon
  if (!nextEvent) {
    return <ComingSoon />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Next Event */}
      <UpcomingNextEvent event={nextEvent} />
      
      {/* Other Upcoming Events - only show if there are any AND showOnlyNext is false */}
      {!showOnlyNext && otherEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Other Upcoming Events
          </h2>
          <OtherUpcomingEvents events={otherEvents} />
        </div>
      )}
    </div>
  );
};

export default EventsDisplay;