import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <div className="text-center mt-5">No user information available.</div>;
  }

  const { email, roles, orders } = user;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">User Profile</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Email:</h2>
        <p className="text-gray-700">{email}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Roles:</h3>
        <ul className="list-disc pl-5">
          {roles.map((role, index) => (
            <li key={index} className="text-gray-700">{role}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Orders:</h3>
        {orders.length > 0 ? (
          <ul className="list-disc pl-5">
            {orders.map((order, index) => (
              <li key={index} className="text-gray-700">Order #{index + 1}: {JSON.stringify(order)}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
