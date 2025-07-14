const express = require('express');
const multer = require('multer');
const path = require('path');
const Room = require('../models/roomModel');
const { getAllRooms } = require('../controllers/roomController');

const router = express.Router();

// Get all rooms
router.get('/', getAllRooms); // GET /api/room

// Multer Config for Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Create Room
router.post(
  '/',
  upload.fields([
    { name: 'image1' },
    { name: 'image2' },
    { name: 'image3' },
  ]),
  async (req, res) => {
    try {
      const { bed, subtitle, price, description } = req.body;

      // Validate required fields
      if (!bed || !subtitle || !price || !description) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const images = [
        req.files.image1?.[0]?.filename,
        req.files.image2?.[0]?.filename,
        req.files.image3?.[0]?.filename,
      ].filter(Boolean); // remove undefined

      const room = new Room({
        bed,
        subtitle,
        price: Number(price), // important conversion
        description,
        images,
      });

      await room.save();
      res.status(201).json({ message: 'Room created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to save room' });
    }
  }
);

// Get Single Room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(404).json({ message: 'Room not found' });
  }
});

// Delete Room
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete room' });
  }
});

// Update Room
router.put(
  '/:id',
  upload.fields([
    { name: 'image1' },
    { name: 'image2' },
    { name: 'image3' },
  ]),
  async (req, res) => {
    try {
      const { bed, subtitle, price, description } = req.body;

      const images = [
        req.files.image1?.[0]?.filename || '',
        req.files.image2?.[0]?.filename || '',
        req.files.image3?.[0]?.filename || '',
      ].filter(Boolean); // Remove empty strings

      const updateData = {
        bed,
        subtitle,
        price,
        description,
      };

      if (images.length > 0) {
        updateData.images = images;
      }

      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }

      res.json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update room' });
    }
  }
);

module.exports = router;
