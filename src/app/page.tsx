'use client'
import Navigation from "./components/Navigation"
import { useState, useEffect } from 'react';
import { Event } from '@/utils/eventUtils';
import { getNextEventClient } from '@/utils/clientEventUtils';
import Schedule from "./components/Schedule";

export default function Home() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const next = await getNextEventClient();
        setNextEvent(next);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-forest-light text-cream py-20 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 animate-slide-up">
          The Riverview Horticultural Centre Society
          </h1>
          <p className="text-lg md:text-xl font-body mb-12 animate-slide-up">
            Preserving the historic səmiq̓ʷəʔelə / Riverview Lands and its unique tree arboretum for future
            generations through education, advocacy, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <button className="bg-terracotta hover:bg-warning text-cream px-8 py-4 rounded-full font-display font-semibold transition-all duration-300 hover:scale-105 hover:shadow-medium">
              Sign the Petition
            </button>
            <button className="border-2 border-cream text-cream px-8 py-4 rounded-full font-display font-semibold hover:bg-cream hover:text-forest-light transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Events in Home Page */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-darkgreen mb-6">
            Upcoming Events
          </h2>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          ) : (
            <Schedule 
              nextEvent={nextEvent}
              showFullSchedule={false}
            />
          )}
        </div>
      </section>

      {/* Admin Link (remove in production) */}
      <div className="fixed bottom-4 right-4">
        <a 
          href="/admin/index.html#/" 
          className="bg-golden hover:bg-accent text-forest-DEFAULT px-4 py-2 rounded-lg font-display font-medium shadow-medium transition-all duration-300 hover:scale-105"
        >
          🌱 Admin
        </a>
      </div>
    </div>
  )
}