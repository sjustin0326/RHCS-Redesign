import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked'; // FIX: Correct import statement
import sizeOf from 'image-size';

const newsDirectory = path.join(process.cwd(), 'src/content/news');

export interface NewsPost {
  slug: string;
  title: string;
  date: string; // ISO format: YYYY-MM-DD
  images?: string[]; // array of image paths like ['/uploads/image1.jpg']
  content: string; // raw markdown body
}

export interface ProcessedNewsPost extends Omit<NewsPost, 'images'> {
  // Omit original images and replace with a more structured version.
  year: string;
  formattedDate: string; // like "October 11, 2025"
  excerpt: string;
  htmlContent: string;
  images: {
    src: string;
    width: number;
    height: number;
  }[];
}

// src/utils/newsUtils.ts

function processPost(post: NewsPost): ProcessedNewsPost {
    const date = new Date(post.date);
    const year = date.getUTCFullYear().toString();
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'America/Vancouver',
    });
  
    // description excerpt first 4 lines
    const excerpt = post.content.split('\n').slice(0, 4).join(' ').trim() + '...';
  
    // Parse markdown to HTML and assert the type as string
    const htmlContent = marked.parse(post.content) as string; // <-- THE FINAL FIX
  
    // process images to include dimensions
    const processedImages = (post.images || []).map(src => {
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
  
    return {
      ...post,
      year,
      formattedDate,
      excerpt,
      htmlContent,
      images: processedImages,
    };
  }

export function getAllNewsPosts(): ProcessedNewsPost[] {
  if (!fs.existsSync(newsDirectory)) {
    console.warn("News content directory not found at:", newsDirectory);
    return [];
  }
  const fileNames = fs.readdirSync(newsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(newsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Ensure date exists before creating post object
      if (!data.date) {
        console.error(`Post with slug "${slug}" is missing a date.`);
        return null;
      }    

      return {
        slug,
        title: data.title || 'Untitled Post',
        date: data.date,
        images: data.images || [],
        content,
      } as NewsPost;
    })
    .filter((post): post is NewsPost => post !== null); // Filter out null posts

  // sort posts (newest first)
  const sortedPosts = allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return sortedPosts.map(processPost);
}

export function getNewsPostBySlug(slug: string): ProcessedNewsPost | null {
    const fullPath = path.join(newsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
  
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    if (!data.date) {
      console.error(`Post with slug "${slug}" is missing a date.`);
      return null;
    }
  
    const post = {
      slug,
      title: data.title,
      date: data.date,
      images: data.images || [],
      content,
    } as NewsPost;
  
    return processPost(post);
  }