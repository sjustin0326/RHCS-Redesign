import { NextResponse } from 'next/server';
import { getAllEvents, getNextEvent, getUpcomingEvents } from '@/utils/eventUtils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    
    switch (type) {
      case 'next':
        const nextEvent = getNextEvent();
        return NextResponse.json({ nextEvent });
      
      case 'upcoming':
        const excludeNext = searchParams.get('excludeNext') === 'true';
        const upcomingEvents = getUpcomingEvents(excludeNext);
        return NextResponse.json({ upcomingEvents });
      
      case 'all':
      default:
        const allEvents = getAllEvents();
        return NextResponse.json({ events: allEvents });
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' }, 
      { status: 500 }
    );
  }
}