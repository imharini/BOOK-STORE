import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order Management</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id} - Customer: {order.customerName} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
