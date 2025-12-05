import React from 'react';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import { IntroMissionData } from '@/utils/homeUtils';

interface IntroMissionSectionProps {
  data: IntroMissionData;
}

export default function IntroMissionSection({ data }: IntroMissionSectionProps) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Image Carousel */}
          <div className="order-2 lg:order-1 animate-slide-up">
            <ImageCarousel 
              images={data.images} 
              altText="RHCS Grounds" 
            />
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2 animate-slide-down">
            <h2 className="text-3xl md:text-4xl font-inter font-black text-darkgreen mb-6">
              {data.title}
            </h2>
            <div 
              className="prose prose-lg max-w-none font-poppins text-dark/80 mb-8"
              dangerouslySetInnerHTML={{ __html: data.htmlContent }}
            />
            <Link
              href={data.learnMoreButton.url}
              className="inline-block px-8 py-3 bg-darkgreen text-cream font-inter font-semibold rounded-lg hover:bg-olive transition-colors shadow-medium hover:shadow-strong"
            >
              {data.learnMoreButton.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}