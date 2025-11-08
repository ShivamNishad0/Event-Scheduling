import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '28rem', width: '100%', padding: '2rem' }}>
        <div>
          <h2 style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '1.875rem', fontWeight: '800', color: '#111827' }}>
            Create your account
          </h2>
        </div>
        <form style={{ marginTop: '2rem' }} onSubmit={handleSubmit}>
          {error && <p style={{ color: '#dc2626', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          <div style={{ marginBottom: '1rem' }}>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: '#111827',
                boxSizing: 'border-box'
              }}
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: '#111827',
                boxSizing: 'border-box'
              }}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: '#111827',
                boxSizing: 'border-box'
              }}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.5rem 1rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Sign up
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none' }}>
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
