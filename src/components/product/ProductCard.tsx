import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useNotification();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast({ title: 'Added to cart', description: `${product.name} has been added to your cart.`, type: 'success' });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast({ title: 'Removed from wishlist' });
    } else {
      addToWishlist(product);
      addToast({ title: 'Added to wishlist', type: 'success' });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/30 backdrop-blur-md shadow-xl border border-white/40 hover:shadow-2xl transition-all h-full"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isFeatured && (
          <span className="rounded-full bg-yellow-400 px-2.5 py-0.5 text-xs font-bold text-gray-900 shadow-sm">
            Featured
          </span>
        )}
        {product.isTrending && (
          <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
            Trending
          </span>
        )}
        {product.onSale && (
          <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm animate-pulse">
            Sale
          </span>
        )}
      </div>

      {/* Image & Quick Actions Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
        <Link to={`/products/${product.id}`}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>

        {/* Hover Actions */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 px-4">
          <button 
            onClick={handleAddToCart}
            className="flex-1 flex max-w-[140px] items-center justify-center gap-2 rounded-full bg-gray-900/90 text-white py-2.5 text-sm font-semibold backdrop-blur hover:bg-gray-900 transition-colors shadow-lg"
          >
            <ShoppingCart size={16} /> <span>Add</span>
          </button>
          
          <button 
            onClick={handleToggleWishlist}
            className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-gray-100/90 text-gray-900 backdrop-blur hover:bg-white hover:text-red-500 transition-colors shadow-lg"
          >
            <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} className={inWishlist ? 'text-red-500' : ''} />
          </button>

          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-gray-100/90 text-gray-900 backdrop-blur hover:bg-white hover:text-blue-600 transition-colors shadow-lg"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 border-t border-white/20">
        <p className="text-xs font-medium text-blue-600 mb-1">{product.category}</p>
        <Link to={`/products/${product.id}`} className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 2} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewsCount})</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-bold text-gray-900">
              {t('product.egp')} {product.onSale ? product.discountPrice?.toFixed(2) : product.price.toFixed(2)}
            </p>
            {product.onSale && (
              <p className="text-xs text-gray-400 line-through">
                {t('product.egp')} {product.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
