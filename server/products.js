const express = require('express');
const router = express.Router();
const db = require('./db');




router.get('/', (req, res) => {
  // Retrieve query parameters
  const { category, minPrice, maxPrice, page = 1 } = req.query;
  const pageSize = 24;
  const products = db.products;
  // Apply filters
  let filteredProducts = products.filter(product => {
    return (
      (!category || product.category === category) &&
      (!minPrice || product.price >= parseInt(minPrice)) &&
      (!maxPrice || product.price <= parseInt(maxPrice))
    );
  });

  // Calculate pagination parameters
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Apply pagination
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Response object
  const response = {
    products: paginatedProducts,
    
  };

  res.json(response);
});

module.exports = router;
