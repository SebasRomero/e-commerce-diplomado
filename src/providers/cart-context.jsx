// providers/cart-context.js
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

const addToCart = (product) => {
  setCart((prevCart) => {
    const existingProductIndex = prevCart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
      const updatedCart = [...prevCart];
      updatedCart[existingProductIndex].quantity += 1; // Increment the quantity for existing product
      return updatedCart;
    } else {
      return [
        ...prevCart,
        { ...product, quantity: 1 }, // Add new product with quantity 1
      ];
    }
  });
};

  const removeFromCart = (name) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map(item => {
          if (item.name === name) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return null;
          }
          return item;
        })
        .filter(item => item !== null);
      
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart , removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
