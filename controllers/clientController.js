const Client = require('../models/Client');

const addClient = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Extract user ID from authenticated user
    const userId = req.user.id;

    const client = new Client({ name, email, userId });
    await client.save();

    res.status(201).json({
      message: 'Client created successfully',
      client,
    });
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
  
  module.exports = { addClient, getClients };
  