import React from 'react';
import { Route, Routes } from 'react-router-dom';

// User components
import HomePage from './user/HomePage';
import BookDetails from './user/BookDetails';
import Cart from './user/Cart';
import Checkout from './user/Checkout';
import OrderHistory from './user/OrderHistory';
import Wishlist from './user/Wishlist';

// Admin components
import AdminDashboard from './admin/AdminDashboard';
import UsersList from './admin/UsersList';
import AddBook from './admin/AddBook';

// Seller components
import SellerDashboard from './seller/SellerDashboard';
import OrderManagement from './seller/OrderManagement';
import AddBookSeller from './seller/AddBook';
import EditBook from './seller/EditBook';

// Common components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <div className="main-content">
        <Routes>
          {/* Routes for Users */}
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Routes for Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/add-book" element={<AddBook />} />

          {/* Routes for Sellers */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/orders" element={<OrderManagement />} />
          <Route path="/seller/add-book" element={<AddBookSeller />} />
          <Route path="/seller/edit-book/:id" element={<EditBook />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
