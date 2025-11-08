import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const divStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb'
  };
  const divtwoStyle = { 
    maxWidth: '28rem', 
    width: '100%', 
    padding: '2rem' 
  };
  const h1Style = {
    marginTop: '1.5rem', 
    textAlign: 'center', 
    fontSize: '1.875rem', 
    fontWeight: '800', 
    color: '#111827' 
  };
  const submiBtnStyle = {
    width: '100%',
    padding: '0.5rem 1rem',
    backgroundColor: '#000000ff',
    color: 'white',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: '1.5px solid yellow',
    boxShadow: '2px 2px 10px yellow', 
    };

  return (
    <div style={divStyle}>
      <div style={divtwoStyle}>
        <div>
          <h2 style={h1Style}>
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: '#dc2626', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
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
              autoComplete="current-password"
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
              style={submiBtnStyle}
            >
              Sign in
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/signup" style={{ color: '#4f46e5', textDecoration: 'none' }}>
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
