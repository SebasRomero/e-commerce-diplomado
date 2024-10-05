import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

/* eslint-disable react/prop-types */
export const CardProduct = (props) => {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart() {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.name === props.name
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          { name: props.name, price: props.price, quantity: 1 },
        ];
      }
    });
  }

  const handleClick = () => {
    navigate(`/product/${props.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className=" cursor-pointer w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <img
          className="p-8 rounded-t-lg"
          src={props.image}
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
            onClick={(e) => {
              e.stopPropagation();
              addToCart()}}
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
