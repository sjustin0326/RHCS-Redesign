import React from 'react';
import { getSerializedNextEvent,
  getSerializedOtherUpcomingEvents 
} from '@/utils/eventUtils';
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
import ImageCarousel from '../components/ImageCarousel';
import { getTreeToursCarouselImages } from '@/utils/treeToursUtils';
import { getImagesWithDimensions } from '@/utils/imageUtils';

interface DirectionMethodProps {
  icon: React.ReactNode;
  title: string;
  htmlContent: string;
}

const DirectionMethod: React.FC<DirectionMethodProps> = ({ icon, title, htmlContent }) => (
  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 bg-darkcream rounded-xl shadow-soft animate-slide-up hover:shadow-medium transition-shadow duration-300">
    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-olive/10 text-olive rounded-full flex items-center justify-center p-2">
      {React.cloneElement(icon as React.ReactElement, { className: "w-full h-full text-olive" })}
    </div>
    <div className="flex-grow w-full">
      <h3 className="text-lg sm:text-xl font-inter font-semibold text-darkgreen mb-2">
        {title}
      </h3>
      <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 font-poppins">
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
      className="inline-flex items-center justify-center w-full px-4 py-2.5 sm:py-3 bg-darkgreen hover:bg-terracottalight text-cream hover:text-white rounded-lg shadow-sm transition-all duration-300 ease-in-out font-inter text-sm sm:text-base font-medium group"
    >
      {isExternalLink ? (
        <ArrowTopRightOnSquareIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-olive group-hover:text-white flex-shrink-0" />
      ) : (
        <DocumentTextIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cream group-hover:text-white flex-shrink-0" />
      )}
      <span className="truncate">{map.title}</span>
      {isExternalLink && (
        <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-2 text-darkgreen/70 group-hover:text-white flex-shrink-0" />
      )}
    </a>
  );
};

const VirtualTourVideoCard: React.FC<{ video: VirtualTourVideo }> = ({ video }) => (
  <div className="p-4 sm:p-5 md:p-6 bg-darkcream rounded-xl shadow-soft animate-slide-up mb-6 hover:shadow-medium transition-shadow duration-300">
    <h3 className="text-xl sm:text-2xl font-inter font-bold text-darkgreen mb-3 sm:mb-4 text-center">
      {video.title}
    </h3>
    <p className='text-sm sm:text-base md:text-md font-poppins text-gray-700 mb-4'>
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
    <p className="font-opensans text-xs sm:text-sm text-gray-600 mt-3 text-center sm:text-left">
      <a
        href={video.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-terracotta hover:text-terracottalight hover:underline font-opensans text-sm sm:text-base transition-colors duration-300"
      >
        <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1 flex-shrink-0" />
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
  const carouselImagesData = getTreeToursCarouselImages();
  const carouselImages = await getImagesWithDimensions(carouselImagesData.images);

  const treeTourSections = [
    { label: "Tree Tours", targetId: "tree-tours" },
    { label: visitorInfo.title || "Visitor Information", targetId: "visitor-info" },
    { label: directions.title || "Directions", targetId: "directions" },
    { label: maps.title || "Maps", targetId: "maps" },
  ];

  const PageSection = ({ id, title, children }: { id: string, title?: string, children: React.ReactNode }) => (
    <section id={id} className="py-8 sm:py-12 md:py-16 lg:py-20 scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold text-darkgreen mb-6 sm:mb-8 text-center animate-slide-down uppercase">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );

  return (
    <main className='bg-cream'>
      <HeroSection
        data={heroData}
        heightClass="h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[350px] sm:min-h-[400px]"
        textClasses={{
          title: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8",
          description: "text-base sm:text-lg md:text-xl font-poppins font-medium mb-8 sm:mb-10 md:mb-12"
        }}
      />
      <SectionNav sections={treeTourSections} />

      <div className="bg-cream">
        {/* === TREE TOURS === */}
        <PageSection id="tree-tours">
          {/* Image Carousel*/}
          {carouselImages.length > 0 && (
            <div className="mb-8 sm:mb-10 md:mb-12">
              <ImageCarousel
                images={carouselImages}
                altText="Tree Tour"
                maxWidth="60%"
              />
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold text-darkgreen capitalize animate-slide-down mb-6 sm:mb-8 text-center">
            NEXT TREE TOUR
          </h2>
          
          {!nextEvent ? (
            <ComingSoon />
          ) : (
            <div className="max-w-4xl mx-auto mb-6">
              <UpcomingNextEvent event={nextEvent} />
              {otherEvents.length > 0 && (
                <div className="mt-8 sm:mt-10 md:mt-12">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-inter font-bold text-darkgreen capitalize animate-slide-down mb-4 sm:mb-6 text-center">
                    OTHER UPCOMING TREE TOURS
                  </h3>
                  <OtherUpcomingEvents events={otherEvents} />
                </div>
              )}
            </div>
          )}

          {/* Virtual Tree Tour Videos */}
          {virtualTours.videos.length > 0 && (
            <div className="mt-8 sm:mt-10 md:mt-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-inter font-bold text-darkgreen animate-slide-down mb-6 sm:mb-8 text-center">
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
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 bg-darkcream p-4 sm:p-5 md:p-6 rounded-xl shadow-soft animate-fade-in font-poppins">
            <div dangerouslySetInnerHTML={{ __html: visitorInfo.htmlContent }} />
          </div>
        </PageSection>

        {/* === DIRECTIONS === */}
        <PageSection id="directions" title={directions.title}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
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
          <div className="bg-darkcream p-4 sm:p-5 md:p-6 rounded-xl shadow-soft">
            <p className='mb-6 text-base sm:text-lg font-poppins text-center text-gray-700'>
              Here are some helpful maps and resources for your visit:
            </p>

            {/* Google Map Section */}
            <div className="p-4 sm:p-5 bg-white rounded-xl animate-scale-in border-2 border-olive/20 mb-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-inter font-semibold text-darkgreen mb-4 text-center md:text-left">
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
              <p className="font-poppins text-sm sm:text-base text-gray-700 mb-3 text-center md:text-left">
                <strong className="font-inter">Address:</strong> {maps.location.address}
              </p>
              {/* Link to open in Google Maps */}
              <div className="text-center md:text-left">
                <a
                  href={maps.location.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-terracotta hover:text-terracottalight hover:underline font-opensans text-sm sm:text-base transition-colors duration-300"
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Downloadable Maps & Links Section */}
            <div className="p-4 sm:p-5 bg-white rounded-xl animate-slide-up">
              <h3 className="text-lg sm:text-xl md:text-2xl font-inter font-semibold text-darkgreen mb-4 text-center md:text-left">
                Downloadable Maps & Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {maps.map_list.length > 0 ? (
                  maps.map_list.map((mapItem, index) => (
                    <MapLink key={index} map={mapItem} />
                  ))
                ) : (
                  <p className="text-gray-500 font-poppins col-span-full text-center text-sm sm:text-base">
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