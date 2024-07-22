// src/components/order-items/EditOrderItem.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const EditOrderItem = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderItem = async () => {
      try {
        const response = await axiosInstance.get(`/order-items/${id}/`);
        const { order, product, quantity, price } = response.data;
        setOrder(order);
        setProduct(product);
        setQuantity(quantity);
        setPrice(price);
      } catch (error) {
        console.error('Failed to fetch order item', error);
      }
    };

    const fetchOrdersAndProducts = async () => {
      try {
        const ordersResponse = await axiosInstance.get('/orders/');
        const productsResponse = await axiosInstance.get('/products/');
        setOrders(ordersResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Failed to fetch orders or products', error);
      }
    };

    fetchOrderItem();
    fetchOrdersAndProducts();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.put(`/order-items/${id}/`, { order, product, quantity, price });
      navigate('/order-items');
    } catch (error) {
      console.error('Failed to update order item', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Order:</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)} className="form-control">
          <option value="">Select Order</option>
          {orders.map(order => (
            <option key={order.id} value={order.id}>{order.id}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Product:</label>
        <select value={product} onChange={(e) => setProduct(e.target.value)} className="form-control">
          <option value="">Select Product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="form-control"
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">Update Order Item</button>
    </form>
  );
};

export default EditOrderItem;
