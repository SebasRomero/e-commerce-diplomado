import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react"; 

const Footer = () => {
  const [discount, setDiscount] = useState(""); 

  const handleDiscountChange = (event) => {
    const selectedDiscount = event.target.value;
    setDiscount(selectedDiscount);
    localStorage.setItem("discount", selectedDiscount); 
  };


  useEffect(() => {
    const storedDiscount = localStorage.getItem("discount");
    if (storedDiscount) {
      setDiscount(storedDiscount); 
    }
  }, []);

  return (
    <footer className="bg-[#0a0a0a] text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h4 className="text-lg font-semibold">Luro</h4>
          <p className="text-sm">Your best ally shop for amazing discounts!</p>
          
          {/* Sección de descuentos seleccionables */}
          <div className="mt-2">
            <h5 className="text-md font-semibold">Descuentos</h5>
            <select
              value={discount} // Usa el estado para establecer el valor del select
              onChange={handleDiscountChange}
              className="bg-gray-700 text-white px-3 py-1 rounded"
            >
              <option value="">Select a discount</option>
              <option value="20%">20%</option>
              <option value="50%">50%</option>
              <option value="75%">75%</option>
            </select>
          </div>
        </div>
        <div className="mb-4 md:mb-0">
          <h5 className="text-md font-semibold">Quick Links</h5>
          <ul className="list-none">
            <li>
              <NavLink to={"/"} className="text-gray-400 hover:text-orange-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/product"}
                className="text-gray-400 hover:text-orange-500"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/product"}
                className="text-gray-400 hover:text-orange-500"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="mb-4 md:mb-0">
          <h5 className="text-md font-semibold">Follow Us</h5>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-orange-500">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Luro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
