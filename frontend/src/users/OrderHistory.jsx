import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch order history', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>Order ID: {order._id} - Total: ${order.total}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
