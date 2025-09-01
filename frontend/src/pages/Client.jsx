import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Client = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/clients`);
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleAddClient = () => {
    navigate('/add-clients');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Clients</h1>
          <p className="text-gray-600">Manage client information and relationships.</p>
        </div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          onClick={handleAddClient}
        >
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/clients/${client._id}`)}>
                  <td className="px-6 py-4 text-sm text-gray-900">{client.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{client.contact}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Client;