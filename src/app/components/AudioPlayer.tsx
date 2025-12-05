'use client';

import React from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-medium p-6">
      <h4 className="font-inter font-semibold text-darkgreen mb-4">{title}</h4>
      <audio
        controls
        className="w-full"
        preload="metadata"
      >
        <source src={src} type="audio/wav" />
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}