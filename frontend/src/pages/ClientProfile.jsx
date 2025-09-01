import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    fetchClient();
  }, [id]);

  const fetchClient = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/clients/${id}`);
      setClient(response.data);
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };

  const [documents, setDocuments] = useState([
    { id: 1, title: 'Contract Agreement', fileName: 'contract.pdf', uploadDate: '2024-01-15' },
    { id: 2, title: 'Project Proposal', fileName: 'proposal.docx', uploadDate: '2024-01-10' }
  ]);

  const [newDoc, setNewDoc] = useState({ title: '', file: null });

  const handleDocUpload = (e) => {
    e.preventDefault();
    if (!newDoc.title || !newDoc.file) return;
    
    const doc = {
      id: Date.now(),
      title: newDoc.title,
      fileName: newDoc.file.name,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    setDocuments([...documents, doc]);
    setNewDoc({ title: '', file: null });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/clients')}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Clients
        </button>
        <h1 className="text-3xl font-semibold text-gray-900">Client Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Information</h2>
            {client ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{client.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact</label>
                  <p className="text-gray-900">{client.contact || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{client.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-gray-900">{client.address || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Notes</label>
                  <p className="text-gray-900">{client.notes || 'N/A'}</p>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Documents</h2>
            
            <form onSubmit={handleDocUpload} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Upload New Document</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Document title"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({...newDoc, title: e.target.value})}
                />
                <input
                  type="file"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setNewDoc({...newDoc, file: e.target.files[0]})}
                />
              </div>
              <button
                type="submit"
                className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Upload Document
              </button>
            </form>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-500">{doc.fileName} • Uploaded {doc.uploadDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                      View
                    </button>
                    <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                      Download
                    </button>
                  </div>
                </div>
              ))}
              {documents.length === 0 && (
                <p className="text-center text-gray-500 py-8">No documents uploaded yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;