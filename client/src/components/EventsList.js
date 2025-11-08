import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleJoinEvent = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/events/${eventId}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to join event');
    }
  };

  const handleLeaveEvent = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/events/${eventId}/leave`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to leave event');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '2rem', color: '#dc2626' }}>{error}</div>;

  return (
    <div style={{background: 'black', minHeight: '100vh', paddingBottom: '2rem', marginTop: '-35px' }}>
    <div style={{ maxWidth: '1500px', margin: '0 auto', marginTop: '2rem', padding: '0 1rem', }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem',color: 'white'}}>Events</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {events.map((event) => (
          <div key={event.id} style={{ 
              backgroundColor: '#1f2937', // dark gray
              color: 'white',             // text color
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(255, 255, 255, 0.1)', // subtle white shadow
              padding: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{event.title}</h2>
            <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>{event.description}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
              Date: {new Date(event.date).toLocaleDateString()} at {event.time}
            </p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Location: {event.location}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Created by: {event.creator_name}</p>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Attendees: {event.attendee_count}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link
                to={`/events/${event.id}`}
                style={{ color: '#2563eb', textDecoration: 'none' }}
              >
                View Details
              </Link>
              <div>
                <button
                  onClick={() => handleJoinEvent(event.id)}
                  style={{ backgroundColor: '#10b981', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', marginRight: '0.5rem', border: 'none', cursor: 'pointer' }}
                >
                  Join
                </button>
                <button
                  onClick={() => handleLeaveEvent(event.id)}
                  style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
                >
                  Leave
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default EventsList;
