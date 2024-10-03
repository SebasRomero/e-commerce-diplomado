import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const responseReq = await fetch("https://backend-diplom.fly.dev/product", {
      method: "GET",
    });

    const response = await responseReq.json();
    console.log(response);
    setProducts(response);
  }

  return (
    <>
      <div className="flex justify-center items-center pt-6">
        <div className="flex w-[95%]">
          <div className="w-[15%] mb-[35px] mr-[20px] bg-gray-300">Filtros</div>
          <div className="w-[85%] grid grid-cols-4">
            {products.map((element) => {
              return (
                <CardProduct
                  key={element.name}
                  name={element.name}
                  price={element.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
