import { getNextEvent, getOtherUpcomingEvents } from '@/utils/eventUtils';
import UpcomingNextEvent from '../components/UpcomingNextEvent';
import OtherUpcomingEvents from '../components/OtherUpcomingEvents';
import ComingSoon from '../components/ComingSoonEvents';
import Navigation from '../components/Navigation'; // Assuming you want navigation here


export default function EventsPage() {
  const nextEvent = getNextEvent();
  const otherEvents = getOtherUpcomingEvents();

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-darkgreen mb-12">
            Upcoming Tree Tours & Events
          </h1>

          {!nextEvent ? (
            <ComingSoon />
          ) : (
            <div className="max-w-4xl mx-auto">
              <UpcomingNextEvent event={nextEvent} />
              
              {otherEvents.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-darkgreen mb-6">
                    Other Upcoming Events
                  </h2>
                  <OtherUpcomingEvents events={otherEvents} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};