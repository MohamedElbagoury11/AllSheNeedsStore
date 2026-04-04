import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

// For a real app, you would use React Query here similarly to Products.tsx
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="py-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
        <Search size={40} />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {query ? `No results found for "${query}"` : 'Enter a search term'}
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        We couldn't find anything matching your search. Please try checking your spelling or use more general terms.
      </p>
      <Link to="/products">
        <Button size="lg" className="rounded-full px-8">Browse All Products</Button>
      </Link>
    </div>
  );
};

export default SearchResults;
