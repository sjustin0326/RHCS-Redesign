import { getAllNewsPosts, getNewsPostBySlug } from '@/utils/newsUtils';
import { notFound } from 'next/navigation';
import ImageCarousel from '@/app/components/ImageCarousel';
import Link from 'next/link';
import Image from 'next/image';

type Params = Promise<{
  slug: string
}>;

export async function generateStaticParams() {
  const posts = getAllNewsPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsPostPage(props: {params: Params}) {
  const params = await props.params;
  const post = getNewsPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const hasImages = post.images && post.images.length > 0;
  const hasSingleImage = hasImages && post.images.length === 1;
  const hasMultipleImages = hasImages && post.images.length > 1;
  
  const singleImage = hasSingleImage ? post.images[0] : null;
  const isVerticalImage = singleImage && singleImage.height > singleImage.width;
  
  return (
    <article className="bg-background text-primary min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Back Button */}
        <Link 
          href="/news" 
          className="
            inline-flex items-center gap-2
            text-logo-green 
            hover:text-darkgreen
            font-inter
            font-medium
            text-sm sm:text-base
            mb-6 sm:mb-8
            transition-colors
            duration-200
            group
          "
        >
          <svg 
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to News
        </Link>
        
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <h1 className="
            text-3xl sm:text-4xl lg:text-5xl 
            font-bold 
            font-inter 
            text-darkgreen 
            mb-3 sm:mb-4
            leading-tight
          ">
            {post.title}
          </h1>
          <span className="
            block 
            text-sm sm:text-base
            text-olive 
            font-opensans 
            font-medium
            uppercase
            tracking-wide
          ">
            {post.formattedDate}
          </span>
        </header>
        
        {/* Content Layout */}
        {hasMultipleImages ? (
          // LAYOUT A: Multiple Images - Carousel + Text
          <div className="lg:grid lg:grid-cols-3 lg:gap-12 items-start">
            
            {/* Left: Carousel */}
            <div className="mb-8 lg:mb-0 lg:col-span-1 lg:sticky lg:top-24">
              <ImageCarousel images={post.images} altText={post.title} />
            </div>
            
            {/* Right: Text Content */}
            <div className="lg:col-span-2">
              <div
                className="
                  prose prose-base sm:prose-lg 
                  max-w-none 
                  font-poppins
                  prose-headings:font-inter 
                  prose-headings:text-darkgreen
                  prose-headings:font-bold
                  prose-h2:text-2xl sm:prose-h2:text-3xl
                  prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl sm:prose-h3:text-2xl
                  prose-p:text-gray-700
                  prose-p:leading-relaxed
                  prose-a:text-logo-green 
                  prose-a:no-underline
                  hover:prose-a:underline
                  prose-a:font-medium
                  prose-strong:text-darkgreen
                  prose-strong:font-semibold
                  prose-ul:my-6
                  prose-li:text-gray-700
                  prose-img:rounded-lg
                  prose-img:shadow-medium
                "
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />
            </div>
          </div>
        ) : (
          // LAYOUT B: Single or No Image
          <>
            {/* Single Horizontal Image */}
            {hasSingleImage && !isVerticalImage && (
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden mb-8 sm:mb-12 shadow-medium">
                <Image 
                  src={singleImage!.src} 
                  alt={post.title} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            )}
            
            {/* Content Container */}
            <div className={`
              ${hasSingleImage && isVerticalImage ? 'lg:grid lg:grid-cols-3 lg:gap-12' : ''}
            `}>
              
              {/* Text Content */}
              <div className={`
                ${hasSingleImage && isVerticalImage ? 'lg:col-span-2' : ''}
              `}>
                <div
                  className="
                    prose prose-base sm:prose-lg 
                    max-w-none 
                    font-poppins
                    prose-headings:font-inter 
                    prose-headings:text-darkgreen
                    prose-headings:font-bold
                    prose-h2:text-2xl sm:prose-h2:text-3xl
                    prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl sm:prose-h3:text-2xl
                    prose-p:text-gray-700
                    prose-p:leading-relaxed
                    prose-a:text-logo-green 
                    prose-a:no-underline
                    hover:prose-a:underline
                    prose-a:font-medium
                    prose-strong:text-darkgreen
                    prose-strong:font-semibold
                    prose-ul:my-6
                    prose-li:text-gray-700
                    prose-img:rounded-lg
                    prose-img:shadow-medium
                  "
                  dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                />
              </div>
              
              {/* Single Vertical Image */}
              {hasSingleImage && isVerticalImage && (
                <div className="
                  relative 
                  w-full 
                  aspect-[3/4] 
                  rounded-xl 
                  overflow-hidden 
                  mt-8 lg:mt-0 
                  lg:col-span-1 
                  lg:sticky 
                  lg:top-24
                  shadow-medium
                ">
                  <Image 
                    src={singleImage!.src} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              )}
            </div>
          </>
        )}
        
      </div>
    </article>
  );
}