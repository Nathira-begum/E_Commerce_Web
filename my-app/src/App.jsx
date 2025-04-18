import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./pages/Home";
import Shop from "./components/Shop";
import Wishlist from "./components/Wishlist";
import Category from "./components/Category";
import MyAccount from "./pages/MyAccount";
import MyAddress from "./components/MyAddress";
import MyOrder from "./components/MyOrder";
import MyPayment from "./components/MyPayment";
import MyWallet from "./components/MyWallet";
import MyProfile from "./components/MyProfile";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";

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
        <Route path="/myaccount" element={<MyAccount/>} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>




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
