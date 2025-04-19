import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import OAuthCallback from "./components/OAuthCallback";
import Shop from "./components/Shop";
import Wishlist from "./components/Wishlist";
import Category from "./components/Category";
import MyAddress from "./components/MyAddress";
import MyOrder from "./components/MyOrder";
import MyPayment from "./components/MyPayment";
import MyWallet from "./components/MyWallet";
import MyProfile from "./components/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import ThemeToggle from "./components/ThemeToggle";

// Pages
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

// Legal & Facebook Requirement Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DataDeletion from "./pages/DataDeletion"; // <-- newly added

function App() {
  return (
    <Router>
      <div className="App">
        {/* Shared Theme Toggle UI */}
        <ThemeToggle />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:type" element={<Category />} />

          {/* Legal Routes */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/data-deletion" element={<DataDeletion />} /> {/* Required by Facebook */}

          {/* User Account */}
          <Route path="/myaccount" element={<MyAccount />}>
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="myaddress" element={<MyAddress />} />
            <Route path="myorder" element={<MyOrder />} />
            <Route path="mypayment" element={<MyPayment />} />
            <Route path="mywallet" element={<MyWallet />} />
          </Route>

          {/* Admin */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
