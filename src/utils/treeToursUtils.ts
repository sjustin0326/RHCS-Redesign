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

export interface Maps {
  title: string;
  map_list: MapItem[];
}



const contentDirectory = path.join(process.cwd(), 'src/content/tree-tours');

export function getVisitorInfo(): VisitorInfo {
  const fullPath = path.join(contentDirectory, 'visitor-information.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // 'data' has the frontmatter (title), 'content' has the markdown body
  const { data, content } = matter(fileContents);

  return {
    title: data.title as string,
    htmlContent: marked.parse(content) as string, 
  };
}

export function getDirections(): Directions {
  const fullPath = path.join(contentDirectory, 'directions.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
 // all content is in the frontmatter (`data`). The 'content' part will be empty.
  const { data } = matter(fileContents);

  return {
    title: data.title as string,
    // We access the nested object and parse each markdown field
    byCarHtml: marked.parse(data.directions.by_car || '') as string,
    byTransitHtml: marked.parse(data.directions.by_transit || '') as string,
  };
}

export function getMaps(): Maps {
  const fullPath = path.join(contentDirectory, 'maps.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // all content is in the frontmatter (`data`).
  const { data } = matter(fileContents);
  
  // return the data structure. No markdown parsing needed here.
  return {
    title: data.title as string,
    map_list: data.map_list as MapItem[],
  };
}