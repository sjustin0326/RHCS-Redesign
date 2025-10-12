import Link from 'next/link';
import Image from 'next/image';
import { ProcessedNewsPost } from '@/utils/newsUtils';

interface NewsCardProps {
  post: ProcessedNewsPost;
}

export default function NewsCard({ post }: NewsCardProps) {
  return (
    <Link href={`/news/${post.slug}`} className="group flex flex-col bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden">
      {post.images && post.images.length > 0 && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={post.images[0].src}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-olive font-opensans mb-2">{post.formattedDate}</p>
        <h3 className="text-xl font-bold font-inter text-darkgreen mb-3 group-hover:text-logo-green transition-colors">
          {post.title}
        </h3>
        {/* Using prose to style the excerpt from markdown/html */}
        <p className="text-base text-gray-700 font-poppins flex-grow mb-4 line-clamp-4">
            {post.excerpt}
        </p>
        <div className="mt-auto text-logo-green font-semibold group-hover:underline">
          Read More &rarr;
        </div>
      </div>
    </Link>
  );
}