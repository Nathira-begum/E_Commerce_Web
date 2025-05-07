import React from "react";

const Loader = () => {
  return (
    <div className="w-full col-span-full text-center py-10">
      <span className="loader inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
      <p className="mt-2 text-sm text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;
