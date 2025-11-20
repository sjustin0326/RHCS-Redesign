import { getSerializedNextEvent, getSerializedOtherUpcomingEvents } from '@/utils/eventUtils';
import { getVisitorInfo, getDirections, getMaps } from '@/utils/treeToursUtils';
import SectionNav from '../components/SectionNav';
import UpcomingNextEvent from '../components/UpcomingNextEvent';
import OtherUpcomingEvents from '../components/OtherUpcomingEvents';
import ComingSoon from '../components/ComingSoonEvents';

export default function TreeToursPage() {
  const nextEvent = getSerializedNextEvent();
  const otherEvents = getSerializedOtherUpcomingEvents();
  const visitorInfo = getVisitorInfo();
  const directions = getDirections();
  const maps = getMaps();

  const treeTourSections = [
    { label: "Tree Tours", targetId: "tree-tours" },
    { label: "Visitor Information", targetId: "visitor-info" },
    { label: "Directions", targetId: "directions" },
    { label: "Maps", targetId: "maps" },
  ];

  const PageSection = ({ id, title, children }: { id: string, title?: string, children: React.ReactNode }) => (
    <section id={id} className="min-h-screen py-16 scroll-mt-24">
      <div className="bg-cream container mx-auto px-6">
        {title && (
          <h2 className="text-3xl font-Inter font-black text-darkgreen mb-8">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );

  

  return (
    <main className='max-w-4xl mx-auto'>
  
      <div className="bg-cream pt-16 px-6 pb-8">
        <div className='mb-8 border-b-2 border-olive pb-4'>
            <h1 className="text-3xl font-Inter font-black text-darkgreen capitalize animate-slide-down pb-2">
              Tree Tours
            </h1>
            <p className='text-sm md:text-lg font-poppins font-medium text-gray-700 animate-slide-down'>
            The Riverview Horticultural Centre Society invite you to a Tree Tour of a significant and beautiful part of the Lower Mainland, the historic Riverview Lands Arboretum.
            </p>
          </div>
      </div>
      
      
      <SectionNav sections={treeTourSections} />

      <div className="">
        
        {/* === TREE TOURS === */}
        <PageSection id="tree-tours">
          <h2 className="text-3xl font-Inter font-black text-darkgreen capitalize animate-slide-down mb-8">
            NEXT TREE TOUR
          </h2>
          {!nextEvent ? (
            <ComingSoon />
          ) : (
            <div className="max-w-4xl mx-auto">
              <UpcomingNextEvent event={nextEvent} />
              
              {otherEvents.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-lg font-Inter font-black text-darkgreen capitalize animate-slide-down mb-4">
                    OTHER UPCOMING TREE TOURS
                  </h2>
                  <OtherUpcomingEvents events={otherEvents} />
                </div>
              )}
            </div>
          )}
        </PageSection>

        {/* === VISITOR INFORMATION === */}
        <PageSection id="visitor-info" title= 'VISITOR INFORMATION'>
          <div className="prose max-w-none"> 
            <div dangerouslySetInnerHTML={{ __html: visitorInfo.htmlContent }} />
          </div>
        </PageSection>
        {/* === DIRECTIONS === */}
        <PageSection id="directions" title='DIRECTIONS'>
        <div className="prose max-w-none">
            <h3>By Car</h3>
            <div dangerouslySetInnerHTML={{ __html: directions.byCarHtml }} />

            <h3 className='mt-8 text-xl font-bold'>By Public Transit</h3>
            <div dangerouslySetInnerHTML={{ __html: directions.byTransitHtml }} />
          </div>
        </PageSection>

        {/* === MAPS === */}
        <PageSection id="maps" title='MAPS'>
        <div className="prose max-w-none">
            <p>Here are some helpful maps for your visit:</p>
            <ul>
              {maps.map_list.map((map, index) => (
                <li key={index} className="mb-2"> 
                  <a
                    href={map.type === 'External Link' ? map.url : map.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-terracotta hover:underline"
                  >
                    {map.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </PageSection>

      </div>
    </main>
  );
}