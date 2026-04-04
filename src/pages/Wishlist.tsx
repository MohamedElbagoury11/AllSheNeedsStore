import React from 'react';
import { HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';

const Wishlist = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <HeartCrack size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          You haven't saved any items yet. Find something you love and click the heart icon.
        </p>
        <Link to="/products">
          <Button size="lg" className="rounded-full px-8">Discover Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Wishlist</h1>
        <span className="px-4 py-1.5 bg-gray-100 text-gray-900 font-semibold rounded-full text-sm">
          {items.length} Items Saved
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
