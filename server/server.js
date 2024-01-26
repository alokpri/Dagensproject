const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');
const productsRouter = require('./products');
const nearestproduct = require('./nearestproduct');


const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Route to handle product creation
app.post('/api/products', (req, res) => {
  const { name, category, price } = req.body;


  const newProduct = { id: Math.floor(Math.random() * 10000), name, category, price };
  const result = db.addProduct(newProduct);
  console.log("Result of adding product:", result);

  res.status(201).json({ message: 'Product created successfully', product: newProduct });
});
app.use('/api/getproducts', productsRouter);
app.use('/api', nearestproduct);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
