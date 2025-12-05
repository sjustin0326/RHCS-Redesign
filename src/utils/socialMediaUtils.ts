import fs from 'fs';
import path from 'path';

export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export function getSocialMediaLinks(): SocialMediaLinks {
  const filePath = path.join(process.cwd(), 'src/content/settings/social-media.json');
  
  try {
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    }
  } catch (error) {
    console.warn('Could not read social media settings:', error);
  }
  
  // Fallback defaults
  return {
    facebook: '',
    instagram: '',
    twitter: '',
  };
}