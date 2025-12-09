'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface ImageCarouselProps {
  images: {
    src: string;
    width: number;
    height: number;
  }[];
  altText: string;
  maxWidth?: '60%' | '70%' | '80%' | '100%'; // Add maxWidth prop
}

// arrow
const ArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ImageCarousel({ images, altText, maxWidth = '100%' }: ImageCarouselProps) {
  // fullscreen overlay
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  // loop: true -> infinite loop
  // Autoplay -> every 5s (5000 ms)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  // next and previous
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // open and close overlay/lightbox
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImageIndex(null);
  };

  // navegation for overlay
  const lightboxPrev = () => {
    if (selectedImageIndex !== null) {
      const newIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
    }
  };

  const lightboxNext = () => {
    if (selectedImageIndex !== null) {
      const newIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
    }
  };

  // nav with keyboard on overlay/lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') lightboxPrev();
        if (e.key === 'ArrowRight') lightboxNext();
        if (e.key === 'Escape') closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedImageIndex]);

  // Map maxWidth to Tailwind classes
  const maxWidthClass = {
    '60%': 'lg:max-w-[60%]',
    '70%': 'lg:max-w-[70%]',
    '80%': 'lg:max-w-[80%]',
    '100%': 'max-w-4xl'
  }[maxWidth];

  return (
    <>
      <div 
        className={`relative w-full ${maxWidthClass} mx-auto overflow-hidden rounded-lg aspect-[4/3] lg:aspect-16/9 bg-black/5`} 
        ref={emblaRef}
      >
        {/* slides */}
        <div className="flex h-full">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative flex-grow-0 flex-shrink-0 w-full basis-full cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={img.src}
                alt={`${altText} - Image ${index + 1}`}
                fill
                className="object-contain rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 1024px"
              />
            </div>
          ))}
        </div>

        {/* nav buttons */}
        <button
          className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all"
          onClick={scrollPrev}
          aria-label="Imagen anterior"
        >
          <ArrowIcon className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button
          className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-all"
          onClick={scrollNext}
          aria-label="Siguiente imagen"
        >
          <ArrowIcon className="w-4 h-4 md:w-6 md:h-6 rotate-180" />
        </button>
      </div>

      {/* Lightbox / Overlay*/}
      {lightboxOpen && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* prim. image on lightbox, propag. is stopped so it doenst close when clicked*/}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[selectedImageIndex].src}
              alt={`${altText} - Image ${selectedImageIndex + 1}`}
              width={images[selectedImageIndex].width}
              height={images[selectedImageIndex].height}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>

          {/* close button */}
          <button
            className="absolute top-5 right-5 text-white text-5xl font-bold w-12 h-12"
            onClick={closeLightbox}
            aria-label="Close image overlay"
          >
            &times;
          </button>
          {/* nav buttons on <overlay/lightbox*/}
          <button
            className="absolute top-1/2 left-5 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous image"
          >
            <ArrowIcon className="w-10 h-10" />
          </button>
          <button
            className="absolute top-1/2 right-5 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next image"
          >
            <ArrowIcon className="w-10 h-10 rotate-180" />
          </button>
        </div>
      )}
    </>
  );
}