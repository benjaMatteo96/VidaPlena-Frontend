// src/components/order-items/DeleteOrderItem.js
import React, { useEffect } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteOrderItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteOrderItem = async () => {
      try {
        await axiosInstance.delete(`/order-items/${id}/`);
        navigate('/order-items');
      } catch (error) {
        console.error('Failed to delete order item', error);
      }
    };

    deleteOrderItem();
  }, [id, navigate]);

  return (
    <div>
      <h2>Deleting Order Item...</h2>
    </div>
  );
};

export default DeleteOrderItem;
