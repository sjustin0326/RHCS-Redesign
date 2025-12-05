import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import sizeOf from 'image-size';

export interface IntroMissionData {
  title: string;
  body: string;
  htmlContent: string;
  images: {
    src: string;
    width: number;
    height: number;
  }[];
  learnMoreButton: {
    text: string;
    url: string;
  };
}

export interface MediaItem {
  title: string;
  description: string;
  type: 'YouTube Video' | 'Audio';
  youtubeUrl?: string;
  audioFile?: string;
}

export interface MediaSectionData {
  title: string;
  mediaItems: MediaItem[];
}

export interface VirtualTourData {
  title: string;
  description: string;
  youtubeUrl: string;
}

export interface GetInvolvedCard {
  title: string;
  icon: 'Membership' | 'Donate' | 'Volunteer';
  description: string;
  url: string;
}

export interface GetInvolvedCardsData {
  title: string;
  cards: GetInvolvedCard[];
}

function processImages(images: string[]): { src: string; width: number; height: number }[] {
  return (images || []).map(src => {
    try {
      const imagePath = path.join(process.cwd(), 'public', src);
      const imageBuffer = fs.readFileSync(imagePath);
      const dimensions = sizeOf(imageBuffer);
      return {
        src,
        width: dimensions.width || 0,
        height: dimensions.height || 0,
      };
    } catch (e) {
      console.error(`Could not read dimensions for image: ${src}`);
      return { src, width: 0, height: 0 };
    }
  });
}

export async function getIntroMissionData(): Promise<IntroMissionData> {
  const filePath = path.join(process.cwd(), 'src/content/home/intro-mission.md');
  
  if (!fs.existsSync(filePath)) {
    return {
      title: 'Welcome to RHCS',
      body: '',
      htmlContent: '',
      images: [],
      learnMoreButton: { text: 'Learn More', url: '/about-us' }
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = marked.parse(content) as string;

  return {
    title: data.title || 'Welcome to RHCS',
    body: content,
    htmlContent,
    images: processImages(data.images || []),
    learnMoreButton: data.learnMoreButton || { text: 'Learn More', url: '/about-us' }
  };
}

export async function getMediaSectionData(): Promise<MediaSectionData> {
  const filePath = path.join(process.cwd(), 'src/content/home/media.md');
  
  if (!fs.existsSync(filePath)) {
    return {
      title: 'RHCS in Media',
      mediaItems: []
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: data.title || 'RHCS in Media',
    mediaItems: data.mediaItems || []
  };
}

export async function getVirtualTourData(): Promise<VirtualTourData> {
  const filePath = path.join(process.cwd(), 'src/content/home/virtual-tour.md');
  
  if (!fs.existsSync(filePath)) {
    return {
      title: 'Virtual Tree Tour',
      description: '',
      youtubeUrl: 'https://youtu.be/vWIZ-boIn2U?si=Om3GJNB1fDevOBxr'
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: data.title || 'Virtual Tree Tour',
    description: data.description || '',
    youtubeUrl: data.youtubeUrl || 'https://youtu.be/vWIZ-boIn2U?si=Om3GJNB1fDevOBxr'
  };
}

export async function getGetInvolvedCardsData(): Promise<GetInvolvedCardsData> {
  const filePath = path.join(process.cwd(), 'src/content/home/get-involved-cards.md');
  
  if (!fs.existsSync(filePath)) {
    return {
      title: 'Get Involved',
      cards: []
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: data.title || 'Get Involved',
    cards: data.cards || []
  };
}