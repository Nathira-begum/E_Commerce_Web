import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
      {user && (
        <p className="text-md">
          Hello, {JSON.parse(user).name}!<br />
          {JSON.parse(user).provider && (
            <span className="text-sm text-gray-600">Logged in via {JSON.parse(user).provider}</span>
          )}
        </p>
      )}
      <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-full">Logout</button>
    </div>
  );
}
