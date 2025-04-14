import React, { useEffect, useState } from 'react';

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: '',
    name: '',
    imageUrl: '',
    price: '',
    details: '',
    dealer : '',
    dealerPhone : '',
    dealerAddress : '', 
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  // Fetch products
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [products]);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdating) {
      await fetch(`http://localhost:5000/api/update-product/${updateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setIsUpdating(false);
      setUpdateId(null);
    } else {
      await fetch('http://localhost:5000/api/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    setForm({ productId: '', name: '', imageUrl: '', price: '', details: '' , dealer : '', dealerPhone : '', dealerAddress : ''});
  };

  // Delete product
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/delete-product/${id}`, {
      method: 'DELETE',
    });
  };

  // Load product into form for update
  const handleEdit = (product) => {
    setForm(product);
    setIsUpdating(true);
    setUpdateId(product.productId);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{isUpdating ? 'Update Product' : 'Add Product'}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="productId" placeholder="Product ID" value={form.productId} onChange={handleChange} className="p-2 border rounded" required />
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="p-2 border rounded" required />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="p-2 border rounded" required />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="p-2 border rounded" required />
        <textarea name="details" placeholder="Product Details" value={form.details} onChange={handleChange} className="p-2 border rounded md:col-span-2" required />
        <input name="dealer" placeholder="Dealer Name" value={form.dealer} onChange={handleChange} className="p-2 border rounded" required />
        <input name="dealerPhone" placeholder="Dealer Mobile Number" value={form.dealerPhone} onChange={handleChange} className="p-2 border rounded" required />
        <textarea name="dealerAddress" placeholder="Dealer Address" value={form.dealerAddress} onChange={handleChange} className="p-2 border rounded md:col-span-2" required />
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-1">
          {isUpdating ? 'Update' : 'Add'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">All Products</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Product ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Details</th>
              <th className="border px-4 py-2">Dealer Name</th>
              <th className="border px-4 py-2">Dealer Phone</th>
              <th className="border px-4 py-2">Dealer Address</th>
              <th className="border px-4 py-2">Actions</th>

            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="border px-4 py-2">{item.productId}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">${item.price}</td>
                <td className="border px-4 py-2">{item.details}</td>
                <td className="border px-4 py-2">{item.dealer}</td>
                <td className="border px-4 py-2">{item.dealerPhone}</td>
                <td className="border px-4 py-2">{item.dealerAddress}</td>

                <td className="border px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(item.productId)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddProduct;
