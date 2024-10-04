import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const shoppingCart = localStorage.getItem("cart");
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
    if (shoppingCart) {
      let count = 0;
      JSON.parse(shoppingCart).map((element) => {
        count = count + element.quantity;
      });
      setCart(JSON.parse(shoppingCart));
      setQuantity(count);
    } else {
      setCart([]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
    window.location.reload(); // Optionally reload the page on logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold text-orange-500">Luro</div>
        <div className="flex space-x-8 text-white text-lg">
          <ul>
            <NavLink to="/" className="hover:text-orange-500">
              Home
            </NavLink>
          </ul>
          <ul>
            <NavLink to="/product" className="hover:text-orange-500">
              Products
            </NavLink>
          </ul>
      {isAuthenticated ? (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2"
          >
            <span>User</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-200">
                <i className=""></i> Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                <i className=""></i> Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <a href="/login" className="px-4">Login</a>
          <a href="/signup" className="px-4">Signup</a>
        </div>
      )}
          {cart.length != 0 ? (
            <ul>
              <NavLink to="/checkout" className="hover:text-orange-500">
                Cart ({quantity} items)
              </NavLink>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
