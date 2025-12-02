import React from 'react';
import { getSerializedNextEvent, getSerializedOtherUpcomingEvents } from '@/utils/eventUtils';
import { 
  getVisitorInfo, 
  getDirections, 
  getMaps, 
  MapItem,
  getVirtualTours,
  VirtualTourVideo
} from '@/utils/treeToursUtils';
import SectionNav from '../components/SectionNav';
import UpcomingNextEvent from '../components/UpcomingNextEvent';
import OtherUpcomingEvents from '../components/OtherUpcomingEvents';
import ComingSoon from '../components/ComingSoonEvents';
import CarIcon from '../components/icons/Car';
import BusIcon from '../components/icons/Bus';
import GoogleMap from '../components/GoogleMap';
import { DocumentTextIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import HeroSection from '../components/HeroSection';
import { getHeroSectionData } from '@/utils/heroUtils';

interface DirectionMethodProps {
  icon: React.ReactNode;
  title: string;
  htmlContent: string;
}

const DirectionMethod: React.FC<DirectionMethodProps> = ({ icon, title, htmlContent }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 md:p-6 bg-darkcream rounded-xl shadow-soft animate-slide-up">
    <div className="flex-shrink-0 w-12 h-12 bg-olive/10 text-olive rounded-full flex items-center justify-center p-2 mb-2 md:mb-0">
      {React.cloneElement(icon as React.ReactElement, { className: "w-full h-full text-olive" })}
    </div>
    <div className="flex-grow text-center md:text-left">
      <h3 className="text-xl font-inter font-semibold text-darkgreen mb-2">
        {title}
      </h3>
      <div className="prose prose-poppins max-w-none text-gray-700">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  </div>
);

const MapLink: React.FC<{ map: MapItem }> = ({ map }) => {
  const isExternalLink = map.type === 'External Link';
  const href = isExternalLink ? map.url : map.file;

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-full px-4 py-3 bg-darkgreen hover:bg-terracottalight text-cream hover:text-white rounded-lg shadow-sm transition-all duration-300 ease-in-out font-poppins text-base font-medium group"
    >
      {isExternalLink ? (
        <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2 text-olive group-hover:text-white" />
      ) : (
        <DocumentTextIcon className="w-5 h-5 mr-2 text-cream group-hover:text-white" />
      )}
      <span>{map.title}</span>
      {isExternalLink && (
        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 text-darkgreen/70 group-hover:text-white" />
      )}
    </a>
  );
};

