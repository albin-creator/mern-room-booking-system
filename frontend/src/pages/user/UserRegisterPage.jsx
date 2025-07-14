import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const UserRegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/register', form);
      alert('User Registered. Now login.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="mt-5">
      <h2>User Register</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" required onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Form.Group>
        <Button className="mt-3" type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default UserRegisterPage;
