export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-darkgreen text-cream px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">RHCS</h1>
          <div className="hidden md:flex space-x-8 font-body">
            <a href="#" className="hover:text-golden transition-colors">Home</a>
            <a href="#" className="hover:text-golden transition-colors">About</a>
            <a href="#" className="hover:text-golden transition-colors">Visit & Explore</a>
            <a href="#" className="hover:text-golden transition-colors">Get Involved</a>
            <a href="#" className="hover:text-golden transition-colors">News & Advocacy</a>
            <a href="#" className="hover:text-golden transition-colors">Resource Library</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-forest-light text-cream py-20 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 animate-slide-up">
          The Riverview Horticultural Centre Society
          </h1>
          <p className="text-lg md:text-xl font-body mb-12 animate-slide-up">
            Preserving the historic səmiq̓ʷəʔelə / Riverview Lands and its unique tree arboretum for future
            generations through education, advocacy, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <button className="bg-terracotta hover:bg-warning text-cream px-8 py-4 rounded-full font-display font-semibold transition-all duration-300 hover:scale-105 hover:shadow-medium">
              Sign the Petition
            </button>
            <button className="border-2 border-cream text-cream px-8 py-4 rounded-full font-display font-semibold hover:bg-cream hover:text-forest-light transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Card */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-strong border-2 border-forest-light animate-slide-up">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-DEFAULT mb-6">
                🌳 Save the Riverview Lands!
              </h2>
              <p className="text-lg font-body text-gray-600 mb-8">
                Join us in preserving this unique arboretum and green space for future generations. Your voice matters!
              </p>
              <button className="bg-darkgreen hover:bg-primary text-cream px-10 py-4 rounded-full font-display font-semibold transition-all duration-300 hover:scale-105 hover:shadow-medium animate-bounce-gentle">
                Sign the Petition Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Link (remove in production) */}
      <div className="fixed bottom-4 right-4">
        <a 
          href="/admin/index.html#/" 
          className="bg-golden hover:bg-accent text-forest-DEFAULT px-4 py-2 rounded-lg font-display font-medium shadow-medium transition-all duration-300 hover:scale-105"
        >
          🌱 Admin
        </a>
      </div>
    </div>
  )
}