import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h4 className="text-lg font-semibold">Luro</h4>
          <p className="text-sm">Your best ally shop for amazing discounts!</p>
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
