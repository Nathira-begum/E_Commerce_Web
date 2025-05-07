import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shopName: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully");
        navigate("/vendor/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1676739688583-99db8dedd603?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fEUlMjBjb21tZXJjZSUyMGxvZ2lufGVufDB8fDB8fHww')] bg-cover bg-center flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Vendor Register</h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRegister}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 w-full rounded-lg transition duration-300"
        >
          Register
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
