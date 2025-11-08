import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '2rem', color: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1rem' }}>About Us</h1>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6', textAlign: 'left' }}>
          Welcome to our Event Scheduling Application! We are dedicated to providing a seamless experience for organizing and managing events. Our platform allows users to create, join, and keep track of various events with ease.
        </p>

        <h2 style={{ marginBottom: '0.5rem' }}>Our Mission</h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6', textAlign: 'left' }}>
          Our mission is to simplify the event planning process by offering a user-friendly interface and robust features. We aim to connect people through events, fostering community engagement and collaboration.
        </p>

        <h2 style={{ marginBottom: '0.5rem' }}>Features</h2>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6',textAlign: 'left' }}>
          <li>Create and manage events effortlessly.</li>
          <li>Join events that interest you.</li>
          <li>Receive notifications and updates about your events.</li>
          <li>Connect with other users and share event details.</li>
        </ul>

        <h2 style={{ marginBottom: '0.5rem' }}>Contact Us</h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6', textAlign: 'left' }}>
          If you have any questions, feedback, or need assistance, please don't hesitate to reach out to us through our Contact Us page. We value your input and are here to help!
        </p>

        <p style={{ lineHeight: '1.6', textAlign: 'left' }}>
          Thank you for choosing our Event Scheduling Application. We look forward to helping you make your events a success!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
