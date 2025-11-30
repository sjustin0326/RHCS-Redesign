import HomePageEvents from "./components/HomePageEvent"; 
import HeroSection from "./components/HeroSection";
import { getHeroSectionData } from "@/utils/heroUtils";

export default async function Home() {
  const heroData = await getHeroSectionData('src/content/home/hero.md');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection 
        data={heroData}
        heightClass="h-[60vh] min-h-[500px]" // Hero más grande para la home page
        textClasses={{
          title: "text-4xl md:text-6xl font-bold mb-8", 
          description: "text-lg md:text-xl font-poppins font-medium mb-12" 
        }}
      />

      {/* Events in Home Page */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-inter font-black text-darkgreen capitalize animate-slide-down">
            NEXT TREE TOUR
          </h2>
          <div className="animate-slide-down">
            <HomePageEvents />
          </div>
        </div>
      </section>
    </div>
  );
}