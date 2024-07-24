import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const AdminPanel = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <div className="admin-panel">
      <label htmlFor="admin-select">Administración</label>
      <select id="admin-select" className="form-control" onChange={(e) => {
        window.location.href = e.target.value;
      }}>
        <option value="">Seleccione una opción</option>
        <option value="/products">Products</option>
        <option value="/order-items">Order Items</option>
      </select>
    </div>
  );
};

export default AdminPanel;
