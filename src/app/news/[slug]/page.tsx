import { getAllNewsPosts, getNewsPostBySlug } from '@/utils/newsUtils';
import { notFound } from 'next/navigation';
import ImageCarousel from '@/app/components/ImageCarousel';
import Link from 'next/link';
import Image from 'next/image';

type Params = Promise<{
   slug: string
//   searchParams?: { [key: string]: string | string[] | undefined };
}>;
export async function generateStaticParams() {
  const posts = getAllNewsPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsPostPage(props: {params: Params}) {
    const params = await props.params
    const post = getNewsPostBySlug(params.slug);
  
    if (!post) {
      notFound();
    }
  
    const hasImages = post.images && post.images.length > 0;
    const hasSingleImage = hasImages && post.images.length === 1;
    const hasMultipleImages = hasImages && post.images.length > 1;
    
    // single image layout
    const singleImage = hasSingleImage ? post.images[0] : null;
    const isVerticalImage = singleImage && singleImage.height > singleImage.width;
  
    return (
      <article className="bg-background text-primary py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/news" className="text-logo-green hover:underline mb-8 inline-block">
            &larr; Back to News
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-bold font-inter text-darkgreen mb-3">
            {post.title}
          </h1>
          <span className="block text-olive font-opensans mb-8">{post.formattedDate}</span>
         
          {/* Conditional Image Rendering */}
          
          {hasMultipleImages ? (
            // --- LAYOUT A: multiple images (Carrusel + Texto) ---
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              {/* left col: Carrusel */}
              <div className="mb-8 lg:mb-0 lg:col-span-1">
                <ImageCarousel images={post.images} altText={post.title} />
              </div>
              {/* right col: text */}
              <div className="lg:col-span-2">
                <div
                  className="prose prose-lg max-w-none prose-h2:font-inter prose-h2:text-darkgreen prose-a:text-logo-green hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                />
              </div>
            </div>
          ) : (
            // --- LAYOUT B: 1 or NO image ---
            <>
              {/* single image horizontal */}
              {hasSingleImage && !isVerticalImage && (
                <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
                  <Image src={singleImage!.src} alt={post.title} fill className="object-cover" />
                </div>
              )}
      
              {/* container for text or vertical img */}
              <div className={`
                ${hasSingleImage && isVerticalImage ? 'lg:grid lg:grid-cols-3 lg:gap-12' : ''}
              `}>
                {/* Text content */}
                <div className="lg:col-span-2">
                  <div
                    className="prose prose-lg max-w-none prose-h2:font-inter prose-h2:text-darkgreen prose-a:text-logo-green hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                  />
                </div>
      
                {/* Single image vertical */}
                {hasSingleImage && isVerticalImage && (
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mt-8 lg:mt-0 lg:col-span-1">
                    <Image src={singleImage!.src} alt={post.title} fill className="object-cover"/>
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      </article>
    );
  }