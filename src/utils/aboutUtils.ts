import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface MissionVision {
  title: string;
  htmlContent: string;
}

export interface WhatWeDo {
  title: string;
  htmlContent: string;
  image?: string;
}

export interface WhyFounded {
  title: string;
  htmlContent: string;
}

export interface Achievements {
  title: string;
  description: string;
  images: string[];
}

export interface GetInvolved {
  title: string;
  htmlContent: string;
  images?: string[];
  primaryButton: {
    text: string;
    url: string;
  };
  secondaryButton: {
    text: string;
    url: string;
  };
}

//path to about content folder
const contentDirectory = path.join(process.cwd(), 'src/content/about');

//Function to read and parse a markdown file with error handling
function readMarkdownFile(fileName: string) {
  const fullPath = path.join(contentDirectory, fileName);
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    console.warn(`Warning: File not found: ${fullPath}`);
    return null;
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return matter(fileContents);
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);
    return null;
  }
}

//Mission data
export function getMission(): MissionVision {
  const result = readMarkdownFile('mission.md');
  
  if (!result) {
    return {
      title: 'Our Mission',
      htmlContent: '<p>Mission content coming soon.</p>',
    };
  }
  
  const { data, content } = result;
  
  return {
    title: (data.title || 'Our Mission') as string,
    htmlContent: marked.parse(content) as string,
  };
}

//Vision data
export function getVision(): MissionVision {
  const result = readMarkdownFile('vision.md');
  
  if (!result) {
    return {
      title: 'Our Vision',
      htmlContent: '<p>Vision content coming soon.</p>',
    };
  }
  
  const { data, content } = result;
  
  return {
    title: (data.title || 'Our Vision') as string,
    htmlContent: marked.parse(content) as string,
  };
}

//What We Do data
export function getWhatWeDo(): WhatWeDo {
  const result = readMarkdownFile('what-we-do.md');
  
  if (!result) {
    return {
      title: 'What We Do',
      htmlContent: '<p>Content coming soon.</p>',
    };
  }
  
  const { data, content } = result;
  
  return {
    title: (data.title || 'What We Do') as string,
    htmlContent: marked.parse(content) as string,
    image: data.image as string | undefined,
  };
}

//Why Founded data
export function getWhyFounded(): WhyFounded {
  const result = readMarkdownFile('why-founded.md');
  
  if (!result) {
    return {
      title: 'Why Was RHCS Founded',
      htmlContent: '<p>Content coming soon.</p>',
    };
  }
  
  const { data, content } = result;
  
  return {
    title: (data.title || 'Why Was RHCS Founded') as string,
    htmlContent: marked.parse(content) as string,
  };
}

//Achievements data
export function getAchievements(): Achievements {
  const result = readMarkdownFile('achievements.md');
  
  if (!result) {
    return {
      title: 'Our Achievements',
      description: '',
      images: [],
    };
  }
  
  const { data, content } = result;
  let imagesList: string[] = [];
  
  if (data.images && Array.isArray(data.images)) {
    imagesList = data.images.map((img: string | { image: string }) => {
      if (typeof img === 'string') {
        return img;
      }
      if (img && typeof img === 'object' && 'image' in img) {
        return img.image;
      }
      return '';
    }).filter((img: string) => img !== '');
  }
  
  return {
    title: (data.title || 'Our Achievements') as string,
    description: content ? (marked.parse(content) as string) : '',
    images: imagesList,
  };
}

//GetInvolved data
export function getGetInvolved(): GetInvolved {
  const result = readMarkdownFile('get-involved.md');
  
  if (!result) {
    return {
      title: 'Get Involved',
      htmlContent: '<p>Get involved content coming soon.</p>',
      images: [],
      primaryButton: {
        text: 'Become a Member',
        url: '/get-involved#membership',
      },
      secondaryButton: {
        text: 'Volunteer With Us',
        url: '/get-involved#volunteer',
      },
    };
  }
  
  const { data, content } = result;
  let imagesList: string[] = [];
  
  if (data.images && Array.isArray(data.images)) {
    imagesList = data.images.map((img: string | { image: string }) => {
      if (typeof img === 'string') {
        return img;
      }
      if (img && typeof img === 'object' && 'image' in img) {
        return img.image;
      }
      return '';
    }).filter((img: string) => img !== '');
  }
  
  return {
    title: (data.title || 'Get Involved') as string,
    htmlContent: marked.parse(content) as string,
    images: imagesList,
    primaryButton: {
      text: data.primaryButton?.text || 'Become a Member',
      url: data.primaryButton?.url || '/get-involved#membership',
    },
    secondaryButton: {
      text: data.secondaryButton?.text || 'Volunteer With Us',
      url: data.secondaryButton?.url || '/get-involved#volunteer',
    },
  };
}