const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/nearest/:productId', (req, res) => {
    const productId = req.params.productId;
    
    const N = 6; // Number of nearest products you want to retrieve

    // Find the product with the provided ID
    const products = db.products;

    console.log('Searching for product ID:', productId);
    const product = products.filter(item => item.id.trim().toLowerCase() === productId.trim().toLowerCase());


    console.log(product);
    if (!product && product.length) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const { category, price } = product;

    // Filter products in the same category and not the same product ID
    const similarProducts = products.filter(item => item.category === category && item.id.trim().toLowerCase() !== productId.trim().toLowerCase());

    // Sort the similar products based on the absolute price difference
    similarProducts.sort((a, b) => Math.abs(a.price - price) - Math.abs(b.price - price));

    // Return the top N products with the nearest prices
    const nearestProducts = similarProducts.slice(0, N);

    res.json(nearestProducts);
});

module.exports = router;

