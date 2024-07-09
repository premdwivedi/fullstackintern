import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Pagination } from 'react-bootstrap';
import { FaCog, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Suspended':
        return 'danger';
      case 'Inactive':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="mt-5">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`https://via.placeholder.com/30`}
                  alt={user.name}
                  className="rounded-circle me-2"
                  width="30"
                  height="30"
                />
                {user.name}
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>{user.role || 'User'}</td>
              <td>
                <span className={`badge bg-${getStatusColor(user.status || 'Active')}`}>
                  {user.status || 'Active'}
                </span>
              </td>
              <td>
                <Button variant="light" size="sm" className="me-2">
                  <FaCog />
                </Button>
                <Button variant="light" size="sm">
                  <FaTimes />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <span>Showing {users.length} out of {users.length} entries</span>
        <Pagination>
          <Pagination.Item>Previous</Pagination.Item>
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>Next</Pagination.Item>
        </Pagination>
      </div>
    </Container>
  );
};

export default Dashboard;