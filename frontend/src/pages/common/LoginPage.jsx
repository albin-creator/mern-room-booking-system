import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Container, Form, Button } from 'react-bootstrap';

const LoginPage = () => {
  const { login } = useAuth(); // login method from AuthContext
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });

      // Check backend response has both token and user
      if (!res.data || !res.data.token || !res.data.user) {
        throw new Error('Invalid response from server');
      }

      // Save user and token to context and localStorage
      login(res.data.user, res.data.token);

      // Navigate based on role
      navigate(res.data.user.role === 'admin' ? '/admin/home' : '/user/home');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
