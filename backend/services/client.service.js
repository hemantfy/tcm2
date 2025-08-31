const Client = require('../models/client.model');

const createClient = async (clientData) => {
  const client = new Client(clientData);
  return await client.save();
};

const getAllClients = async () => {
  return await Client.find().select('-password');
};

const getClientById = async (id) => {
  return await Client.findById(id).select('-password');
};

const updateClient = async (id, updateData) => {
  return await Client.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
};

const deleteClient = async (id) => {
  return await Client.findByIdAndDelete(id);
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
};