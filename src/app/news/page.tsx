import { getAllNewsPosts } from '@/utils/newsUtils';
import HeroSection from '../components/HeroSection';
import { getHeroSectionData } from '@/utils/heroUtils';
import NewsListClient from './NewsListClient';

export default async function NewsPage() {
  const heroData = await getHeroSectionData('src/content/news/hero.md');
  const allPosts = getAllNewsPosts();
  
  const years = [...new Set(allPosts.map(post => post.year))]
    .sort((a, b) => b.localeCompare(a));
  
  return (
    <main className="bg-background text-primary min-h-screen">
      {/* Hero Section */}
      <HeroSection
          data={heroData}
          heightClass="h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[350px] sm:min-h-[400px]"
          textClasses={{
            title: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-inter font-bold mb-4 sm:mb-6 md:mb-8",
            description: "text-base sm:text-lg md:text-xl font-poppins font-medium mb-8 sm:mb-10 md:mb-12"
          }}
        />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        
        
        {/* News List Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-inter font-bold text-darkgreen mb-6 sm:mb-8">
            Latest News
          </h2>
          <NewsListClient allPosts={allPosts} years={years} />
        </div>
        
      </div>
    </main>
  );
}