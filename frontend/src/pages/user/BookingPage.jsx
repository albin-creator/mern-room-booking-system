import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const BookingPage = () => {
  const { user, token } = useAuth();
  const { id } = useParams(); // room ID
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
  });

  // Set user values only after they are loaded
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.username || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBook = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Please log in first');
      return;
    }

    try {
      await axios.post(
        '/api/bookings',
        { ...formData, roomId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/user/mybookings');
    } catch (err) {
      console.error("Booking error:", err.response?.data);
      alert('Booking failed');
    }
  };

  return (
    <Container className="mt-5">
      <h3>Book This Room</h3>
      <Form onSubmit={handleBook}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control value={formData.name} name="name" readOnly />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control value={formData.email} name="email" readOnly />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control name="phone" required onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Check In</Form.Label>
          <Form.Control type="date" name="checkin" required onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Check Out</Form.Label>
          <Form.Control type="date" name="checkout" required onChange={handleChange} />
        </Form.Group>
        <Button type="submit" className="mt-3">Book Now</Button>
      </Form>
    </Container>
  );
};

export default BookingPage;
