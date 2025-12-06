import React from 'react';
import Link from 'next/link';

export default function TreeTourCTAs() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
      {/* Primary CTA */}
      <Link
        href="/tree-tours#visitor-info"
        className="inline-block px-8 py-3 bg-terracotta text-cream font-inter font-semibold rounded-lg hover:bg-olive transition-colors shadow-medium hover:shadow-strong text-center"
      >
        Check Visitor Information
      </Link>

      {/* Secondary CTA */}
      <Link
        href="/tree-tours#directions"
        className="inline-block px-8 py-3 bg-white text-terracotta border-2 border-terracotta font-inter font-semibold rounded-lg hover:bg-darkcream transition-colors shadow-soft hover:shadow-medium text-center"
      >
        How To Get There?
      </Link>
    </div>
  );
}