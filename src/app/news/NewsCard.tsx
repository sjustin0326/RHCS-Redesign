import Link from 'next/link';
import Image from 'next/image';
import { ProcessedNewsPost } from '@/utils/newsUtils';

interface NewsCardProps {
  post: ProcessedNewsPost;
}

export default function NewsCard({ post }: NewsCardProps) {
  return (
    <Link 
      href={`/news/${post.slug}`} 
      className="
        group 
        flex flex-col 
        bg-white 
        rounded-xl 
        shadow-soft 
        hover:shadow-strong 
        transition-all 
        duration-300 
        overflow-hidden
        border border-transparent
        hover:border-olive/20
        transform hover:-translate-y-1
      "
    >
      {/* Image */}
      {post.images && post.images.length > 0 && (
        <div className="relative w-full h-48 sm:h-52 lg:h-56 overflow-hidden bg-gray-100">
          <Image
            src={post.images[0].src}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Date */}
        <p className="text-xs sm:text-sm text-olive font-opensans font-medium mb-2 uppercase tracking-wide">
          {post.formattedDate}
        </p>
        
        {/* Title */}
        <h3 className="
          text-lg sm:text-xl 
          font-bold 
          font-inter 
          text-darkgreen 
          mb-3 
          group-hover:text-logo-green 
          transition-colors 
          duration-300
          line-clamp-2
        ">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="
          text-sm sm:text-base 
          text-gray-700 
          font-poppins 
          font-normal
          flex-grow 
          mb-4 
          line-clamp-3
          leading-relaxed
        ">
          {post.excerpt}
        </p>
        
        {/* Read More Link */}
        <div className="
          mt-auto 
          flex items-center gap-2
          text-terracotta 
          group-hover:text-terracottalight 
          font-inter
          font-semibold 
          text-sm
          transition-all 
          duration-200
        ">
          <span>Read More</span>
          <svg 
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}