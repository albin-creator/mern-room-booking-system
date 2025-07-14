import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-dark text-white min-vh-100 p-3">
          <Sidebar />
        </Col>
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
