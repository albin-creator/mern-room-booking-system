const Room = require('../models/roomModel');

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 }); // latest first
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rooms' });
  }
};

module.exports = { getAllRooms };
