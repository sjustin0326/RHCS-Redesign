'use client';
//TODO, TEST ON LOCALHOST

import { useState, useEffect } from 'react';
import { Event, getNextEvent, getUpcomingEvents } from '@/utils/eventUtils';
import Schedule from '../components/Schedule';

export default function TreeToursPage() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para cargar eventos
    const loadEvents = () => {
      try {
        const next = getNextEvent();
        const upcoming = getUpcomingEvents(true); // excluir el próximo evento
        
        setNextEvent(next);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave hacia arriba cuando cambie la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-darkgreen mb-8">
        Tree Tours Schedule
      </h1>
      
      <Schedule
        nextEvent={nextEvent}
        upcomingEvents={upcomingEvents}
        showFullSchedule={true}
        currentPage={currentPage}
        eventsPerPage={4}
        onPageChange={handlePageChange}
      />
    </div>
  );
}