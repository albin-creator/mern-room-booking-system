import { useEffect, useState } from 'react';
import { Container, Table, Button, Image } from 'react-bootstrap';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const RoomBookingListPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings');
        setBookings(response.data);
      } catch (err) {
        console.error('Failed to load bookings', err);
      }
    };

    fetchBookings();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/bookings/${id}/approve`);
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, status: 'Approved' } : b)
      );
    } catch (err) {
      console.error('Approval failed', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bookings/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4">All Bookings</h3>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Room</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.room?.subtitle || 'Room Name'}</td>
              <td>
                <Image
                  src={`/uploads/${booking.room?.images?.[0]}`}
                  alt="room"
                  thumbnail
                  style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                />
              </td>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.phone}</td>
              <td>{booking.checkin}</td>
              <td>{booking.checkout}</td>
              <td style={{ color: booking.status === 'Approved' ? 'green' : 'red' }}>
                {booking.status}
              </td>
              <td>
                <FaCheckCircle
                  onClick={() => handleApprove(booking._id)}
                  style={{ color: 'green', cursor: 'pointer', marginRight: '10px' }}
                  title="Approve"
                />
                <FaTrash
                  onClick={() => handleDelete(booking._id)}
                  style={{ color: 'red', cursor: 'pointer' }}
                  title="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RoomBookingListPage;
