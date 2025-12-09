import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface CarouselImages {
  images: string[];
}

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

interface UnknownVideoData {
  title?: string;
  description?: string;
  youtubeUrl?: string;
  [key: string]: unknown;
}

const contentDirectory = path.join(process.cwd(), 'src/content/tree-tours');

function convertToEmbedUrl(youtubeUrl: string): string {
  try {
    const url = new URL(youtubeUrl);
    let videoId = '';

    if (url.hostname.includes('youtube.com')) {
      videoId = url.searchParams.get('v') || '';
    } else if (url.hostname.includes('youtu.be')) {
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

export function getTreeToursCarouselImages(): CarouselImages {
  const fullPath = path.join(contentDirectory, 'carousel-images.md');
  if (!fs.existsSync(fullPath)) {
    console.warn(`Warning: Tree tours carousel images file not found: ${fullPath}`);
    return { images: [] };
  }
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    console.log('Tree tours carousel raw data:', data); // Debug log

    if (!data.images || !Array.isArray(data.images)) {
      console.warn('No images array found in tree tours carousel data');
      return { images: [] };
    }

    // FIXED: Extract the image path correctly
    const images = data.images
      .filter((item: unknown) => {
        // Handle both string and object formats
        if (typeof item === 'string') return true;
        if (typeof item === 'object' && item !== null && 'image' in item) {
          return !!(item as { image?: string }).image;
        }
        return false;
      })
      .map((item: unknown) => {
        // If it's already a string, return it
        if (typeof item === 'string') return item;
        // If it's an object with image property, extract it
        if (typeof item === 'object' && item !== null && 'image' in item) {
          return (item as { image: string }).image;
        }
        return '';
      })
      .filter((path: string) => path !== ''); // Remove any empty strings

    console.log('Tree tours processed images:', images); // Debug log
    return { images };
  } catch (error) {
    console.error('Error reading tree tours carousel images:', error);
    return { images: [] };
  }
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

  const videos: VirtualTourVideo[] = (data.videos || []).map((video: UnknownVideoData) => ({
    title: video.title || '',
    description: video.description || '',
    youtubeUrl: video.youtubeUrl || '',
    youtubeEmbedUrl: convertToEmbedUrl(video.youtubeUrl || ''),
  }));

  return {
    sectionTitle: (data.sectionTitle || 'Virtual Tree Tour Videos') as string,
    videos,
  };
}