const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getMyBookings,
  approveBooking,
  deleteBooking,
} = require('../controllers/bookingController');

const protect = require('../middleware/authMiddleware');

// User creates booking
router.post('/', protect, createBooking);

// Admin fetches all bookings
router.get('/', getAllBookings);

// User fetches own bookings
router.get('/my', protect, getMyBookings);

// Admin approves
router.put('/:id/approve', approveBooking);

// Admin deletes
router.delete('/:id', deleteBooking);

module.exports = router;
