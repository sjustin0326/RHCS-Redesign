// format the full date
export function formatFullDate(dateString: string): string {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Vancouver'
    };
    
    return date.toLocaleDateString('en-US', options);
  }
  
  // format ONLY the time
  export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit', 
      hour12: true,
      timeZone: 'America/Vancouver'
    };
    
    return date.toLocaleTimeString('en-US', options); // ← Cambiado de toLocaleDateString a toLocaleTimeString
  }
  
  // format the end time and start time
  export function formatTimeRange(startDateTime: string, endDateTime: string): string {
    const startTime = formatTime(startDateTime);
    const endTime = formatTime(endDateTime);
    return `${startTime} - ${endTime}`;
  }
  
  // abrrev. month
  export function getMonthAbbr(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      timeZone: 'America/Vancouver'
    }).toUpperCase();
  }
  
  // get day of the month (1,2,3..)
  export function getDayOfMonth(dateString: string): string {
    const date = new Date(dateString);
    return date.getDate().toString();
  }
  
  // get day og the week (monday, tuesday, wednesday...)
  export function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      timeZone: 'America/Vancouver'
    });
  }