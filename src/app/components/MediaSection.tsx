import React from 'react';
import YouTubeEmbed from './YouTubeEmbed';
import AudioPlayer from './AudioPlayer';
import { MediaSectionData } from '@/utils/homeUtils';

interface MediaSectionProps {
  data: MediaSectionData;
}

export default function MediaSection({ data }: MediaSectionProps) {
  return (
    <section className="py-16 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-inter font-black text-darkgreen text-center mb-12 animate-slide-down">
          {data.title}
        </h2>
        
        <div className="space-y-12">
          {data.mediaItems.map((item, index) => (
            <div 
              key={index} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-inter font-bold text-darkgreen mb-2">
                  {item.title}
                </h3>
                <p className="text-lg font-poppins text-dark/70">
                  {item.description}
                </p>
              </div>

              {item.type === 'YouTube Video' && item.youtubeUrl && (
                <YouTubeEmbed url={item.youtubeUrl} title={item.title} />
              )}

              {item.type === 'Audio' && item.audioFile && (
                <AudioPlayer src={item.audioFile} title={item.title} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}