import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <h4 className="text-center mb-4">Admin</h4>
      <Nav defaultActiveKey="/admin" className="flex-column">
        <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/admin/room-form">Room Form</Nav.Link>
        <Nav.Link as={Link} to="/admin/bookings">Room Bookings</Nav.Link>
        <Nav.Link as={Link} to="/admin/room/list">Manage Rooms</Nav.Link>
        <Nav.Link as={Link} to="/admin/room/create">Add Room</Nav.Link>
      </Nav>
    </>
  );
};

export default Sidebar;