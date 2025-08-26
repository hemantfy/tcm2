import React from "react";

const ManageProfile = () => {
  const user = {
    name: "Jacob Taylor",
    role: "Marketing Manager",
    email: "jacob.taylor@example.com",
    phone: "(123) 456-7890",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const handleEdit = (field) => {
    alert(`Edit ${field} clicked`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
    <h2 className="mb-6 text-2xl font-semibold text-gray-700">Manage Profile</h2>
    <div className="rounded-lg bg-white shadow-md overflow-hidden">
      <div className="flex flex-col items-center p-6">
        <img
          src={user.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">{user.name}</h3>
        <p className="text-gray-500">{user.role}</p>
      </div>
      <div className="divide-y">
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Change Email</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={() => handleEdit("email")}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            Edit
          </button>
          </div>

          <div> className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Change Phone Number</p>
              <p className="text-sm text-gray-500">{user.phone}</p>
            </div>
            <button
              onClick={() => handleEdit("phone")}
              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <p className="text-sm font-medium text-gray-900">Change Password</p>
            <button
              onClick={() => handleEdit("password")}
              className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;