const VirtualTourVideoCard: React.FC<{ video: VirtualTourVideo }> = ({ video }) => (
  <div className="p-4 bg-darkcream rounded-xl shadow-inner-soft animate-slide-up mb-6">
    <h3 className="text-xl font-inter font-black text-darkgreen mb-4 text-center">
      {video.title}
    </h3>
    <p className='text-sm md:text-md font-opensans font-semibold text-gray-700 mb-4'>
      {video.description}
    </p>
    
    <div className="relative rounded-lg overflow-hidden shadow-medium" style={{ paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={video.youtubeEmbedUrl}
        title={`${video.title} - YouTube video player`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      ></iframe>
    </div>
    
    <p className="font-opensans text-sm text-gray-600 mt-2 text-center md:text-left">
      <a
        href={video.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-terracotta hover:text-terracottalight hover:underline font-opensans text-base transition-colors duration-300"
      >
        <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
        Watch on YouTube
      </a>
    </p>
  </div>
);

export default async function TreeToursPage() {
  const heroData = await getHeroSectionData('src/content/tree-tours/hero.md');
  const nextEvent = getSerializedNextEvent();
  const otherEvents = getSerializedOtherUpcomingEvents();
  const visitorInfo = getVisitorInfo();
  const directions = getDirections();
  const maps = getMaps();
  const virtualTours = getVirtualTours();

  const treeTourSections = [
    { label: "Tree Tours", targetId: "tree-tours" },
    { label: visitorInfo.title || "Visitor Information", targetId: "visitor-info" },
    { label: directions.title || "Directions", targetId: "directions" },
    { label: maps.title || "Maps", targetId: "maps" },
  ];

  const PageSection = ({ id, title, children }: { id: string, title?: string, children: React.ReactNode }) => (
    <section id={id} className="min-h-screen py-16 scroll-mt-24 bg-cream">
      <div className="container mx-auto px-6 max-w-4xl">
        {title && (
          <h2 className="text-3xl font-inter font-black text-darkgreen mb-8 text-center animate-slide-down">
            {title.toUpperCase()}
          </h2>
        )}
        {children}
      </div>
    </section>
  );

  return (
    <main className=''>
      <HeroSection
        data={heroData}
        heightClass="h-[50vh] min-h-[400px]"
        textClasses={{
          title: "text-4xl md:text-6xl font-bold mb-8",
          description: "text-lg md:text-xl font-poppins font-medium mb-12"
        }}
      />
      <SectionNav sections={treeTourSections} />

      <div className="bg-cream max-w-4xl mx-auto">
        {/* === TREE TOURS === */}
        <PageSection id="tree-tours">
          <h2 className="text-3xl font-inter font-black text-darkgreen capitalize animate-slide-down mb-8 text-center">
            NEXT TREE TOUR
          </h2>
          
          {!nextEvent ? (
            <ComingSoon />
          ) : (
            <div className="max-w-4xl mx-auto mb-6">
              <UpcomingNextEvent event={nextEvent} />
              {otherEvents.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-inter font-black text-darkgreen capitalize animate-slide-down mb-4 text-center">
                    OTHER UPCOMING TREE TOURS
                  </h3>
                  <OtherUpcomingEvents events={otherEvents} />
                </div>
              )}
            </div>
          )}

          {/* Virtual Tree Tour Videos */}
          {virtualTours.videos.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-inter font-black text-darkgreen animate-slide-down mb-6 text-center">
                {virtualTours.sectionTitle}
              </h2>
              {virtualTours.videos.map((video, index) => (
                <VirtualTourVideoCard key={index} video={video} />
              ))}
            </div>
          )}
        </PageSection>

        {/* === VISITOR INFORMATION === */}
        <PageSection id="visitor-info" title={visitorInfo.title}>
          <div className="prose prose-poppins max-w-none text-gray-700 bg-darkcream p-6 rounded-xl shadow-soft animate-fade-in">
            <div dangerouslySetInnerHTML={{ __html: visitorInfo.htmlContent }} />
          </div>
        </PageSection>

        {/* === DIRECTIONS === */}
        <PageSection id="directions" title={directions.title}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DirectionMethod
              icon={<CarIcon />}
              title="By Car"
              htmlContent={directions.byCarHtml}
            />
            <DirectionMethod
              icon={<BusIcon />}
              title="By Public Transit"
              htmlContent={directions.byTransitHtml}
            />
          </div>
        </PageSection>

        {/* === MAPS === */}
        <PageSection id="maps" title={maps.title}>
          <div className="prose prose-poppins max-w-none text-gray-700 bg-darkcream p-6 rounded-xl shadow-soft">
            <p className='mb-6 text-lg font-poppins text-center'>
              Here are some helpful maps and resources for your visit:
            </p>

            {/* Google Map Section */}
            <div className="p-4 bg-darkcream animate-scale-in border-b-2 border-olive">
              <h3 className="text-xl font-inter font-semibold text-darkgreen mb-4 text-center md:text-left">
                {maps.location.title}
              </h3>
              
              {/* Google Map Embed */}
              <div className="mb-4">
                <GoogleMap
                  src={maps.location.googleMapsEmbedUrl}
                  title="Google Map of Meeting Location"
                />
              </div>
              
              {/* Address */}
              <p className="font-poppins text-md text-gray-700 mb-2 text-center md:text-left">
                <strong>Address:</strong> {maps.location.address}
              </p>
              
              {/* Link to open in Google Maps */}
              <div className="text-center md:text-left">
                <a
                  href={maps.location.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-terracotta hover:text-terracottalight hover:underline font-opensans text-base transition-colors duration-300"
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Downloadable Maps & Links Section */}
            <div className="p-4 bg-darkcream rounded-xl animate-slide-up mt-6">
              <h3 className="text-xl font-inter font-semibold text-darkgreen mb-4 text-center md:text-left">
                Downloadable Maps & Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {maps.map_list.length > 0 ? (
                  maps.map_list.map((mapItem, index) => (
                    <MapLink key={index} map={mapItem} />
                  ))
                ) : (
                  <p className="text-gray-500 font-poppins col-span-full text-center">
                    No maps or resources available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </main>
  );
}