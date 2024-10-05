import  { useEffect, useState } from "react";
import { host } from "../../constants";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      fetchOrders(token); 
    }
  }, []);

  const fetchOrders = async (token) => {
    try {
      const response = await fetch(`${host}product/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) { 
        if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          throw new Error("Unexpected response format");
        }
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-4">Orders</h1>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <ul className="space-y-2">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <li
              key={order._id}
              className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              <span className="text-white">
                {`Order Number: ${order.orderNumber} - Price: $${order.price}`}
              </span>
            </li>
          ))
        ) : (
          <p className="text-white">No orders available.</p>
        )}
      </ul>
    </div>
  );
};

export default Orders;
