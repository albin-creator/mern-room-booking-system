// src/pages/admin/RoomListPage.jsx
import { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';

const RoomListPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/api/room');
      setRooms(res.data);
    } catch (err) {
      console.error('Failed to fetch rooms', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      await axios.delete(`/api/room/${roomId}`);
      setRooms((prev) => prev.filter((r) => r._id !== roomId));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete room');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>All Rooms</h3>
        <Link to="/admin/room/create">
          <Button variant="success">+ Add Room</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Room Title</th>
              <th>Image</th>
              <th>Bed</th>
              <th>Price</th>
              <th>Subtitle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.subtitle || room.name || `Room ${room._id.slice(-4)}`}</td>
                <td>
                  {room.images?.[0] ? (
                    <img
                      src={`/uploads/${room.images[0]}`}
                      alt="Room"
                      style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td>{room.bed}</td>
                <td>₹ {room.price}</td>
                <td>{room.subtitle}</td>
                <td>
                  <Link to={`/admin/room/update/${room._id}`}>
                    <Button size="sm" variant="light" className="me-2">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(room._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AdminLayout>
  );
};

export default RoomListPage;
