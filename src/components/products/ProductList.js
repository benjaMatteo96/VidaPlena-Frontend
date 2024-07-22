// src/components/products/ProductList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosConfig';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <Link to="/products/create" className="btn btn-primary mb-4">Create Product</Link>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <div className="card mb-4">
              {product.image && (
                <img src={product.image} className="card-img-top" alt={product.name} />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <p className="card-text"><strong>Stock:</strong> {product.stock}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/products/edit/${product.id}`} className="btn btn-warning btn-sm">Edit</Link>
                  <Link to={`/products/delete/${product.id}`} className="btn btn-danger btn-sm">Delete</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
