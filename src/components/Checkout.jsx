import { useEffect, useState } from "react";
import CheckoutCard from "./CheckoutCard";

const Checkout = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {

    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);


  return (
    <div className="flex justify-center items-center">
      <div className="w-[95%]">
      <div className="w-full flex  justify-evenly items-end">
          <div>

          {cart.map((element) => {
            return (
              <CheckoutCard
              key={element.name}
              name={element.name}
              price={element.price}
              quantity={element.quantity}
              />
            );
          })}
          </div>
          <div>
            <button>Pay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
