// src/pages/admin/RoomFormPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';

const RoomFormPage = () => {
  const { id } = useParams(); // if present → edit mode
  const navigate = useNavigate();

  const isUpdateMode = !!id;

  const [formData, setFormData] = useState({
    bed: '',
    subtitle: '',
    price: '',
    description: '',
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    if (isUpdateMode) {
      // Fetch room details
      axios.get(`/api/room/${id}`).then((res) => {
        const { bed, subtitle, price, description } = res.data;
        setFormData((prev) => ({
          ...prev,
          bed,
          subtitle,
          price,
          description,
          // Note: images not preloaded into file inputs
        }));
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      if (isUpdateMode) {
        await axios.put(`/api/room/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Room Updated ✅');
      } else {
        await axios.post('/api/room', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Room Created ✅');
      }
      navigate('/admin/room/list');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to save room');
    }
  };

  return (
    <AdminLayout>
      <Link to="/admin/room/list" className="btn btn-light mb-3">← Back to Room List</Link>
      <h3>{isUpdateMode ? 'Update Room' : 'Add Room'}</h3>

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group>
          <Form.Label>Image 1</Form.Label>
          <Form.Control type="file" name="image1" onChange={handleChange} required={!isUpdateMode} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image 2</Form.Label>
          <Form.Control type="file" name="image2" onChange={handleChange} required={!isUpdateMode} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image 3</Form.Label>
          <Form.Control type="file" name="image3" onChange={handleChange} required={!isUpdateMode} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Bed</Form.Label>
          <Form.Control
            type="text"
            name="bed"
            value={formData.bed}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button className="mt-3" type="submit">
          {isUpdateMode ? 'Update Room' : 'Create Room'}
        </Button>
      </Form>
    </AdminLayout>
  );
};

export default RoomFormPage;
