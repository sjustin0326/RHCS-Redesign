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

export interface Maps {
  title: string;
  map_list: MapItem[];
}

const contentDirectory = path.join(process.cwd(), 'src/content/tree-tours');

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

  const directionsData = data.directions || {};

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

  const mapList: MapItem[] = (data.map_list || [] as RawMapItem[]).map((item: RawMapItem) => {
    
    return {
      title: item.title,
      type: item.type || 'File Upload (PDF/Image)',
      file: item.file,
      url: item.url,
    };
  });

  return {
    title: (data.title || 'Maps') as string,
    map_list: mapList,
  };
}