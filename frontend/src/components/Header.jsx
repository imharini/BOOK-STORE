import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
          <li><Link to="/order-history">Order History</Link></li>
          <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
          <li><Link to="/seller/dashboard">Seller Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
