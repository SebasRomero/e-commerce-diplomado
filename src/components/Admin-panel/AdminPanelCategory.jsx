import React, { useEffect, useState } from "react";
import { host } from "../../constants";

const AdminPanelCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const fetchCategories = async () => {
    try {
      const responseReq = await fetch(`${host}category`, {
        method: "GET",
      });

      if (!responseReq.ok) {
        throw new Error("Error fetching categories");
      }

      const data = await responseReq.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const responseReq = await fetch(`${host}category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategoryName }), 
      });

      if (!responseReq.ok) {
        throw new Error("Error creating category");
      }

      const createdCategory = await responseReq.json();
      setCategories([...categories, createdCategory]); 
      setNewCategoryName(""); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = (category) => {
    setEditingCategory(category);
    setNewName(category.name);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseReq = await fetch(
        `${host}category/${editingCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        }
      );

      if (!responseReq.ok) {
        throw new Error("Error updating category");
      }

      const updatedCategory = await responseReq.json();
      setCategories(
        categories.map((cat) =>
          cat._id === updatedCategory._id ? updatedCategory : cat
        )
      );
      setEditingCategory(null);
      setNewName("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const responseReq = await fetch(`${host}category/${id}`, {
        method: "DELETE",
      });

      if (!responseReq.ok) {
        throw new Error("Error deleting category");
      }

      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-4">Categories</h1>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <form onSubmit={handleCreateCategory} className="mb-4">
        <h2 className="text-xl text-white mb-2">Create New Category</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
          placeholder="New category name"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition duration-200"
        >
          Create
        </button>
      </form>

      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category._id}
            className="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition duration-200"
          >
            <span className="text-white">{category.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleUpdate(category)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 transition duration-200"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingCategory && (
        <form onSubmit={handleUpdateSubmit} className="mt-4">
          <h2 className="text-xl text-white mb-2">Update Category</h2>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
            placeholder="New name"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition duration-200"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setEditingCategory(null)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminPanelCategory;
