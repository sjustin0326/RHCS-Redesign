"use client";

import { useState, useMemo } from 'react';
import { ProcessedNewsPost } from '@/utils/newsUtils';
import NewsCard from './NewsCard';
import Pagination from '../components/Pagination';

type SortOrder = 'newest' | 'oldest';

interface NewsListClientProps {
  allPosts: ProcessedNewsPost[];
  years: string[];
}

const ITEMS_PER_PAGE = 6;

export default function NewsListClient({ allPosts, years }: NewsListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedYear, setSelectedYear] = useState('all');
  
  const filteredPosts = useMemo(() => {
    if (selectedYear === 'all') {
      return allPosts;
    }
    return allPosts.filter(post => post.year === selectedYear);
  }, [allPosts, selectedYear]);
  
  const sortedPosts = useMemo(() => {
    const postsCopy = [...filteredPosts];
    if (sortOrder === 'oldest') {
      return postsCopy.reverse();
    }
    return postsCopy;
  }, [filteredPosts, sortOrder]);
  
  const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE);
  
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, sortedPosts]);
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as SortOrder);
    setCurrentPage(1);
  };
  
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };
  
  return (
    <div>
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
        
        {/* Results Count (visible on mobile) */}
        <div className="w-full sm:w-auto">
          <p className="text-sm font-opensans text-gray-600">
            Showing <span className="font-semibold text-darkgreen">{paginatedPosts.length}</span> of{' '}
            <span className="font-semibold text-darkgreen">{sortedPosts.length}</span> articles
          </p>
        </div>
        
        {/* Filter Dropdowns */}
        <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="
              w-full xs:w-auto
              px-4 py-2.5
              text-sm font-opensans
              border-2 border-olive 
              rounded-lg
              bg-white
              text-darkgreen
              focus:ring-2 focus:ring-logo-green focus:border-logo-green
              transition-all duration-200
              cursor-pointer
              hover:border-logo-green
            "
            aria-label="Filter news by year"
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="
              w-full xs:w-auto
              px-4 py-2.5
              text-sm font-opensans
              border-2 border-olive 
              rounded-lg
              bg-white
              text-darkgreen
              focus:ring-2 focus:ring-logo-green focus:border-logo-green
              transition-all duration-200
              cursor-pointer
              hover:border-logo-green
            "
            aria-label="Sort news posts"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      
      {/* Year Divider (cuando se filtra por año) */}
      {selectedYear !== 'all' && (
        <div className="relative mb-10 sm:mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t-2 border-olive"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-6 text-2xl sm:text-3xl font-inter font-bold text-olive">
              {selectedYear}
            </span>
          </div>
        </div>
      )}
      
      {/* News Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {paginatedPosts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-20">
          <p className="text-lg font-poppins text-gray-600 mb-2">
            No news posts found for the selected criteria.
          </p>
          <p className="text-sm font-opensans text-gray-500">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}
      
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}