import { useEffect, useState } from "react";
import CheckoutCard from "./CheckoutCard";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [finalPrice, setFinalPrice] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
    calculateFinalPrice()
  }, []);

  function calculateFinalPrice() {
    let finalPrice = 0;
    cart.map((element) => {
      finalPrice += element.quantity * element.price;
    });
    setFinalPrice(finalPrice)
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[95%]">
        <div className="w-full flex  justify-evenly items-center">
          <div className="flex flex-col h-[90vh] items-center justify-center">
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
            <div>
              <span className="text-white text-xl">Your final price is {finalPrice}</span>
            </div>
            <div>
              <button className="w-32 h-12 bg-orange-500">Pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
