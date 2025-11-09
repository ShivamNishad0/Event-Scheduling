import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchEvent = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
      setEvent(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch event details');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleDelete = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/');
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete event');
      }
    }
  };

  const handleJoinEvent = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/events/${id}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvent(); // Refresh the event details
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to join event');
    }
  };

  const handleLeaveEvent = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/events/${id}/leave`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvent(); // Refresh the event details
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to leave event');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '2rem', color: '#dc2626' }}>{error}</div>;
  if (!event) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Event not found</div>;

  const isCreator = user.id === event.created_by;
  const isAttendee = event.attendees.some(attendee => attendee.id === user.id);

  const editbtnStyle = {
    display: 'inline-block',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    backgroundColor: '#000000ff',
    color: 'white',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: '1.5px solid yellow',
    boxShadow: '2px 2px 10px yellow',
    marginRight: '0.75rem', 
  };
  const style={
                backgroundColor: '#1f2937',
                color: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '85%',
              }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', padding: '2rem' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '2rem', padding: '0 1rem', backgroundColor: 'black', color: 'white'}}>
      <div style={style}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white'}}>{event.title}</h1>
        <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{event.description}</p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          Date: {new Date(event.date).toLocaleDateString()} at {event.time}
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Location: {event.location}</p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Created by: {event.creator_name}</p>

        {isCreator && (
          <div style={{ marginBottom: '1rem' }}>
            <Link
              to={`/edit-event/${event.id}`}
              style={editbtnStyle}
            >
              Edit Event
            </Link>
            <button
              onClick={handleDelete}
              style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
            >
              Delete Event
            </button>
          </div>
        )}

        {!isCreator && (
          <div style={{ marginBottom: '1rem' }}>
            {isAttendee ? (
              <button
                onClick={handleLeaveEvent}
                style={{ backgroundColor: '#f15400ff', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
              >
                Leave Event
              </button>
            ) : (
              <button onClick={handleJoinEvent} style={editbtnStyle}>
                Join Event
              </button>
            )}
          </div>
        )}

        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'left' }}>Total Attendees: {event.attendees.length}</h2>
        <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', textAlign: 'left', marginLeft: '2rem'}}>
          {event.attendees.map((attendee) => (
            <li key={attendee.id} style={{ color: '#374151' }}>
              {attendee.name} ({attendee.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default EventDetails;
