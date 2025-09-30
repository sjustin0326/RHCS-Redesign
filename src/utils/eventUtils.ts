import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Event {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;  
  location: string;
  timezone: string;
  description?: string;
  slug: string;
}

function createVancouverDate(dateString: string): Date {
  if (dateString.includes('PDT') || dateString.includes('PST') || dateString.includes('-07') || dateString.includes('-08')) {
    return new Date(dateString);
  }
  
  const withTimezone = `${dateString} America/Vancouver`;
  return new Date(withTimezone);
}

export function getAllEvents(): Event[] {
  const eventsDirectory = path.join(process.cwd(), 'src/content/events');
  
  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(eventsDirectory)
    .filter(name => name.endsWith('.md'));

  const events: Event[] = fileNames.map((fileName) => {
    const fullPath = path.join(eventsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    const slug = fileName.replace(/\.md$/, '');
    
    return {
      id: slug,
      title: data.title,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime || data.endTime,
      location: data.location,
      timezone: data.timezone,
      description: content,
      slug,
    };
  });

  return events.sort((a, b) => 
    createVancouverDate(a.startDateTime).getTime() - createVancouverDate(b.startDateTime).getTime()
  );
}

export function getNextEvent(): Event | null {
  const allEvents = getAllEvents();
  const nowInVancouver = new Date().toLocaleString("en-US", {timeZone: "America/Vancouver"});
  const now = new Date(nowInVancouver);
  
  const upcomingEvents = allEvents.filter(event => 
    createVancouverDate(event.startDateTime) > now
  );
  
  return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
}

export function getUpcomingEvents(excludeNext: boolean = false): Event[] {
  const allEvents = getAllEvents();
  const nowInVancouver = new Date().toLocaleString("en-US", {timeZone: "America/Vancouver"});
  const now = new Date(nowInVancouver);
  
  let upcomingEvents = allEvents.filter(event => 
    createVancouverDate(event.startDateTime) > now
  );
  
  if (excludeNext && upcomingEvents.length > 0) {
    upcomingEvents = upcomingEvents.slice(1);
  }
  
  return upcomingEvents;
}