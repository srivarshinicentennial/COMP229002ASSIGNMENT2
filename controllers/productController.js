const Product = require("../models/Product");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product Added successfully',product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: 'Product Updated successfully',product })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product
exports.deleteProductByID = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: 'Product deleted successfully',product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
exports.deleteAllProducts = async (req, res) => {
  try {
    // Delete all products from the database
    const deleted = await Product.deleteMany();

    res.json({ message: 'All products deleted successfully' });
  } catch (error) {
    console.error('Error deleting all products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to find products by keyword in name
exports.findProductsByKeyword = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    // Construct a regular expression to perform a case-insensitive search for the keyword in the product names
    const regex = new RegExp(keyword, 'i');

    // Find products where the name field matches the regular expression
    const products = await Product.find({ name: { $regex: regex } });

    res.json(products);
  } catch (error) {
    console.error('Error finding products by keyword:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};