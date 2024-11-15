import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './users/HomePage';
import Cart from './users/Cart';
import Checkout from './users/Checkout';
import OrderHistory from './users/OrderHistory';
import AdminDashboard from './admin/AdminDashboard';
import SellerDashboard from './seller/SellerDashboard';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

