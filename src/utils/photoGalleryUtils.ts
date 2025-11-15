import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked'; //to convert md to html

const albumsDirectory = path.join(process.cwd(), 'src/content/albums');

//Album interface
export interface Album {
  slug: string;
  title: string;
  date: string; 
  description: string; 
  photos: string[];
  formattedDate: string;
}

export function getAllAlbums(): Album[] {
  // does directory exist?
  if (!fs.existsSync(albumsDirectory)) {
    console.warn("Albums content directory not found at:", albumsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(albumsDirectory);

  const allAlbums = fileNames
    .filter((fileName) => fileName.endsWith('.md')) 
    .map((fileName): Album | null => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(albumsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      
      const { data, content } = matter(fileContents);

      // if no date or title, no process
      if (!data.title || !data.date) {
        console.error(`Album with slug "${slug}" is missing title or date.`);
        return null;
      }
      
      const albumDate = new Date(data.date);
      const formattedDate = albumDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC', 
      });

      return {
        slug,
        title: data.title,
        date: data.date,
        description: content, 
        photos: data.photos.map((p: { image: string }) => p.image) || [],
        formattedDate,
      };
    })
    .filter((album): album is Album => album !== null); // filters albums with errors

  // sort from most recent to oldest
  return allAlbums.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}


export function getAlbumBySlug(slug: string): Album | null {
  const fullPath = path.join(albumsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  if (!data.title || !data.date) {
    return null;
  }

  const albumDate = new Date(data.date);
  const formattedDate = albumDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
  });

  return {
    slug,
    title: data.title,
    date: data.date,
    description: content,
    photos: data.photos.map((p: { image: string }) => p.image) || [],
    formattedDate,
  };
}