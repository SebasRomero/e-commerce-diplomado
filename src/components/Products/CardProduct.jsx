import { useNavigate } from "react-router-dom";
import { useCart } from "../../providers/cart-context";

export const CardProduct = (props) => {
  const { addToCart } = useCart(); 
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
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
            onClick={handleAddToCart} 
            className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
