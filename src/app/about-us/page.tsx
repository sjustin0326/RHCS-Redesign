import React from 'react';
import HeroSection from '@/app/components/HeroSection';
import SectionNav from '@/app/components/SectionNav';
import Image from 'next/image';
import Accordion from '@/app/components/Accordion';
import GetInvolvedSection from '@/app/components/GetInvolvedSection';
import AchievementsSection from '../components/Achievements';
import MemoriamSection from '../components/MemoriamSection';
import { getHeroSectionData } from '@/utils/heroUtils';
import {
  getMission,
  getVision,
  getWhatWeDo,
  getWhyFounded,
  getAchievements,
  getGetInvolved,
  getMemoriamSection,
  getMemoriamEntries,
} from '@/utils/aboutUtils';

export default async function AboutUsPage() {
  const heroData = await getHeroSectionData('src/content/about/hero.md');
  const missionData = getMission();
  const visionData = getVision();
  const whatWeDoData = getWhatWeDo();
  const whyFoundedData = getWhyFounded();
  const achievementsData = getAchievements();
  const getInvolvedData = getGetInvolved();
  const memoriamSectionData = getMemoriamSection();
  const memoriamEntries = getMemoriamEntries();

  const sections = [
    { label: 'Mission & Vision', targetId: 'mission-vision' },
    { label: 'What We Do', targetId: 'what-we-do' },
    { label: 'Why Founded', targetId: 'why-founded' },
    { label: 'Achievements', targetId: 'achievements' },
    { label: 'Get Involved', targetId: 'get-involved' },
    { label: 'In Memoriam', targetId: 'in-memoriam' },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <HeroSection data={heroData} />
      <SectionNav sections={sections} />
      
      {/* Mission & Vision Section */}
      <section
        id="mission-vision"
        className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-darkcream to-cream px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10 text-center text-darkgreen font-inter">
            Mission & Vision
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <Accordion
              title={missionData.title}
              htmlContent={missionData.htmlContent}
              defaultOpen={true}
            />
            <Accordion
              title={visionData.title}
              htmlContent={visionData.htmlContent}
            />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section
        id="what-we-do"
        className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-darkgreen font-inter">
                {whatWeDoData.title}
              </h2>
              <div
                className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 font-poppins"
                dangerouslySetInnerHTML={{ __html: whatWeDoData.htmlContent }}
              />
            </div>
            {whatWeDoData.image && (
              <div className="order-1 lg:order-2 relative h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden shadow-medium">
                <Image
                  src={whatWeDoData.image}
                  alt="What We Do"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Founded Section */}
      <section
        id="why-founded"
        className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-cream to-darkcream px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center text-darkgreen font-inter">
            {whyFoundedData.title}
          </h2>
          <div
            className="prose prose-sm sm:prose-base lg:prose-lg mx-auto text-gray-700 font-poppins"
            dangerouslySetInnerHTML={{ __html: whyFoundedData.htmlContent }}
          />
        </div>
      </section>

      <AchievementsSection data={achievementsData} />
      
      <GetInvolvedSection data={getInvolvedData} />
      
      <MemoriamSection 
        sectionData={memoriamSectionData} 
        entries={memoriamEntries} 
      />
    </main>
  );
}