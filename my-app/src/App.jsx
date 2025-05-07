import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./pages/Home";
import Shop from "./components/Shop";
import Wishlist from "./components/Wishlist";
import Category from "./pages/Category";
import MyAccount from "./pages/MyAccount";
import MyAddress from "./components/MyAddress";
import MyOrder from "./components/MyOrder";
import MyPayment from "./components/MyPayment";
import MyWallet from "./components/MyWallet";
import MyProfile from "./components/MyProfile";
import Vendor from "./pages/Vendor";
import CartPage from "./components/cart";
import VendorLogin from "./components/VendorComponents/VendorLogin";
import VendorRegister from "./components/VendorComponents/VendorRegister";
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import PendingVendors from "./pages/PendingVendors"
import PendingProducts from "./pages/PendingProducts"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/category" element={<Category />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vendors" element={<PendingVendors />} />
        <Route path="/admin/products" element={<PendingProducts />} />




        {/* NESTED ROUTES */}
        <Route path="myprofile" element={<MyProfile />}>
          <Route path="myaddress" element={<MyAddress />} />
          <Route path="myorder" element={<MyOrder />} />
          <Route path="mypayment" element={<MyPayment />} />
          <Route path="mywallet" element={<MyWallet />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
