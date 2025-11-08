import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#2563eb', padding: '1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'none' }}>
          Event Scheduler
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {token ? (
            <>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Events
              </Link>
              <Link to="/create-event" style={{ color: 'white', textDecoration: 'none' }}>
                Create Event
              </Link>
              <button
                onClick={handleLogout}
                style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
