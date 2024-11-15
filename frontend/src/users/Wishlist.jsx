import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get('/wishlist');
        setWishlist(response.data);
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div>
      <h1>Wishlist</h1>
      <ul>
        {wishlist.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;
