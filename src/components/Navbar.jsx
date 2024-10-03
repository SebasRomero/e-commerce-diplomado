import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [cart, setCart] = useState([])
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const shoppingCart = localStorage.getItem('cart');
    if (shoppingCart) {
      let count = 0;
      JSON.parse(shoppingCart).map((element) => {
        count = count + element.quantity;
      })
      setCart(JSON.parse(shoppingCart))
      setQuantity(count)
    } else {
      setCart([])
    }
  }, [])
  
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-bold text-orange-500">
          Luro
        </div>
        <div className="flex space-x-8 text-white text-lg">
          <ul><NavLink to="/" className="hover:text-orange-500"> Home </NavLink></ul>
          <ul><NavLink to="/products" className="hover:text-orange-500"> Products </NavLink></ul>
          <ul><NavLink to="/aboutus" className="hover:text-orange-500"> About us </NavLink></ul>
          <ul><NavLink to="/login" className="hover:text-orange-500"> Login </NavLink></ul>
          <ul><NavLink to="/signup" className="hover:text-orange-500"> Signup </NavLink></ul>
          {
            cart.length != 0 ? (<ul><NavLink to="/checkout" className="hover:text-orange-500"> Cart ({quantity} items) </NavLink></ul>) : ("")
          
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
