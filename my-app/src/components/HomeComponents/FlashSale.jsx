import { useState, useEffect } from 'react';
import axios from 'axios';

const FlashSale = () => {
  const [productId, setProductId] = useState('');
  const [flashItems, setFlashItems] = useState([]);

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/api/flash-sale', { productId });
      alert('Added to flash sale!');
      fetchFlashSales();
      setProductId('');
    } catch (err) {
      alert('Error adding flash sale');
    }
  };

  const fetchFlashSales = async () => {
    const res = await axios.get('http://localhost:5000/api/flashsale/flashsales');
    setFlashItems(res.data);
  };

  useEffect(() => {
    fetchFlashSales();
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/flash-sale')
      .then((res) => res.json())
      .then((data) => setFlashItems(data))
      .catch((err) => console.error('Error fetching flash sale items:', err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Flash Sale</h2>
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />
        <button
          onClick={handleAdd}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
        >
          Add to Flash Sale
        </button>
      </div>
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Flash Sale Products</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Product ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Details</th>
              <th className="border px-4 py-2">Actions</th>

            </tr>
          </thead>
          <tbody>
            {flashItems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded" />
                </td>
                <td className="border px-4 py-2">{item.productId}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">${item.price}</td>
                <td className="border px-4 py-2">{item.details}</td>
                <td className="border px-4 py-2"><button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default FlashSale;
