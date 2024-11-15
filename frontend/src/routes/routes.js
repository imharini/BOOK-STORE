import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../users/HomePage';
import BookDetails from '../users/BookDetails';
import Cart from '../users/Cart';
import Checkout from '../users/Checkout';
import OrderHistory from '../users/OrderHistory';
import Wishlist from '../users/Wishlist';
import AdminDashboard from '../admin/AdminDashboard';
import SellerDashboard from '../seller/SellerDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        
        <Route path="/admin/*" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/seller/*" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
