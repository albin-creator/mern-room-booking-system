import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Container, Table, Badge, Image, Alert } from 'react-bootstrap';

const MyBooking = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('/api/bookings/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Fetch error:', err.response?.data);
        setError('Failed to fetch your bookings');
      }
    };

    if (token) {
      fetchBookings();
    } else {
      setError('Please log in first');
    }
  }, [token]);

  return (
    <Container className="mt-4">
      <h3>My Bookings</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {bookings.length === 0 && !error && (
        <Alert variant="info">No bookings found.</Alert>
      )}
      {bookings.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>
                  {b.room?.images?.length > 0 ? (
                    <Image
                      src={`/uploads/${b.room.images[0]}`}
                      width={70}
                      rounded
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{new Date(b.checkin).toLocaleDateString()}</td>
                <td>{new Date(b.checkout).toLocaleDateString()}</td>
                <td>
                  <Badge bg={b.status === 'Pending' ? 'danger' : 'success'}>
                    {b.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyBooking;
