const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

// Create new booking
const createBooking = async (req, res) => {
  try {
    const { name, phone, checkin, checkout, roomId } = req.body;
    const email = req.user.email;

    const booking = new Booking({
      name,
      email,
      phone,
      checkin,
      checkout,
      room: roomId,
      status: 'Pending',
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};

// Get all bookings (admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get bookings' });
  }
};

// Get user bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.user.email })
      .populate('room')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your bookings' });
  }
};

// Approve booking
const approveBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.json({ message: 'Booking approved' });
  } catch (err) {
    res.status(500).json({ message: 'Approval failed' });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getMyBookings,
  approveBooking,
  deleteBooking,
};
