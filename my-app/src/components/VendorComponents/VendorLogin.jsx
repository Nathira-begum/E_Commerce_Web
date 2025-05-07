import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.vendor.status !== "approved") {
          alert("Your account is pending admin approval.");
          return;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.vendor.email);
        navigate("/vendor");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1677487978412-1e27f45f3e0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fEUlMjBjb21tZXJjZSUyMGxvZ2lufGVufDB8MHwwfHx8MA%3D%3D')] bg-cover bg-center flex items-center justify-center px-4">
      <div className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Vendor Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 w-full rounded-lg transition duration-300"
        >
          Login
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/vendor/register" className="text-blue-600 hover:underline font-medium">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
