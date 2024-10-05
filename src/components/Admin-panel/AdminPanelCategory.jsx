import React, { useEffect, useState } from "react";

const AdminPanelCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState(""); // Nuevo estado para el nombre de la nueva categoría

  const fetchCategories = async () => {
    try {
      const responseReq = await fetch("http://localhost:3000/category/", {
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
      const responseReq = await fetch("http://localhost:3000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategoryName }), // Enviamos el nombre de la nueva categoría
      });

      if (!responseReq.ok) {
        throw new Error("Error creating category");
      }

      const createdCategory = await responseReq.json();
      setCategories([...categories, createdCategory]); // Añadimos la nueva categoría a la lista
      setNewCategoryName(""); // Limpiamos el campo de entrada
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
        `http://localhost:3000/category/${editingCategory._id}`,
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
      const responseReq = await fetch(`http://localhost:3000/category/${id}`, {
        method: "DELETE",
      });

      if (!responseReq.ok) {
        throw new Error("Error eliminando categoría");
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
      <h1 className="text-2xl font-bold text-white mb-4">Categorías</h1>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <form onSubmit={handleCreateCategory} className="mb-4">
        <h2 className="text-xl text-white mb-2">Crear nueva categoría</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
          placeholder="Nombre de la nueva categoría"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition duration-200"
        >
          Crear
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
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingCategory && (
        <form onSubmit={handleUpdateSubmit} className="mt-4">
          <h2 className="text-xl text-white mb-2">Actualizar Categoría</h2>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="p-2 rounded bg-gray-600 text-white mb-2 w-full"
            placeholder="Nuevo nombre"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition duration-200"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={() => setEditingCategory(null)}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminPanelCategory;
