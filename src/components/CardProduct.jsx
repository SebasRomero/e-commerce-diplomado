import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export const CardProduct = (props) => {
  const [cart, setCart] = useState(() => {
    // Retrieve cart from local storage, or set an empty array if none exists
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Store updated cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart() {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingProductIndex = prevCart.findIndex(item => item.name === props.name);

      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // If the product is not in the cart, add it with quantity 1
        return [...prevCart, { name: props.name, price: props.price, quantity: 1 }];
      }
    });
  }

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          src="/docs/images/products/apple-watch.png"
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.name}
          </h5>
        </a>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${props.price}
          </span>
          <button
            onClick={() => addToCart()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
