import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const contentDirectory = path.join(process.cwd(), 'src/content/get-involved');

// export interface WhyGetInvolved {
//   title: string;
//   benefits: {
//     members: {
//       icon: string;
//       text: string;
//     };
//     donors: {
//       icon: string;
//       text: string;
//     };
//     volunteers: {
//       icon: string;
//       text: string;
//     };
//   };
// }

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


// export function getWhyGetInvolved(): WhyGetInvolved {
//   const result = readMarkdownFile('why-get-involved.md');
  
//   if (!result) {
//     return {
//       title: 'Why Get Involved?',
//       benefits: {
//         members: { icon: 'email', text: 'Join us and receive our newsletters' },
//         donors: { icon: 'donation', text: 'Your donation helps preserve these lands' },
//         volunteers: { icon: 'volunteer', text: 'Make a tangible difference' },
//       },
//     };
//   }
  
//   const { data } = result;
  
//   return {
//     title: (data.title || 'Why Get Involved?') as string,
//     benefits: {
//       members: data.benefits?.members || { icon: 'email', text: '' },
//       donors: data.benefits?.donors || { icon: 'donation', text: '' },
//       volunteers: data.benefits?.volunteers || { icon: 'volunteer', text: '' },
//     },
//   };
// }

// Get Membership data
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
  
  // Process payment methods to convert markdown details to HTML
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

// Get Donations data
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
  
  // Process payment options to convert markdown details to HTML
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

// Get Volunteer Section data
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

// Get all Volunteer Positions
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
        
        // Use content or description
        let descriptionText: string;
        if (content && content.trim()) {
          descriptionText = content.trim();
        } else if (data.description && typeof data.description === 'string') {
          descriptionText = data.description.trim();
        } else {
          descriptionText = '';
        }
        
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
      // Sort by order field
      .sort((a, b) => a.order - b.order);
    
    return positions;
  } catch (error) {
    console.error(`Error reading volunteer positions:`, error);
    return [];
  }
}