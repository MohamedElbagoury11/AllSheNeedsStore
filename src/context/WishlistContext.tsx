import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import api from '../api/axios';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const [items, setItems] = useState<Product[]>([]);

  // Sync from backend when user/token changes
  useEffect(() => {
    if (!token || !user) {
      setItems([]);
      return;
    }

    api.get('/wishlists')
      .then(res => {
        const products = res.data.data ? res.data.data : res.data;
        if (Array.isArray(products)) setItems(products);
      })
      .catch(err => {
        console.error('Failed to fetch wishlist', err);
        setItems([]);
      });
  }, [token, user]);

  const addToWishlist = (product: Product) => {
    setItems((prev) => {
      if (!prev.find((p) => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
    // Fire-and-forget sync
    api.post('/wishlists', { productId: product.id }).catch(console.error);
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
    api.delete(`/wishlists/${productId}`).catch(console.error);
  };

  const isInWishlist = (productId: string) => {
    return items.some((p) => p.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
