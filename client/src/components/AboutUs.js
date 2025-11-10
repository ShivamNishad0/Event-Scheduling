import React from 'react';
import Footer from './Footer';

const AboutUs = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '90vh', 
      backgroundColor: 'black', 
      color: 'white' 
    }}>
      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        padding: '2rem', 
        maxWidth: '800px', 
        margin: '0 auto', 
        textAlign: 'left', 
        lineHeight: '1.6' 
      }}>
        <h1 style={{ marginBottom: '1rem' }}>About Us</h1>
        <p style={{ marginBottom: '1rem' }}>
          Welcome to our Event Scheduling Application! We are dedicated to providing a seamless experience for organizing and managing events. Our platform allows users to create, join, and keep track of various events with ease.
        </p>

        <h2 style={{ marginBottom: '0.5rem' }}>Our Mission</h2>
        <p style={{ marginBottom: '1rem' }}>
          Our mission is to simplify the event planning process by offering a user-friendly interface and robust features. We aim to connect people through events, fostering community engagement and collaboration.
        </p>

        <h2 style={{ marginBottom: '0.5rem' }}>Features</h2>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem' }}>
          <li>Create and manage events effortlessly.</li>
          <li>Join events that interest you.</li>
          <li>Receive notifications and updates about your events.</li>
          <li>Connect with other users and share event details.</li>
        </ul>

        <h2 style={{ marginBottom: '0.5rem' }}>Contact Us</h2>
        <p style={{ marginBottom: '1rem' }}>
          If you have any questions, feedback, or need assistance, please don't hesitate to reach out to us through our Contact Us page. We value your input and are here to help!
        </p>

        <p>
          Thank you for choosing our Event Scheduling Application. We look forward to helping you make your events a success!
        </p>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
