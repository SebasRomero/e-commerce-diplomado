import { useEffect, useState } from "react"; 
import CheckoutCard from "./CheckoutCard";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0); 
  console.log(cart)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(storedCart);
    calculateFinalPrice(storedCart); 
  }, []);

  function calculateFinalPrice(cartItems) {
    
    const totalPrice = cartItems.reduce((acc, element) => {
      return acc + element.quantity * element.price;
    }, 0);
    
    setFinalPrice(totalPrice);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-[95%]">
        <div className="w-full flex flex-col justify-evenly items-center">
          <div className="flex flex-col pt-[10%] items-center justify-center">
            {cart.map((element) => {
              return (
                <CheckoutCard
                  key={element.name}
                  name={element.name}
                  price={element.price}
                  quantity={element.quantity}
                  image={element.image}
                />
              );
            })}
          </div>
          <div>
            <div>
              <span className="text-white text-xl my-10">Your final price is {finalPrice}</span>
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
