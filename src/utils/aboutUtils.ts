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

//Function to read and parse a markdown file
function readMarkdownFile(fileName: string) {
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
}

//Mission data
export function getMission(): MissionVision {
  const { data, content } = readMarkdownFile('mission.md');
  
  return {
    title: (data.title || 'Our Mission') as string,
    htmlContent: marked.parse(content) as string,
  };
}

//Vision data
export function getVision(): MissionVision {
  const { data, content } = readMarkdownFile('vision.md');
  
  return {
    title: (data.title || 'Our Vision') as string,
    htmlContent: marked.parse(content) as string,
  };
}

//What We Do data
export function getWhatWeDo(): WhatWeDo {
  const { data, content } = readMarkdownFile('what-we-do.md');
  
  return {
    title: (data.title || 'What We Do') as string,
    htmlContent: marked.parse(content) as string,
    image: data.image as string | undefined,
  };
}

//Why Founded data
export function getWhyFounded(): WhyFounded {
  const { data, content } = readMarkdownFile('why-founded.md');
  
  return {
    title: (data.title || 'Why Was RHCS Founded') as string,
    htmlContent: marked.parse(content) as string,
  };
}

//Achievements data
export function getAchievements(): Achievements {
  const { data, content } = readMarkdownFile('achievements.md');
  
  return {
    title: (data.title || 'Our Achievements') as string,
    description: content ? (marked.parse(content) as string) : '',
    images: (data.images || []).map((img: { image: string }) => img.image),
  };
}

//GetInvolved data
export function getGetInvolved(): GetInvolved {
  const { data, content } = readMarkdownFile('get-involved.md');
  
  return {
    title: (data.title || 'Get Involved') as string,
    htmlContent: marked.parse(content) as string,
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