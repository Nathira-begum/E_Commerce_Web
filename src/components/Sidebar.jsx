import React from 'react';

const Sidebar = ({ setActiveTab, activeTab }) => {
  return (
    <div className="fixed h-screen w-56 bg-gray-900 text-white px-6 py-8">
      <h2 className="text-xl font-bold text-cyan-400 mb-8">Admin Dashboard</h2>
      <div class="flex flex-col h-screen justify-between">
        <nav className="space-y-4">
        <button
          onClick={() => setActiveTab('addProduct')}
          className={`block text-left w-full ${
            activeTab === 'addProduct' ? 'text-cyan-400 font-semibold' : 'hover:text-cyan-300'
          }`}
        >
          Add Product
        </button>

        <button
          onClick={() => setActiveTab('flashSale')}
          className={`block text-left w-full ${
            activeTab === 'flashSale' ? 'text-cyan-400 font-semibold' : 'hover:text-cyan-300'
          }`}
        >
          Flash Sale
        </button>
      </nav>
      <button onClick={() => { localStorage.removeItem('adminAuth'); window.location.href = '/admin-login'; }} className="bg-red-500 text-white px-4 py-2 rounded" > Logout </button>


    <button onClick={() => { localStorage.removeItem('adminAuth'); window.location.href = '/admin-login'; }} className="bg-red-500 text-white px-4 py-2 rounded" > Logout </button>

      </div>
            
    </div>
  );
};

export default Sidebar;
