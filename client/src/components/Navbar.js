import React,{ useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [logoutHover, setLogoutHover] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const [signupHover, setSignupHover] = useState(false);

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
  const loglinkStyle = hover => ({
    color: hover ? 'yellow' : 'white',
    textDecoration: 'none',
    marginRight: '1rem',
    backgroundColor: 'black',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1.5px solid yellow',
    cursor: 'pointer',
    boxShadow: '2px 2px 10px yellow', 
  });

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
              <Link to="/Contact Us" style={linkStyle}>
                Contact Us
              </Link>
              <Link to="/About Us" style={linkStyle}>
                  About Us
              </Link>
              <Link to="/profile" style={linkStyle}>
                Profile
              </Link>
              <button onClick={handleLogout} style={loglinkStyle(logoutHover)} onMouseEnter={() => setLogoutHover(true)} onMouseLeave={() => setLogoutHover(false)}>
                Logout
              </button>
            </>
          ) : (
            <>
            <Link to="/Contact Us" style={linkStyle}>
                Contact Us
            </Link>
            <Link to="/About Us" style={linkStyle}>
                About Us
            </Link>
              <button onClick={handleLogin} style={loglinkStyle(loginHover)} onMouseEnter={() => setLoginHover(true)} onMouseLeave={() => setLoginHover(false)}>
                Login
              </button>
              <button onClick={handleSignup} style={loglinkStyle(signupHover)} onMouseEnter={() => setSignupHover(true)} onMouseLeave={() => setSignupHover(false)}>
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
