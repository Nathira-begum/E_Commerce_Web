import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    image: '',
    price: '',
    discount: '',
    stock: '',
    size: '',
    color: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product);
      alert('Product updated successfully');
      navigate('/products');
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-black shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-700">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-white">

        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />

<input
          type="text"
          name="details"
          value={product.description}
          onChange={handleChange}
          placeholder="details"
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="discount"
          value={product.discount}
          onChange={handleChange}
          placeholder="Discount %"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="size"
          value={product.size}
          onChange={handleChange}
          placeholder="Size (e.g. S, M, L)"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="color"
          value={product.color}
          onChange={handleChange}
          placeholder="Color"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
