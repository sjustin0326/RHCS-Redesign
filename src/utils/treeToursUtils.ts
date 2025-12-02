import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface VisitorInfo {
  title: string;
  htmlContent: string;
}

export interface Directions {
  title: string;
  byCarHtml: string;
  byTransitHtml: string;
}

export interface MapItem {
  title: string;
  type: "File Upload (PDF/Image)" | "External Link";
  file?: string;
  url?: string;
}

export interface RawMapItem {
  title: string;
  type?: "File Upload (PDF/Image)" | "External Link";
  file?: string;
  url?: string;
}
export interface LocationSettings {
  title: string;
  googleMapsEmbedUrl: string;
  address: string;
  googleMapsDirectUrl: string;
}


export interface Maps {
  title: string;
  location: LocationSettings;
  map_list: MapItem[];
}

export interface VirtualTourVideo {
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
}

export interface VirtualTours {
  sectionTitle: string;
  videos: VirtualTourVideo[];
}


const contentDirectory = path.join(process.cwd(), 'src/content/tree-tours');

function convertToEmbedUrl(youtubeUrl: string): string {
  try {
    const url = new URL(youtubeUrl);
    let videoId = '';

    // Formato: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.hostname.includes('youtube.com')) {
      videoId = url.searchParams.get('v') || '';
    } 
    // Formato: https://youtu.be/VIDEO_ID
    else if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.slice(1);
    }

    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    }
  } catch (error) {
    console.error('Error parsing YouTube URL:', error);
  }
  
  return youtubeUrl;
}




export function getVisitorInfo(): VisitorInfo {
  const fullPath = path.join(contentDirectory, 'visitor-information.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: (data.title || 'Visitor Information') as string,
    htmlContent: marked.parse(content) as string,
  };
}

export function getDirections(): Directions {
  const fullPath = path.join(contentDirectory, 'directions.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  const directionsData = data.directions_content || data.directions || {};

  return {
    title: (data.title || 'Directions') as string,
    byCarHtml: marked.parse(directionsData.by_car || '') as string,
    byTransitHtml: marked.parse(directionsData.by_transit || '') as string,
  };
}

export function getMaps(): Maps {
  const fullPath = path.join(contentDirectory, 'maps.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  // Extraer location settings
  const locationData = data.location || {};
  const location: LocationSettings = {
    title: locationData.title || 'Location: Henry Esson Young Building',
    googleMapsEmbedUrl: locationData.googleMapsEmbedUrl || '',
    address: locationData.address || '',
    googleMapsDirectUrl: locationData.googleMapsDirectUrl || '',
  };
  const mapList: MapItem[] = (data.map_list || [] as RawMapItem[]).map((item: RawMapItem) => ({
    title: item.title,
    type: item.type || 'File Upload (PDF/Image)',
    file: item.file,
    url: item.url,
  }));

  return {
    title: (data.title || 'Maps') as string,
    location,
    map_list: mapList,
  };
}

export function getVirtualTours(): VirtualTours {
  const fullPath = path.join(contentDirectory, 'virtual-tours.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  const videos: VirtualTourVideo[] = (data.videos || []).map((video: any) => ({
    title: video.title,
    description: video.description,
    youtubeUrl: video.youtubeUrl,
    youtubeEmbedUrl: convertToEmbedUrl(video.youtubeUrl),
  }));

  return {
    sectionTitle: (data.sectionTitle || 'Virtual Tree Tour Videos') as string,
    videos,
  };
}