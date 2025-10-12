"use client";

import { useState } from 'react';
import { ProcessedNewsPost } from '@/utils/newsUtils';
import NewsCard from './NewsCard';

type SortOrder = 'newest' | 'oldest';

interface NewsListClientProps {
  postsByYear: Record<string, ProcessedNewsPost[]>;
  years: string[];
}

export default function NewsListClient({ postsByYear, years }: NewsListClientProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const sortedYears = sortOrder === 'newest' ? years : [...years].reverse();

  return (
    <div>
      <div className="flex justify-end mb-8">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="border-olive focus:ring-olive focus:border-olive rounded-md"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
      </div>

      {sortedYears.map((year) => (
        <section key={year} className="mb-12">
          {/* Year Banner */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-olive"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-2xl font-semibold text-olive">
                {year}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsByYear[year].map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}