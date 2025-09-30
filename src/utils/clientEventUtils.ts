import { Event } from './eventUtils';

// Get nextevent from API
export async function getNextEventClient(): Promise<Event | null> {
  try {
    const response = await fetch('/api/events?type=next');
    if (!response.ok) {
      throw new Error('Failed to fetch next event');
    }
    const data = await response.json();
    return data.nextEvent;
  } catch (error) {
    console.error('Error fetching next event:', error);
    return null;
  }
}

// Get upcoming events from API todo?
export async function getUpcomingEventsClient(excludeNext: boolean = false): Promise<Event[]> {
  try {
    const response = await fetch(`/api/events?type=upcoming&excludeNext=${excludeNext}`);
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming events');
    }
    const data = await response.json();
    return data.upcomingEvents;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}