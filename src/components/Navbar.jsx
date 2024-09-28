import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold text-orange-500">
          E-commerce
        </div>
        <div className="flex space-x-8 text-white text-lg">
          <ul><NavLink to="/home" className="hover:text-orange-500"> Home </NavLink></ul>
          <ul><NavLink to="/products" className="hover:text-orange-500"> Products </NavLink></ul>
          <ul><NavLink to="/aboutus" className="hover:text-orange-500"> About us </NavLink></ul>
          <ul><NavLink to="/login" className="hover:text-orange-500"> Login </NavLink></ul>
          <ul><NavLink to="/signup" className="hover:text-orange-500"> Signup </NavLink></ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
