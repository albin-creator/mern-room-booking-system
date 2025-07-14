import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel} from 'react-bootstrap';
import axios from 'axios';

const RoomDetailsPage = () => {
  const { id } = useParams(); // get room ID from URL
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/room/${id}`);
        setRoom(res.data);
      } catch (error) {
        console.error('Failed to fetch room details', error);
      }
    };
    fetchRoom();
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (
    <section className="py-5">
      <Container>
        <Row>
          {/* LEFT COLUMN */}
          <Col lg={8}>
            <h2 className="mb-4">{room.subtitle1}</h2>

            {/* Carousel */}
            <Carousel>
              {room.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <div
                    style={{
                      height: '400px',
                      backgroundImage: `url(/uploads/${img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="mt-5">
              <p>{room.description}</p>

              <Row className="mt-4">
                <Col md={6}>
                  <ul>
                    <li><strong>Room Name:</strong> {room.subtitle}</li>
                    <li><strong>Person:</strong> 1 night, 2 adults</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul>
                    <li><strong>Price:</strong> ₹{room.price}</li>
                    <li><strong>Bed:</strong> {room.bed}</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>

          {/* RIGHT COLUMN */}
          <Col lg={4}>
            <div className="p-4 border rounded shadow-sm">
              <h5 className="mb-3">Ready to book?</h5>
              <Link to={`/room/${room._id}/book`} className="btn btn-primary">Book Now</Link>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RoomDetailsPage;
