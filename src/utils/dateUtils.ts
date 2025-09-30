// timezone - vancouver
function createVancouverDate(dateString: string): Date {
  if (dateString.includes('PDT') || dateString.includes('PST') || dateString.includes('-07') || dateString.includes('-08')) {
    return new Date(dateString);
  }
  const withTimezone = `${dateString} America/Vancouver`;
  return new Date(withTimezone);
}

export function formatFullDate(dateString: string): string {
  const date = createVancouverDate(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Vancouver'
  };
  
  return date.toLocaleDateString('en-US', options);
}
export function formatTime(dateString: string): string {
  const date = createVancouverDate(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit', 
    hour12: true,
    timeZone: 'America/Vancouver'
  };
  
  return date.toLocaleTimeString('en-US', options);
}

// start - end times
export function formatTimeRange(startDateTime: string, endDateTime: string): string {
  const startTime = formatTime(startDateTime);
  const endTime = formatTime(endDateTime);
  return `${startTime} - ${endTime}`;
}

// abbrev. month
export function getMonthAbbr(dateString: string): string {
  const date = createVancouverDate(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short',
    timeZone: 'America/Vancouver'
  }).toUpperCase();
}


export function getDayOfMonth(dateString: string): string {
  const date = createVancouverDate(dateString);
  
  const dayInVancouver = date.toLocaleDateString('en-US', {
    day: 'numeric',
    timeZone: 'America/Vancouver'
  });
  
  return dayInVancouver;
}


export function getDayOfWeek(dateString: string): string {
  const date = createVancouverDate(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    timeZone: 'America/Vancouver'
  });
}