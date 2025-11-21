import React from 'react';
import { getSerializedNextEvent, getSerializedOtherUpcomingEvents } from '@/utils/eventUtils';
import { getVisitorInfo, getDirections, getMaps, MapItem } from '@/utils/treeToursUtils';
import SectionNav from '../components/SectionNav';
import UpcomingNextEvent from '../components/UpcomingNextEvent';
import OtherUpcomingEvents from '../components/OtherUpcomingEvents';
import ComingSoon from '../components/ComingSoonEvents';
import CarIcon from '../components/icons/Car';
import BusIcon from '../components/icons/Bus';
import GoogleMap from '../components/GoogleMap';
import { DocumentTextIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

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

// map for download/link
const MapLink: React.FC<{ map: MapItem }> = ({ map }) => {
  const isExternalLink = map.type === 'External Link';
  const href = isExternalLink ? map.url : map.file;

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-full px-4 py-3 bg-darkgreen hover:bg-terracottalight text-cream hover:text-white  rounded-lg shadow-sm transition-all duration-300 ease-in-out font-poppins text-base font-medium group"
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

export default function TreeToursPage() {
  const nextEvent = getSerializedNextEvent();
  const otherEvents = getSerializedOtherUpcomingEvents();
  const visitorInfo = getVisitorInfo();
  const directions = getDirections();
  const maps = getMaps();

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

  const henryEssonYoungMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9170.355807425884!2d-122.8138034394643!3d49.25024190817116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5486789fc8a559f7%3A0xe4c6251d9aad915c!2sHenry%20Esson%20Young%20Building!5e0!3m2!1sen!2sca!4v1763627033587!5m2!1sen!2sca";
  const riverviewAddress = "Kalmia Pl, Coquitlam, BC V3C 4J2"; 
  const openInGoogleMapsUrl = "https://maps.app.goo.gl/phL7jfK1Vbkxkz9cA";
  const youtubeVideoEmbedUrl = "https://www.youtube-nocookie.com/embed/NfeEnBo0CwQ?si=QRoEMRRlLr-eAH7t";
  const youtubeVideoWatchUrl = "https://www.youtube.com/watch?v=NfeEnBo0CwQ";

  return (
    <main className='max-w-4xl mx-auto'>
      <div className="bg-cream pt-16 px-6 pb-8">
        <div className='mb-8 border-b-2 border-olive pb-4'>
          <h1 className="text-3xl md:text-4xl font-inter font-black text-darkgreen capitalize animate-slide-down pb-2 text-center">
            Tree Tours
          </h1>
          <p className='text-sm md:text-lg font-poppins font-medium text-gray-700 animate-slide-down text-center max-w-2xl mx-auto'>
            The Riverview Horticultural Centre Society invite you to a Tree Tour of a significant and beautiful part of the Lower Mainland, the historic Riverview Lands Arboretum.
          </p>
        </div>
      </div>
      <SectionNav sections={treeTourSections} />

      <div className="bg-cream">
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
          {/*  Virtual Tree Tour Video */}
          <div className="p-4 bg-darkcream rounded-xl shadow-inner-soft animate-slide-up">
            <h2 className="text-xl font-inter font-black text-darkgreen capitalize animate-slide-down mb-4 text-center">
                Virtual Tree Tour Video
            </h2>
            <p className='text-sm md:text-md font-opensans font-semibold text-gray-700 mb-4'>
              Explore the beauty and history of the Riverview Arboretum from home with this relaxing Virtual Tree Tour by Camera Jamie. Wander through lush park-like grounds, discover unique and heritage trees, and learn interesting bits of trivia about Riverview Lands' tree collections.
            </p>

            <div className="relative rounded-lg overflow-hidden shadow-medium" style={{ paddingBottom: '56.25%', height: 0 }}> {/* Aspect Ratio 16:9*/}
              <iframe
                src={youtubeVideoEmbedUrl} 
                title="RHCS Virtual Tree Tour - YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <p className="font-opensans text-sm text-gray-600 mt-2 text-center md:text-left">
              <a
                href={youtubeVideoWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-terracotta hover:text-terracottalight hover:underline font-opensans text-base transition-colors duration-300"
              >
                <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
                  Watch on YouTube
                </a>
              </p>
            </div>
        </PageSection>

        {/* === VISITOR INFORMATION === */}
        <PageSection id="visitor-info" title={visitorInfo.title}>
          <div className="prose prose-poppins max-w-none text-gray-700 bg-darkcream p-6 rounded-xl shadow-soft animate-fade-in">
            <div dangerouslySetInnerHTML={{ __html: visitorInfo.htmlContent }} />
          </div>
        </PageSection>

        {/* === DIRECTIONS === */}
        <PageSection id="directions" title={directions.title}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
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
          <div className="prose prose-poppins max-w-none  text-gray-700 bg-darkcream p-6 rounded-xl shadow-soft">
            <p className='mb-6 text-lg font-poppins text-center'>Here are some helpful maps and resources for your visit:</p>

            {/* Google Map Section */}
            <div className=" p-4 bg-darkcream animate-scale-in  border-b-2 border-olive">
              <h3 className="text-xl font-inter font-semibold text-darkgreen mb-4 text-center md:text-left">
                Location: Henry Esson Young Building
              </h3>
              <div className="relative mb-4 rounded-lg overflow-hidden shadow-medium" style={{ paddingBottom: '56.25%', height: 0 }}> {/* Aspect Ratio 16:9 for responsive iframe */}
                <GoogleMap
                  src={henryEssonYoungMapUrl}
                  title="Google Map of Henry Esson Young Building"
                  className="absolute inset-0 w-full h-full border-0"
                  // width y height no son necesarios aquí ya que el contenedor `div` los controla
                />
              </div>
              <p className="font-poppins text-md text-gray-700 mb-2 text-center md:text-left">
                Address: {riverviewAddress}
              </p>
              <div className="text-center md:text-left">
                <a
                  href={openInGoogleMapsUrl}
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
            <div className=" p-4 bg-darkcream rounded-xl  animate-slide-up">
              <h3 className="text-xl font-inter font-semibold text-darkgreen mb-4 text-center md:text-left">
                Downloadable Maps & Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {maps.map_list.length > 0 ? (
                  maps.map_list.map((mapItem, index) => (
                    <MapLink key={index} map={mapItem} />
                  ))
                ) : (
                  <p className="text-gray-500 font-poppins col-span-full text-center">No maps or resources available yet.</p>
                )}
              </div>
            </div>

            

          </div>
        </PageSection>
      </div>
    </main>
  );
}