import React, { useEffect, useState } from "react"; 
import CheckoutCard from "./CheckoutCard";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 
import { host } from "../constants";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [accessToken, setAccessToken] = useState(null);
  const [discount, setDiscount] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (!storedCart || storedCart.length === 0) {
      navigate("/product");
    } else {
      setCart(storedCart);
      calculateFinalPrice(storedCart); 
    }
  }, [navigate]);

  useEffect(() => {
    const storedDiscount = localStorage.getItem("discount");
    if (storedDiscount) {
      setDiscount(parseFloat(storedDiscount)); 
    }
  }, []);

 
  useEffect(() => {
    calculateFinalPrice(cart);
  }, [cart, discount]); 

  const calculateDiscountedPrice = (price) => {
    if (discount) {
      return price - (price * (discount / 100)); 
    }
    return price; 
  };

  const calculateFinalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((acc, element) => {
      const discountedPrice = calculateDiscountedPrice(element.price);
      return acc + element.quantity * discountedPrice;
    }, 0);
    setFinalPrice(totalPrice);
  };

  const removeItem = (name) => {
    const updatedCart = cart
      .map((item) => {
        if (item.name === name) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePay = async () => {
    if (cart.length === 0) {
      console.error("El carrito está vacío");
      return;
    }

    const orderNumber = uuidv4();
    const data = {
      orderNumber: orderNumber,
      price: finalPrice,
    };

    console.log("Enviando datos:", JSON.stringify(data));

    try {
      const response = await fetch(`${host}product/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el pedido");
      }

      const result = await response.json();
      console.log("Pedido actualizado:", result);

      alert("Congratulations, you are now one of our customers!");

      localStorage.removeItem("cart");

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[95%]">
        <div className="w-full flex flex-col py-20 justify-evenly items-center">
          <div className="flex flex-col h-[30%] items-center justify-center">
            {cart.map((element) => (
              <CheckoutCard
                key={element.name}
                name={element.name}
                originalPrice={element.price} 
                price={calculateDiscountedPrice(element.price)} 
                discount={discount > 0} 
                quantity={element.quantity}
                image={element.image}
                onRemove={() => removeItem(element.name)}
              />
            ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>
              <span className="text-white text-xl">
                Your final price is {finalPrice.toFixed(2)}
              </span>
            </div>
            <div>
              <button className="w-32 h-12 bg-orange-500" onClick={handlePay}>
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
