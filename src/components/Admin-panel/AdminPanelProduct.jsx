import { useEffect, useState } from "react";
import { host } from "../../constants";

const AdminPanelProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProductImage, setNewProductImage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${host}product`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error fetching products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const newProductData = {
        name: newProductName,
        price: newProductPrice,
        description: newProductDescription,
        category: selectedCategory,
        image: newProductImage,
      };

      console.log("Creating product with data:", newProductData);

      const response = await fetch(`${host}product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const userFriendlyMessage = errorData.message
          ? `Oops! Something went wrong: ${errorData.message}`
          : "There was a problem creating the product. Please try again.";
        throw new Error(userFriendlyMessage);
      }

      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      resetForm();
    } catch (error) {
      console.error("Error details:", error);
      setError(error.message);
      restoreFields(newProductData);
    }
  };

  const handleUpdate = (product) => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setNewProductPrice(product.price);
    setNewProductDescription(product.description);
    setSelectedCategory(product.category);
    setNewProductImage(product.image);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${host}product${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newProductName,
            price: newProductPrice,
            description: newProductDescription,
            category: selectedCategory,
            image: newProductImage,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const userFriendlyMessage = errorData.message
          ? `Oops! Something went wrong: ${errorData.message}`
          : "There was a problem updating the product. Please try again.";
        throw new Error(userFriendlyMessage);
      }

      const updatedProduct = await response.json();
      setProducts(
        products.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        )
      );
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      console.error("Error details:", error);
      setError(error.message);
      restoreFields({
        name: newProductName,
        price: newProductPrice,
        description: newProductDescription,
        category: selectedCategory,
        image: newProductImage,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${host}product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting product");
      }

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setNewProductName("");
    setNewProductPrice("");
    setNewProductDescription("");
    setSelectedCategory("");
    setNewProductImage("");
  };

  const restoreFields = (data) => {
    setNewProductName(data.name || "");
    setNewProductPrice(data.price || "");
    setNewProductDescription(data.description || "");
    setSelectedCategory(data.category || "");
    setNewProductImage(data.image || "");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-4">Products</h1>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <form
        onSubmit={editingProduct ? handleUpdateSubmit : handleCreateProduct}
        className="mb-4"
      >
        <h2 className="text-xl text-white mb-2">
          {editingProduct ? "Update product" : "Create new product"}
        </h2>
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
          placeholder="Product name"
          required
        />
        <input
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
          placeholder="Product price"
          required
        />
        <input
          type="text"
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
          className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
          placeholder="Product description"
          required
        />
        <input
          type="text"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
          placeholder="Category name"
          required
        />
        <input
          type="text"
          value={newProductImage}
          onChange={(e) => setNewProductImage(e.target.value)}
          className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
          placeholder="Image URL"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition duration-200"
        >
          {editingProduct ? "Update" : "Create"}
        </button>
      </form>

      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product._id}
            className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition duration-200"
          >
            <span className="text-white">
              {product.name} - ${product.price}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleUpdate(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanelProduct;
