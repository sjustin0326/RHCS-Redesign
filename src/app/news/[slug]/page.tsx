import { getAllNewsPosts, getNewsPostBySlug } from '@/utils/newsUtils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

//pages to pre-build
export async function generateStaticParams() {
  const posts = getAllNewsPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsPostPage({ params }: { params: { slug: string } }){
    const post = await getNewsPostBySlug(params.slug);
  
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
          
          {/* Case 1: SINGLE HORIZONTAL IMAGE */}
          {hasSingleImage && !isVerticalImage && (
            <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
              <Image src={singleImage!.src} alt={post.title} fill className="object-cover" />
            </div>
          )}
  
          <div className={`
            ${hasSingleImage && isVerticalImage ? 'lg:grid lg:grid-cols-3 lg:gap-12' : ''}
          `}>
            {/* text content */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none prose-h2:font-inter prose-h2:text-darkgreen prose-a:text-logo-green hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />
            </div>
  
            {/* Case 2: SINGLE VERTICAL IMAGE (Desktop only) */}
            {hasSingleImage && isVerticalImage && (
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mt-8 lg:mt-0 lg:col-span-1">
                <Image src={singleImage!.src} alt={post.title} fill className="object-cover"/>
              </div>
            )}
          </div>
  
          {/* Case 3: MULTIPLE IMAGES (render a carousel) */}
          {hasMultipleImages && (
            <div className="mt-8">
              <p className="text-center font-bold text-lg mb-4">Image Gallery</p>
              {/* TODO: implement an image carousel component here */}
              <div className="bg-gray-200 p-8 rounded-lg text-center">
                [Image Carousel Placeholder] - See Step 5
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }