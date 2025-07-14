import { useAuth } from '../../context/AuthContext';
import { Container, Card, Row, Col } from 'react-bootstrap';
import AdminLayout from '../../layouts/AdminLayout';

const AdminHomePage = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <Container className="mt-4">
        <h2>Welcome, {user?.email}</h2>
        <p>This is the admin dashboard.</p>

        <Row className="mt-4">
          <Col md={6}>
            <Card bg="primary" text="white" className="mb-3">
              <Card.Body>
                <Card.Title>Total Bookings</Card.Title>
                <Card.Text>120</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card bg="success" text="white" className="mb-3">
              <Card.Body>
                <Card.Title>Total Rooms</Card.Title>
                <Card.Text>45</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminHomePage;
