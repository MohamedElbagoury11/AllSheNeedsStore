import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';

// Public Pages
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';


// Protected Pages
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import AdminDashboard from '../pages/AdminDashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Wishlist from '../pages/Wishlist';
import SearchResults from '../pages/SearchResults';
import Notifications from '../pages/Notifications';
import Profile from '../pages/Profile';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Protected Routes directly inside MainLayout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;