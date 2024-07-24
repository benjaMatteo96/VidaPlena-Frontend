// src/components/Login.js
import React, { useState, useContext } from 'react';
import axiosInstance from '../services/axiosConfig';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/token/', { username, password });
      login(response.data.access, response.data.refresh);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">Login</button>
    </form>
  );
};

export default Login;
