import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance.get('/orders/')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id}: {order.status} - Created at: {order.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
