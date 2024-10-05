import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About_us from "./components/About_us";
import Products from "./components/Products/Products";
import { CartProvider } from "./providers/cart-context";
import Checkout from "./components/Checkout";
import ProductDetails from "./components/Products/ProductDetails";
import AdminPanel from "./components/Admin-panel/Admin-panel";
import AdminPanelProduct from "./components/Admin-panel/AdminPanelProduct";
import AdminPanelCategory from "./components/Admin-panel/AdminPanelCategory";
import Orders from "./components/Admin-panel/Orders";
import {PrivateRoutes} from "./providers/PrivateRoutes";
import { AdminRoutes } from "./providers/PrivateRoutes";
import { AuthProvider } from "./providers/AuthContext";
import Profile from "./components/profile/Profile";
import Footer from "./components/Home/Footer";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            {/* Navbar is at the top */}
            <Navbar />
            
            {/* The main content area should grow to fill space between Navbar and Footer */}
            <div className="flex-grow">
              <Routes>
                {/* Non-admin routes */}
                <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/product" element={<Products />} />
                  <Route path="/product/:name" element={<ProductDetails />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/about" element={<About_us />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Admin routes */}
                <Route element={<AdminRoutes />}>
                  <Route path="/admin-panel" element={<AdminPanel />} />
                  <Route path="/admin-panel/product" element={<AdminPanelProduct />} />
                  <Route path="/admin-panel/category" element={<AdminPanelCategory />} />
                  <Route path="/admin-panel/order" element={<Orders />} />
                </Route>

                {/* Unauthenticated routes */}
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>

            {/* Footer is at the bottom */}
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

