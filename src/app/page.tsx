import Navigation from "./components/Navigation"
import { getNextEvent } from '@/utils/eventUtils';
import HomePageEvents from "./components/HomePageEvent";
import { tektonFont } from "@/lib/fonts";

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-forest-light text-cream py-20 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-8 animate-slide-up ${tektonFont.className}`}>
          The Riverview Horticultural Centre Society
          </h1>
          <p className="text-lg md:text-xl font-poppins font-medium mb-12 animate-slide-up">
            Preserving the historic səmiq̓ʷəʔelə / Riverview Lands and its unique tree arboretum for future
            generations through education, advocacy, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <button className="bg-terracotta text-cream px-8 py-4 rounded-full font-opensans font-black transition-all duration-300 hover:scale-105 hover:shadow-medium">
              Sign the Petition
            </button>
            <button className="border-2 border-cream text-cream px-8 py-4 rounded-full font-opensans font-black hover:bg-cream hover:text-forest-light transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Events in Home Page */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto ">
          <h2 className="text-3xl font-Inter font-black text-darkgreen capitalize animate-slide-down">
            NEXT TREE TOUR
          </h2>
          <div className="animate-slide-down" >
          <HomePageEvents />
          </div>
          
        </div>
      </section>
    </div>
  )
}