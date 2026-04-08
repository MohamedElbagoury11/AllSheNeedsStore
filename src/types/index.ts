export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  nameAr?: string;
  description: string;
  descriptionEn?: string;
  descriptionAr?: string;
  price: number;
  category: string;
  discountPrice?: number;
  onSale?: boolean;
  images: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  specifications?: Record<string, string>;
  createdAt?: string | Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: ShippingAddress;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface NotificationItem {
  id: string;
  type: 'order' | 'promotion' | 'alert';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
