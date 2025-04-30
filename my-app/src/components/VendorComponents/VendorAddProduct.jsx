import React, { useState } from 'react';
import axios from 'axios';

const VendorAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    stock: '',
    sizes: [],
    colors: [],
    tags: [],
    image: '',
    description: '',
    vendorEmail: '',
  });

  const [sizeOptions] = useState(['S', 'M', 'L', 'XL', 'XXL',28,30,32,34,36,38]);  // Example sizes
  const [tagsInput, setTagsInput] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagChange = (e) => {
    if (e.key === 'Enter' && tagsInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagsInput.trim()],
      }));
      setTagsInput('');
    }
  };

  const handleTagRemove = (tag) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((t) => t !== tag),
    }));
  };

  const toggleSize = (size) => {
    setFormData((prevData) => ({
      ...prevData,
      sizes: prevData.sizes.includes(size)
        ? prevData.sizes.filter((s) => s !== size)
        : [...prevData.sizes, size],
    }));
  };

  const toggleColor = (color) => {
    setFormData((prevData) => ({
      ...prevData,
      colors: prevData.colors.includes(color)
        ? prevData.colors.filter((c) => c !== color)
        : [...prevData.colors, color],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/products/add-product',
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg"
          />
          {formData.price && discount > 0 && (
            <div className="text-green-600 mt-2">
              Discounted Price: ₹{(formData.price - (formData.price * discount) / 100).toFixed(2)}
            </div>
          )}
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block font-medium mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-medium mb-1">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 rounded-lg border ${
                  formData.sizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-medium mb-1">Colors</label>
          <input
            type="text"
            placeholder="Enter color name & press Enter"
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              (e.preventDefault(), toggleColor(e.target.value.trim()), (e.target.value = ''))
            }
            className="w-full border px-4 py-2 rounded-lg"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.colors.map((color, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 cursor-pointer"
                onClick={() => toggleColor(color)}
              >
                {color} ✕
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">Tags</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            onKeyDown={handleTagChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 cursor-pointer"
                onClick={() => handleTagRemove(tag)}
              >
                {tag} ✕
              </span>
            ))}
          </div>
        </div>

        {/* Product Image URL */}
        <div>
          <label className="block font-medium mb-1">Product Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          {formData.image && (
            <img src={formData.image} alt="Preview" className="mt-4 h-40 rounded-lg shadow" />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Vendor Email</label>
          <input
            type="text"
            name="vendorEmail"
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default VendorAddProduct;
