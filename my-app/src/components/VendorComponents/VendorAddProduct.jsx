import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddProduct = () => {
  const [product, setProduct] = useState({
    productId: uuidv4(),
    name: '',
    image: '',
    price: '',
    description: '',
    colors: '',
    sizes: '',
    discount: '',
    stock: '',
    vendorEmail: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalProduct = {
      ...product,
      colors: product.colors.split(',').map(c => c.trim()),
      sizes: product.sizes.split(',').map(s => s.trim()),
      price: parseFloat(product.price),
      discount: parseFloat(product.discount),
      stock: parseInt(product.stock)
    };

    try {
      const res = await axios.post('http://localhost:5000/api/products/add', finalProduct);
      setMessage(res.data.message);

      // Clear form & reset productId
      setProduct({
        productId: uuidv4(),
        name: '',
        image: '',
        price: '',
        description: '',
        colors: '',
        sizes: '',
        discount: '',
        stock: '',
        vendorEmail: ''
      });
    } catch (err) {
      console.error(err);
      setMessage('Error adding product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" value={product.name} onChange={handleChange}
          placeholder="Product Name" className="w-full border p-2 rounded" required />
        
        <input name="image" type="text" value={product.image} onChange={handleChange}
          placeholder="Image URL" className="w-full border p-2 rounded" />
        
        <input name="price" type="number" value={product.price} onChange={handleChange}
          placeholder="Price" className="w-full border p-2 rounded" required />

        <textarea name="description" value={product.description} onChange={handleChange}
          placeholder="Description" className="w-full border p-2 rounded" rows={3} />

        <input name="colors" type="text" value={product.colors} onChange={handleChange}
          placeholder="Colors (comma-separated)" className="w-full border p-2 rounded" />
        
        <input name="sizes" type="text" value={product.sizes} onChange={handleChange}
          placeholder="Sizes (comma-separated)" className="w-full border p-2 rounded" />
        
        <input name="discount" type="number" value={product.discount} onChange={handleChange}
          placeholder="Discount (%)" className="w-full border p-2 rounded" />

        <input name="stock" type="number" value={product.stock} onChange={handleChange}
          placeholder="Stock Quantity" className="w-full border p-2 rounded" required />

        <input name="vendorEmail" type="email" value={product.vendorEmail} onChange={handleChange}
          placeholder="Vendor Email" className="w-full border p-2 rounded" required />

        <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
          Add Product
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default AddProduct;
