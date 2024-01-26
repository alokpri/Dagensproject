import React, { useState } from 'react';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ensure that 'e' is defined by using an arrow function
    const formData = { name, category, price };

    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Product created successfully!');
        setName('');
        setCategory('');
        setPrice('');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}> {/* Bind handleSubmit using an arrow function */}
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="category">Category:</label>
      <textarea id="category" value={category} onChange={(e) => setCategory(e.target.value)} />

      <label htmlFor="price">Price:</label>
      <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;