import React from 'react';
import YouTubeEmbed from './YouTubeEmbed';
import { VirtualTourData } from '@/utils/homeUtils';

interface VirtualTourSectionProps {
  data: VirtualTourData;
}

export default function VirtualTourSection({ data }: VirtualTourSectionProps) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 animate-slide-down">
          <h2 className="text-3xl md:text-4xl font-inter font-black text-darkgreen mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-lg font-poppins text-dark/70 max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>
        
        <div className="animate-scale-in">
          <YouTubeEmbed url={data.youtubeUrl} title={data.title} />
        </div>
      </div>
    </section>
  );
}