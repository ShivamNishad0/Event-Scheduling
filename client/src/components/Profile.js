import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      navigate('/login');
      return;
    }

    const fetchCreatedEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/created`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };

    fetchCreatedEvents();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <p style={{ color: '#dc2626' }}>{error}</p>
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem('user'));

  const containerStyle = {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f9fafb',
  };
  
  // New style for the grid container
  const eventsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Allows 3 columns typically, and wraps on smaller screens
    gap: '1.5rem', // Space between cards
    marginTop: '1rem',
  };

  const eventCardStyle = {
    // Removed gridTemplateColumns from here as it's now handled by the parent grid
    minHeight: '10vh',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    // Added display: 'flex' and flexDirection: 'column' to manage content layout within the card
    display: 'flex',
    flexDirection: 'column',
  };

  const eventTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '0.5rem',
  };

  const eventDetailStyle = {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.25rem',
  };

  const attendeeListStyle = {
    marginTop: '1rem',
  };

  const attendeeItemStyle = {
    fontSize: '0.875rem',
    color: '#374151',
    marginBottom: '0.25rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'left', fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' , marginTop: '-1rem'}}>
        Welcome {user.name},
      </h1>
      <div>
        <h2 style={{ textAlign: 'left', fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
          Your Profile
        </h2>
        <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem', textAlign: 'left' }}>
          Name: {user.name}
        </p>
        <p  style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem', textAlign: 'left' }}>
          Email: {user.email}
        </p>
      </div>
      <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ textAlign: 'left', fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
          Your Created Events
        </h2> 
        
        <p style={{ fontSize: '1rem', color: '#6b7280' }}>
          Here are the events you have created. You can view attendee details for each event below.
        </p>
      </div>
      {events.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280' }}>You haven't created any events yet.</p>
      ) : (
        // Apply the grid style to the container wrapping the event cards
        <div style={eventsGridStyle}>
          {events.map((event) => (
            <div key={event.id} style={eventCardStyle}>
              <h2 style={eventTitleStyle}>{event.title}</h2>
              <p style={eventDetailStyle}>Description: {event.description}</p>
              <p style={eventDetailStyle}>Date: {event.date}</p>
              <p style={eventDetailStyle}>Time: {event.time}</p>
              <p style={eventDetailStyle}>Location: {event.location}</p>
              <p style={eventDetailStyle}>Attendees: {event.attendee_count}</p>
              {event.attendees && event.attendees.length > 0 && (
                <div style={attendeeListStyle}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>Attendee Details:</h3>
                  {event.attendees.map((attendee) => (
                    <div key={attendee.id} style={attendeeItemStyle}>
                      **{attendee.name}** - {attendee.email}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;