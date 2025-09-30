import React from 'react';
import { Event } from '@/utils/eventUtils';
import EventCard from './EventCard';

interface ScheduleProps {
  nextEvent: Event | null;
  upcomingEvents?: Event[]; // Tree Tours Page ONLY
  showFullSchedule?: boolean; // true = Tree Tours Page, false = Home Page
  currentPage?: number; // Pagination for tree tours page
  eventsPerPage?: number; // how many events to show per page?
  onPageChange?: (page: number) => void; // change page
}

const Schedule: React.FC<ScheduleProps> = ({
  nextEvent,
  upcomingEvents = [],
  showFullSchedule = false,
  currentPage = 1,
  eventsPerPage = 4,
  onPageChange,
}) => {
  // Events for current page
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = upcomingEvents.slice(startIndex, endIndex);
  const totalPages = Math.ceil(upcomingEvents.length / eventsPerPage);

  // if no next event show message
  if (!nextEvent && upcomingEvents.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-8 text-center">
        <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-forest-light" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-darkgreen mb-2">
          Coming Soon
        </h3>
        <p className="text-forest-light mb-4">
          Follow us on our social media and stay updated for our next Tree Tour.
        </p>
        {/* TODO - ADD SOCIAL LINKS HERE!! ask if linkedin too*/}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Próximo evento */}
      {nextEvent && (
        <EventCard event={nextEvent} isNextEvent={true} />
      )}

      {/* Extra events (ONLY Tree Tours page) */}
      {showFullSchedule && paginatedEvents.length > 0 && (
        <div className="space-y-4">
          {paginatedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {showFullSchedule && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-forest-light text-forest-light disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cream transition-colors"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                page === currentPage
                  ? 'bg-darkgreen text-cream'
                  : 'border border-forest-light text-forest-light hover:bg-cream'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-forest-light text-forest-light disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cream transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Botones para Home page */}
      {!showFullSchedule && (
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <a
            href="/tree-tours"
            className="flex-1 bg-darkgreen text-cream px-6 py-3 rounded-lg font-semibold text-center hover:bg-forest-light transition-colors"
          >
            See Full Schedule
          </a>
          <a
            href="/visit"
            className="flex-1 border-2 border-darkgreen text-darkgreen px-6 py-3 rounded-lg font-semibold text-center hover:bg-cream transition-colors"
          >
            Plan Your Visit
          </a>
        </div>
      )}
    </div>
  );
};

export default Schedule;