import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchRooms } from '../../api/roomApi';


const UserHomePage = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (err) {
        console.error('Failed to load rooms:', err);
      }
    };
    getRooms();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Welcome, {user?.username}</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">This is the user dashboard.</p>
        <Link to="/user/mybookings" className="btn btn-success">
          My Bookings
        </Link>
      </div>


      <Row>
        {rooms.map((room) => (
          <Col sm={12} md={6} lg={4} className="mb-4" key={room._id}>
            <Card>
              {/* ✅ Show first image from images[0] */}
              <div
                className="img d-flex justify-content-center align-items-center"
                style={{
                  height: '200px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(/uploads/${room.images[0]})`, // show first image
                }}
              ></div>

              <Card.Body className="text-center">
                <Card.Title>{room.subtitle}</Card.Title> {/* subtitle */}
                <h5>{room.bed}</h5> {/* bed */}
                <p>
                  <span className="price mr-2">{room.price}</span>{' '}
                  <span className="per">per night</span>
                </p>
                <hr />
                <p className="pt-1">
                  <Link to={`/room/${room._id}`} className="btn btn-primary">
                    View Room Details
                  </Link>

                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserHomePage;
