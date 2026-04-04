import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { CartItem, Product } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const isInitialMount = useRef(true);
  const skipNextSave = useRef(false);

  // Storage key based on user ID
  const cartKey = `cart_${user?.id || 'guest'}`;

  // Load items when key changes (user login/logout)
  useEffect(() => {
    const saved = localStorage.getItem(cartKey);
    const parsedItems = saved ? JSON.parse(saved) : [];
    
    // When switching user, we set the items and skip the next save
    // to avoid saving the OLD items into the NEW key.
    skipNextSave.current = true;
    setItems(parsedItems);
  }, [cartKey]);

  // Save items when they change
  useEffect(() => {
    // Avoid overwriting on first mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // If skipNextSave is true, it means we just loaded new items for a new key
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, cartKey]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
