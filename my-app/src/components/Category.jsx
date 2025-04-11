// For plain JS (.jsx file)
import React from 'react';

const CategoryPage = () => {
  const categories = ['Electronics', 'Fashion', 'Home Appliances', 'Books', 'Toys'];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Categories</h1>
      <ul className="list-disc pl-6 space-y-2">
        {categories.map((category, index) => (
          <li key={index} className="text-gray-700 hover:text-blue-600 cursor-pointer">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
