import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAdmin as isAdminFunc } from "./functions/functions";
import { useAuth } from "../providers/AuthContext";
import { useCart } from "../providers/cart-context";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const quantity = cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const shoppingCart = JSON.parse(localStorage.getItem("cart"));
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      if (user.roles.includes("admin")) {
        setIsAdmin(true);
      }
    }
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
    setIsAdmin(false);
    logout();
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold text-orange-500">Luro</div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Regular Menu (hidden on mobile) */}
        <div className="hidden md:flex space-x-8 text-white text-lg">
          {/* Admin or User Links */}
          {isAdmin ? (
            <div className="flex space-x-8">
              <NavLink to="/admin-panel/product" className="hover:text-orange-500">Products</NavLink>
              <NavLink to="/admin-panel/category" className="hover:text-orange-500">Categories</NavLink>
              <NavLink to="/admin-panel/order" className="hover:text-orange-500">Orders</NavLink>
            </div>
          ) : (
            <div className="flex space-x-8">
              <NavLink to="/" className="hover:text-orange-500">Home</NavLink>
              <NavLink to="/product" className="hover:text-orange-500">Products</NavLink>
            </div>
          )}

          {/* Authentication Links */}
          {isAuthenticated ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2">
                <span>{user.email}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
                  {!isAdmin && (
                    <a href="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</a>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <a href="/login" className="hover:text-orange-500">Login</a>
              <a href="/signup" className="hover:text-orange-500">Signup</a>
            </div>
          )}

          {!isAdmin && (
            <NavLink to="/checkout" className="hover:text-orange-500">
              Cart ({quantity} items)
            </NavLink>
          )}
        </div>

        {/* Mobile Menu (visible on mobile, hidden on larger screens) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 text-white z-50 p-4">
            <div className="flex flex-col space-y-4">
              {isAdmin ? (
                <>
                  <NavLink to="/admin-panel/product" className="hover:text-orange-500">Products</NavLink>
                  <NavLink to="/admin-panel/category" className="hover:text-orange-500">Categories</NavLink>
                  <NavLink to="/admin-panel/order" className="hover:text-orange-500">Orders</NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/" className="hover:text-orange-500">Home</NavLink>
                  <NavLink to="/product" className="hover:text-orange-500">Products</NavLink>
                </>
              )}
              {isAuthenticated ? (
                isAdmin ? (
                  <>
                    <button onClick={handleLogout} className="hover:text-orange-500">Logout</button>
                  </>

                ): (
                  <>
                    <a href="/profile" className="hover:text-orange-500">Profile</a>
                    <button onClick={handleLogout} className="hover:text-orange-500">Logout</button>
                  </>

                )
              ) : (
                <>
                  <a href="/login" className="hover:text-orange-500">Login</a>
                  <a href="/signup" className="hover:text-orange-500">Signup</a>
                </>
              )}
              {!isAdmin && (
                <NavLink to="/checkout" className="hover:text-orange-500">
                  Cart ({quantity} items)
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
