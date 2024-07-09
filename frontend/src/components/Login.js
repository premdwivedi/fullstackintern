import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-400 to-blue-800 ">
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="bg-blue-900 p-10 rounded-lg shadow-lg text-center w-96 ">
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="w-full p-2 border-none rounded-md outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                className="w-full p-2 border-none rounded-md outline-none"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="bg-blue-400 text-blue-900 px-5 py-2.5 border-none rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-300">
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/register">Don't have an account? Register here</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;