import React from 'react';
import HeroSection from '@/app/components/HeroSection';
import SectionNav from '@/app/components/SectionNav';
import Image from 'next/image';
import Accordion from '@/app/components/Accordion';
import GetInvolvedSection from '@/app/components/GetInvolvedSection';
import AchievementsSection from '../components/Achievements';
import { getHeroSectionData } from '@/utils/heroUtils';
import {
  getMission,
  getVision,
  getWhatWeDo,
  getWhyFounded,
  getAchievements,
  getGetInvolved,
} from '@/utils/aboutUtils';

export default async function AboutUsPage() {
  const heroData = await getHeroSectionData('src/content/about/hero.md');
  const missionData = getMission();
  const visionData = getVision();
  const whatWeDoData = getWhatWeDo();
  const whyFoundedData = getWhyFounded();
  const achievementsData = getAchievements();
  const getInvolvedData = getGetInvolved();

  const sections = [
    { label: 'Mission & Vision', targetId: 'mission-vision' },
    { label: 'What We Do', targetId: 'what-we-do' },
    { label: 'Why Founded', targetId: 'why-founded' },
    { label: 'Achievements', targetId: 'achievements' },
    { label: 'Get Involved', targetId: 'get-involved' },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <HeroSection data={heroData} />

      <SectionNav sections={sections} />

      <section id="mission-vision" className="py-16 bg-gradient-to-b from-darkcream to-cream">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center text-darkgreen">
            Mission & Vision
          </h2>
          <div className="space-y-4">
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
      <section id="what-we-do" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-darkgreen">
                {whatWeDoData.title}
              </h2>
              <div 
                className="prose prose-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: whatWeDoData.htmlContent }}
              />
            </div>
            {whatWeDoData.image && (
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={whatWeDoData.image}
                  alt="What We Do"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <section id="why-founded" className="py-16 bg-gradient-to-b from-cream to-darkcream">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6 text-center text-darkgreen">
            {whyFoundedData.title}
          </h2>
          <div 
            className="prose prose-lg mx-auto text-gray-700"
            dangerouslySetInnerHTML={{ __html: whyFoundedData.htmlContent }}
          />
        </div>
      </section>
      <AchievementsSection data={achievementsData} />
      <GetInvolvedSection data={getInvolvedData} />
    </main>
  );
}