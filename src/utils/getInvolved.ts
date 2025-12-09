import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const contentDirectory = path.join(process.cwd(), 'src/content/get-involved');

export interface PaymentMethod {
  method: string;
  icon: string;
  details: string;
  preferred?: boolean;
}

export interface MembershipData {
  title: string;
  htmlContent: string;
  pricing: {
    title: string;
    amount: string;
    dueDate: string;
  };
  paymentMethods: PaymentMethod[];
  note?: string;
  membershipFormPDF?: string;
}

export interface DonationsData {
  title: string;
  htmlContent: string;
  paymentOptions: PaymentMethod[];
  taxReceiptNote?: string;
}

export interface VolunteerSection {
  title: string;
  description: string;
}

export interface VolunteerPosition {
  title: string;
  description: string;
  htmlDescription: string;
  timeCommitment?: string;
  contactType: 'Email' | 'External Link';
  contactEmail?: string;
  contactURL?: string;
  order: number;
  slug: string;
}

function readMarkdownFile(fileName: string) {
  const fullPath = path.join(contentDirectory, fileName);
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

export function getMembershipData(): MembershipData {
  const result = readMarkdownFile('membership.md');
  if (!result) {
    return {
      title: 'Join the Society',
      htmlContent: '<p>Membership content coming soon.</p>',
      pricing: { title: 'Annual Membership', amount: '$5.00', dueDate: 'Due April 1st' },
      paymentMethods: [],
    };
  }
  const { data, content } = result;

  const paymentMethods = (data.paymentMethods || []).map((pm: PaymentMethod) => ({
    ...pm,
    details: marked.parse(pm.details) as string,
  }));

  return {
    title: (data.title || 'Join the Society') as string,
    htmlContent: marked.parse(content || data.body || '') as string,
    pricing: data.pricing || { title: 'Annual Membership', amount: '$5.00', dueDate: 'Due April 1st' },
    paymentMethods,
    note: data.note as string | undefined,
    membershipFormPDF: data.membershipFormPDF as string | undefined,
  };
}

export function getDonationsData(): DonationsData {
  const result = readMarkdownFile('donations.md');
  if (!result) {
    return {
      title: 'Support Our Work',
      htmlContent: '<p>Donations content coming soon.</p>',
      paymentOptions: [],
    };
  }
  const { data, content } = result;

  const paymentOptions = (data.paymentOptions || []).map((po: PaymentMethod) => ({
    ...po,
    details: marked.parse(po.details) as string,
  }));

  return {
    title: (data.title || 'Support Our Work') as string,
    htmlContent: marked.parse(content || data.body || '') as string,
    paymentOptions,
    taxReceiptNote: data.taxReceiptNote as string | undefined,
  };
}

export function getVolunteerSection(): VolunteerSection {
  const result = readMarkdownFile('volunteer.md');
  if (!result) {
    return {
      title: 'Volunteer Opportunities',
      description: '',
    };
  }
  const { data, content } = result;
  return {
    title: (data.title || 'Volunteer Opportunities') as string,
    description: content || (data.description as string) || '',
  };
}

export function getVolunteerPositions(): VolunteerPosition[] {
  const positionsDirectory = path.join(contentDirectory, 'volunteer-positions');
  if (!fs.existsSync(positionsDirectory)) {
    console.warn(`Warning: Volunteer positions directory not found: ${positionsDirectory}`);
    return [];
  }
  try {
    const fileNames = fs.readdirSync(positionsDirectory);
    const positions = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const fullPath = path.join(positionsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const descriptionText = content ? content.trim() : '';

        return {
          title: data.title as string,
          description: descriptionText,
          htmlDescription: descriptionText ? (marked.parse(descriptionText) as string) : '',
          timeCommitment: data.timeCommitment as string | undefined,
          contactType: (data.contactType || 'Email') as 'Email' | 'External Link',
          contactEmail: data.contactEmail as string | undefined,
          contactURL: data.contactURL as string | undefined,
          order: (data.order || 0) as number,
          slug: fileName.replace(/\.md$/, ''),
        };
      })
      .sort((a, b) => a.order - b.order);
    return positions;
  } catch (error) {
    console.error(`Error reading volunteer positions:`, error);
    return [];
  }
}

export interface CarouselImages {
  images: string[];
}

export function getVolunteerCarouselImages(): CarouselImages {
  const fullPath = path.join(contentDirectory, 'volunteer-carousel.md');
  if (!fs.existsSync(fullPath)) {
    console.warn(`Warning: Volunteer carousel images file not found: ${fullPath}`);
    return { images: [] };
  }
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    console.log('Volunteer carousel raw data:', data); // Debug log

    if (!data.images || !Array.isArray(data.images)) {
      console.warn('No images array found in volunteer carousel data');
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

    console.log('Volunteer processed images:', images); // Debug log
    return { images };
  } catch (error) {
    console.error('Error reading volunteer carousel images:', error);
    return { images: [] };
  }
}