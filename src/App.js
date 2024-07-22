// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/products/ProductList';
import CreateProduct from './components/products/CreateProduct';
import EditProduct from './components/products/EditProduct';
import DeleteProduct from './components/products/DeleteProduct';
import OrderItemList from './components/order-items/OrderItemList';
import CreateOrderItem from './components/order-items/CreateOrderItem';
import EditOrderItem from './components/order-items/EditOrderItem';
import DeleteOrderItem from './components/order-items/DeleteOrderItem';
import Register from './components/Register';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { AuthProvider } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">My E-commerce</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </nav>
          <AdminPanel />
          <div className="mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/create" element={<CreateProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/products/delete/:id" element={<DeleteProduct />} />
              <Route path="/order-items" element={<OrderItemList />} />
              <Route path="/order-items/create" element={<CreateOrderItem />} />
              <Route path="/order-items/edit/:id" element={<EditOrderItem />} />
              <Route path="/order-items/delete/:id" element={<DeleteOrderItem />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
