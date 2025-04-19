import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getGoogleToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        console.error("No code found in URL");
        return;
      }

      try {
        // 🌐 Adjust the backend URL to your actual endpoint
        const response = await axios.post("http://localhost:5000/auth/google", {
          code,
        });

        const { token, user } = response.data;

        // 🛡️ Save token securely
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Check if the user is authenticated and navigate to a protected page
        if (token) {
          navigate("/myaccount");  // Direct to myaccount after successful login
        } else {
          // If there's no token, redirect back to login or handle failure
          navigate("/login");
        }
      } catch (error) {
        console.error("Google OAuth failed:", error);
        navigate("/login");  // Redirect to login page in case of error
      }
    };

    getGoogleToken();
  }, [navigate]);

  return <p>Signing in with Google...</p>;
};

export default OAuthCallback;
