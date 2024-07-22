// src/components/order-items/OrderItemList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { Link } from 'react-router-dom';

const OrderItemList = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axiosInstance.get('/order-items/');
        setOrderItems(response.data);
      } catch (error) {
        console.error('Failed to fetch order items', error);
      }
    };

    fetchOrderItems();
  }, []);

  return (
    <div>
      <h1>Order Items</h1>
      <Link to="/order-items/create" className="btn btn-primary mb-2">Create Order Item</Link>
      <ul className="list-group">
        {orderItems.map(orderItem => (
          <li key={orderItem.id} className="list-group-item">
            {orderItem.product.name} - Quantity: {orderItem.quantity} - Price: ${orderItem.price}
            <Link to={`/order-items/edit/${orderItem.id}`} className="btn btn-warning btn-sm ml-2">Edit</Link>
            <Link to={`/order-items/delete/${orderItem.id}`} className="btn btn-danger btn-sm ml-2">Delete</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItemList;
