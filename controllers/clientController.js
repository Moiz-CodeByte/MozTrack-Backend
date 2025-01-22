const Client = require('../models/Client');
const user = require('../models/User')
const addClient = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Extract user ID from authenticated user
    const userId = req.user.id;
    
    const client = new Client({ name, email, userId });
      await client.save();
      // newClient =
    // user.clients.push(newClient);
    
    // Save the updated user
    //await user.save();

    res.status(201).json({
      message: 'Client created successfully',
      client,
    });
    console.log('Client created successfully', client)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getClients = async (req, res) => {
    try {
      // Extract user ID from authenticated user
      const userId = req.user.id;
  
      const clients = await Client.find({ userId });
      res.status(200).json({ clients });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update Client
  const updateClient = async (req, res) => {
    try {
      const { clientId } = req.params;  // Get clientId from the URL parameter
      const { name, email } = req.body; // Get new values from the request body
  
      // Check if the client exists and belongs to the authenticated user
      const client = await Client.findOne({ _id: clientId, userId: req.user.id });
  
      if (!client) {
        return res.status(404).json({ message: 'Client not found or you do not have permission' });
      }
  
      // If email is being updated, check if the new email already exists for the same user
      if (email && email !== client.email) {
        const emailExists = await Client.findOne({ email, userId: req.user.id });
  
        if (emailExists) {
          return res.status(400).json({ message: 'Email is already in use for another client by this user' });
        }
      }
  
      // Update the client details
      client.name = name || client.name;
      client.email = email || client.email;
  
      await client.save();
  
      res.status(200).json({
        message: 'Client updated successfully',
        client,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  // Delete Client
  const deleteClient = async (req, res) => {
    try {
      const { clientId } = req.params;  // Get clientId from the URL parameter
  
      // Check if the client belongs to the authenticated user
      const client = await Client.findOne({ _id: clientId, userId: req.user.id });
  
      if (!client) {
        return res.status(404).json({ message: 'Client not found or you do not have permission' });
      }
  
      // Delete the client using deleteOne
      await Client.deleteOne({ _id: clientId });
  
      res.status(200).json({
        message: 'Client deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = { addClient, getClients, updateClient, deleteClient };
  