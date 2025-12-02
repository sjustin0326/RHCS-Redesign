import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { DateTime } from 'luxon';

export interface Event {
  title: string;
  day: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  location?: string;
  description?: string;
  timezone: string;
  slug: string;
}

// Interfaz para el formato antiguo (para retrocompatibilidad)
interface LegacyEvent {
  title: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
  description?: string;
  timezone: string;
  slug: string;
}

export interface ParsedEvent extends Event {
  startDate: DateTime;
  endDate: DateTime;
  formattedStartDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export interface SerializedEvent {
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  timezone: string;
  slug: string;
  formattedStartDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

// Función helper para verificar si es formato antiguo
function isLegacyEvent(data: any): data is LegacyEvent {
  return 'startDateTime' in data && 'endDateTime' in data;
}

// Función para convertir evento antiguo a nuevo formato
function convertLegacyToNewFormat(legacyEvent: LegacyEvent): Event {
  const format = 'yyyy-MM-dd hh:mm a';
  const startDate = DateTime.fromFormat(legacyEvent.startDateTime, format, { 
    zone: legacyEvent.timezone 
  });
  
  if (!startDate.isValid) {
    console.error('Cannot convert legacy event:', legacyEvent.title);
    throw new Error('Invalid legacy event format');
  }

  const endDate = DateTime.fromFormat(legacyEvent.endDateTime, format, { 
    zone: legacyEvent.timezone 
  });

  return {
    title: legacyEvent.title,
    day: startDate.toFormat('yyyy-MM-dd'),
    startTime: startDate.toFormat('HH:mm'),
    endTime: endDate.isValid ? endDate.toFormat('HH:mm') : startDate.plus({ hours: 1 }).toFormat('HH:mm'),
    location: legacyEvent.location,
    description: legacyEvent.description,
    timezone: legacyEvent.timezone,
    slug: legacyEvent.slug,
  };
}

export function getAllEvents(): ParsedEvent[] {
  const eventsDirectory = path.join(process.cwd(), 'src/content/events');

  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(eventsDirectory);
  const events = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const filePath = path.join(eventsDirectory, name);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      const slug = data.slug || name.replace(/.md$/, '');

      // Verificar si es formato antiguo y convertir
      let eventData: Event;
      if (isLegacyEvent(data)) {
        console.log(`Converting legacy event: ${data.title}`);
        try {
          eventData = convertLegacyToNewFormat({ ...data, slug });
        } catch (error) {
          console.error(`Failed to convert legacy event ${data.title}:`, error);
          return null;
        }
      } else {
        eventData = { ...data, slug } as Event;
      }

      return eventData;
    })
    .filter((event): event is Event => event !== null) // Type guard para filtrar nulls
    .map(parseEvent)
    .filter((event): event is ParsedEvent => event !== null); // Type guard para filtrar nulls

  return events;
}

function parseEvent(event: Event): ParsedEvent | null {
  try {
    // Validar que tenemos los campos necesarios
    if (!event.day || !event.startTime || !event.endTime) {
      console.error('Missing required fields for event:', event.title);
      console.error('Event data:', { day: event.day, startTime: event.startTime, endTime: event.endTime });
      return null;
    }

    // Combinar día y hora para crear DateTime completos
    const startDateTimeString = `${event.day} ${event.startTime}`;
    const endDateTimeString = `${event.day} ${event.endTime}`;
    
    const format = 'yyyy-MM-dd HH:mm';
    const startDate = DateTime.fromFormat(startDateTimeString, format, { 
      zone: event.timezone || 'America/Vancouver' 
    });
    const endDate = DateTime.fromFormat(endDateTimeString, format, { 
      zone: event.timezone || 'America/Vancouver' 
    });

    if (!startDate.isValid || !endDate.isValid) {
      console.error('Invalid date/time format for event:', event.title);
      console.error('Day:', event.day, 'Start:', event.startTime, 'End:', event.endTime);
      console.error('Start valid:', startDate.isValid, 'End valid:', endDate.isValid);
      if (!startDate.isValid) console.error('Start invalidReason:', startDate.invalidReason);
      if (!endDate.isValid) console.error('End invalidReason:', endDate.invalidReason);
      return null;
    }

    return {
      ...event,
      startDate,
      endDate,
      formattedStartDate: startDate.toFormat('yyyy-MM-dd'),
      formattedStartTime: startDate.toFormat('h:mm a'),
      formattedEndTime: endDate.toFormat('h:mm a'),
      dayOfMonth: startDate.toFormat('d'),
      month: startDate.toFormat('MMM').toUpperCase(),
      dayOfWeek: startDate.toFormat('cccc'),
    };
  } catch (error) {
    console.error('Error parsing event:', event.title, error);
    return null;
  }
}

export function getUpcomingEvents(): ParsedEvent[] {
  const allEvents = getAllEvents();
  const now = DateTime.now().setZone('America/Vancouver');

  return allEvents
    .filter(event => event.endDate > now)
    .sort((a, b) => a.startDate.toMillis() - b.startDate.toMillis());
}

export function getPastEvents(): ParsedEvent[] {
  const allEvents = getAllEvents();
  const now = DateTime.now().setZone('America/Vancouver');

  return allEvents
    .filter(event => event.endDate <= now)
    .sort((a, b) => b.startDate.toMillis() - a.startDate.toMillis());
}

export function getNextEvent(): ParsedEvent | null {
  const upcomingEvents = getUpcomingEvents();
  return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
}

export function getOtherUpcomingEvents(): ParsedEvent[] {
  const upcomingEvents = getUpcomingEvents();
  return upcomingEvents.slice(1);
}

export function serializeEvent(event: ParsedEvent): SerializedEvent {
  return {
    title: event.title,
    day: event.day,
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
    description: event.description,
    timezone: event.timezone,
    slug: event.slug,
    formattedStartDate: event.formattedStartDate,
    formattedStartTime: event.formattedStartTime,
    formattedEndTime: event.formattedEndTime,
    dayOfMonth: event.dayOfMonth,
    month: event.month,
    dayOfWeek: event.dayOfWeek,
  };
}

export function getSerializedNextEvent(): SerializedEvent | null {
  const nextEvent = getNextEvent();
  return nextEvent ? serializeEvent(nextEvent) : null;
}

export function getSerializedOtherUpcomingEvents(): SerializedEvent[] {
  const otherEvents = getOtherUpcomingEvents();
  return otherEvents.map(serializeEvent);
}