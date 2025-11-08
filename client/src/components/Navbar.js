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

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const navbarStyle = {
    backgroundColor: '#000000ff',
    padding: '1rem',
    color: 'white',
  };
  const divStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const companeyNameStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '1rem',
    backgroundColor:'black',
  };
  const loglinkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '1rem',
    backgroundColor: 'black',
    border: '1.5px solid yellow',
    cursor: 'pointer',
    boxShadow: '2px 2px 10px yellow', 
  };

  return (
    <nav style={navbarStyle}>
      <div style={divStyle}>
        <Link to="/" style={companeyNameStyle}>
          Event Scheduler
        </Link>
        <div style={divStyle}>
          {token ? (
            <>
              <Link to="/" style={linkStyle}>
                Events
              </Link>
              <Link to="/create-event" style={linkStyle}>
                Create Event
              </Link>
              <Link to="/profile" style={linkStyle}>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                style={loglinkStyle}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} style={loglinkStyle}>
                Login
              </button>
              <button onClick={handleSignup} style={loglinkStyle}>
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
