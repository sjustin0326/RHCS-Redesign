import { getSerializedNextEvent, getSerializedOtherUpcomingEvents } from '@/utils/eventUtils';
import UpcomingNextEvent from '../components/UpcomingNextEvent';
import OtherUpcomingEvents from '../components/OtherUpcomingEvents';
import ComingSoon from '../components/ComingSoonEvents';
import Navigation from '../components/Navigation';

export default function EventsPage() {
  const nextEvent = getSerializedNextEvent();
  const otherEvents = getSerializedOtherUpcomingEvents();

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-cream py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-inter font-black text-center text-darkgreen mb-12">
            Tree Tours & Walks
          </h1>
          <p className='px-4 text-sm md:text-lg font-poppins font-medium'>
            The Riverview Horticultural Centre Society invite tou to a Tree Tour of a significant and beautiful part of the Lower Mainland, the historic Riverview Lands Arboretum.
          </p>
          <h2 className="text-3xl font-Inter font-black text-darkgreen capitalize animate-slide-down mt-12 px-4">
            NEXT TREE TOUR
          </h2>

          {!nextEvent ? (
            <ComingSoon />
          ) : (
            <div className="max-w-4xl mx-auto">
              <UpcomingNextEvent event={nextEvent} />
              
              {otherEvents.length > 0 && (
                <div className="mt-2">
                  <h2 className="text-lg font-Inter font-black text-darkgreen capitalize animate-slide-down mt-2 px-4">
                    OTHER UPCOMING TREE TOURS
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
}