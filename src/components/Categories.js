import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/axiosConfig';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance.get('/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}: {category.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
