import { useNavigate } from "react-router-dom";
import { useCart } from "../../providers/cart-context"; // Import the cart context

export const CardProduct = (props) => {
  const { addToCart } = useCart(); // Get addToCart from context
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stops the event from bubbling up
    addToCart({ name: props.name, price: props.price, image: props.image });
  };

  const handleClick = () => {
    navigate(`/product/${props.name}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer w-full max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
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
            onClick={handleAddToCart} // Ensure this line calls handleAddToCart
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
