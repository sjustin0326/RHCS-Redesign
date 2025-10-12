import { getAllNewsPosts } from '@/utils/newsUtils';
import NewsListClient from './NewsListClient';

export default function NewsPage() {
  const allPosts = getAllNewsPosts();

  // group posts by year for the banners
  const postsByYear = allPosts.reduce((acc, post) => {
    const year = post.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<string, typeof allPosts>);

  // sorted list of years (e.g., ['2025', '2024'])
  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <main className="bg-background text-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-inter text-darkgreen mb-8 border-b-2 border-olive pb-4">
          News & Updates
        </h1>
        
        <NewsListClient postsByYear={postsByYear} years={years} />
      </div>
    </main>
  );
}