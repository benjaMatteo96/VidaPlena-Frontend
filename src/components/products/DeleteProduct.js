// src/components/products/DeleteProduct.js
import React, { useEffect } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteProduct = async () => {
      try {
        await axiosInstance.delete(`/products/${id}/`);
        navigate('/products');
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    };

    deleteProduct();
  }, [id, navigate]);

  return (
    <div>
      <h2>Deleting Product...</h2>
    </div>
  );
};

export default DeleteProduct;
