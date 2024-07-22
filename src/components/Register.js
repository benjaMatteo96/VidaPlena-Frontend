import React, { useState } from 'react';
import axiosInstance from '../services/axiosConfig';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    axiosInstance.post('/register/', { username, password })
      .then(response => {
        alert('Registration successful');
      })
      .catch(error => {
        console.error('Error registering:', error);
        alert('Registration failed');
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
