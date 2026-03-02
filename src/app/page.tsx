import HomePageEvents from "./components/HomePageEvent";
import HeroSection from "./components/HeroSection";
import IntroMissionSection from "./components/IntroMissionSection";
import MediaSection from "./components/MediaSection";
import VirtualTourSection from "./components/VirtualTourSection";
import GetInvolvedCards from "./components/GetInvolvedCards";
import TreeTourCTAs from "./components/TreeTourCTAs";

import { getHeroSectionData } from "@/utils/heroUtils";
import { 
  getIntroMissionData, 
  getMediaSectionData, 
  getVirtualTourData, 
  getGetInvolvedCardsData 
} from "@/utils/homeUtils";

export default async function Home() {
  const heroData = await getHeroSectionData('src/content/home/hero.md');
  const introMissionData = await getIntroMissionData();
  const mediaSectionData = await getMediaSectionData();
  const virtualTourData = await getVirtualTourData();
  const getInvolvedCardsData = await getGetInvolvedCardsData();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        data={heroData}
        heightClass="h-[60vh] min-h-[500px]"
        textClasses={{
          title: "text-4xl md:text-6xl font-bold mb-8",
          description: "text-lg md:text-xl font-poppins font-medium mb-12"
        }}
      />


      {/* Introduction & Mission Section */}
      <IntroMissionSection data={introMissionData} />

      {/* Next Tree Tour Event */}
      <section className="py-16 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-inter font-black text-darkgreen capitalize animate-slide-down mb-8">
            NEXT TREE TOUR
          </h2>
          <div className="animate-slide-down">
            <HomePageEvents />
            <TreeTourCTAs />
          </div>
        </div>
      </section>

      {/* RHCS in Media */}
      {!mediaSectionData?.isHidden && <MediaSection data={mediaSectionData} />}

      {/* Virtual Tree Tour */}
      <VirtualTourSection data={virtualTourData} />

      {/* Get Involved Cards */}
      <GetInvolvedCards data={getInvolvedCardsData} />
    </div>
  );
}
