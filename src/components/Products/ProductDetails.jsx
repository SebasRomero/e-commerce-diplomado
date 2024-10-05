import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { host } from "../../constants";

const ProductDetails = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, []);
    const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  async function fetchProductDetails() {
    const responseReq = await fetch(`${host}product/${name}`);
    const productData = await responseReq.json();
    setProduct(productData);
  }

    function addToCart() {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.name === product.name
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          { name: product.name, price: product.price, quantity: 1 },
        ];
      }
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {product ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
          
          <img
            className="w-full h-64 object-cover mb-4"
            src={product.image} // Asegúrate de que el campo sea correcto
            alt={product.name}
          />
          
          {/* Nombre del producto */}
          <h1 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h1>
          
          {/* Descripción */}
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Precio */}
          <div className="text-xl font-semibold text-gray-700 mb-4">
            ${product.price}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
