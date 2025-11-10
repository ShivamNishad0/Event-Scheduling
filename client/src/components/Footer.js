import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const footerStyle = {
    backgroundColor: '#000000ff', // dark gray
    color: 'white',
    padding: '1rem',
    marginTop: '5rem',
    marginBottom: '-1.5rem',
    boxShadow: '.5px -4px 5px rgba(227, 252, 3, 0.43)',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  };

  // Top row: nav links (left) + social icons (right)
  const topRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1500px',
    flexWrap: 'wrap',
  };

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    margin: '-15px'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  };

  const socialContainer = {
    display: 'flex',
    gap: '0.8rem',
    justifyContent: 'flex-end',
  };

  const iconStyle = {
    color: 'white',
    fontSize: '1.2rem',
    transition: 'color 0.3s ease, transform 0.3s ease',
    cursor: 'pointer',
  };

  const handleHover = (e, color, scale) => {
    e.target.style.color = color;
    e.target.style.transform = scale;
  };

  const handleLeave = (e) => {
    e.target.style.color = 'white';
    e.target.style.transform = 'scale(1)';
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* TOP ROW: Navigation Left + Social Right */}
        <div style={topRowStyle}>
          {/* NAV LINKS - LEFT */}
          <nav style={navStyle}>
            <span
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.color = '#2dd4bf')}
              onMouseLeave={(e) => (e.target.style.color = 'white')}
              onClick={() => navigate('/About Us')}
              aria-label="Go to About Us page"
            >
              About Us
            </span>
            <span
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.color = '#2dd4bf')}
              onMouseLeave={(e) => (e.target.style.color = 'white')}
              onClick={() => navigate('/Contact Us')}
              aria-label="Go to Contact Us page"
            >
              Contact Us
            </span>
          </nav>

          {/* SOCIAL ICONS - RIGHT */}
          <div style={socialContainer}>
            {/* <i
              className="fab fa-twitter"
              style={iconStyle}
              onMouseEnter={(e) => handleHover(e, '#1DA1F2', 'scale(1.2)')}
              onMouseLeave={handleLeave}
              onClick={() => window.open('https://twitter.com', '_blank')}
            ></i> */}
            <i
              className="fab fa-github"
              style={iconStyle}
              onMouseEnter={(e) => handleHover(e, '#ccc', 'scale(1.2)')}
              onMouseLeave={handleLeave}
              onClick={() => window.open('https://github.com/ShivamNishad0', '_blank')}
            ></i>
            <i
              className="fab fa-linkedin"
              style={iconStyle}
              onMouseEnter={(e) => handleHover(e, '#0A66C2', 'scale(1.2)')}
              onMouseLeave={handleLeave}
              onClick={() => window.open('https://www.linkedin.com/in/sn-shivam/', '_blank')}
            ></i>
          </div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          &copy; {currentYear} <strong>Event Scheduler</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
