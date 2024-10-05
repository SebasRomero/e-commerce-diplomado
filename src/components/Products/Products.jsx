import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import { host } from "../../constants";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    getProducts();
    getCategories(); 
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategories, products]);

  async function getProducts() {
    const responseReq = await fetch(`${host}product`, {
      method: "GET",
    });
    const response = await responseReq.json();
    console.log(response);
    setProducts(response);
  }

  async function getCategories() {
    // You can fetch categories from your backend if you have an endpoint for it
    const responseReq = await fetch(`${host}category`, {
      method: "GET",
    });
    const response = await responseReq.json();
    console.log(response);
    const categories = [];
    response.map((element) => {
      categories.push(element.name);
    });
    setCategories(categories); 
  }

  function filterProducts() {
    let filtered = products;

  
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

  
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  }

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center pt-6">
        <div className="flex w-[95%]">
          {/* Filters */}
          <div className="w-[15%] mb-[35px] mr-[20px] bg-gray-300 p-4">
            <div>
              <h3 className="font-bold mb-2">Search by name</h3>
              <input
                type="text"
                className="w-full p-2 mb-4"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <h3 className="font-bold mb-2">Categories</h3>
              {categories.map((category) => (
                <div key={category} className="mb-2">
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="ml-2">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((element) => {
              return (
                <CardProduct
                  key={element._id}
                  id={element._id}
                  name={element.name}
                  price={element.price}
                  image={element.image}
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
