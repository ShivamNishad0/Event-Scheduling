import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';  // import react-slick

// Import images
import pic1 from '../assets/images/pic1.jpg';
import pic2 from '../assets/images/pic2.jpg';
import pic3 from '../assets/images/pic3.jpg';
import pic4 from '../assets/images/pic4.jpg';

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
      fetchEvents();
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
      fetchEvents();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to leave event');
    }
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };
  const joinBtnStyle = {
    width: '35%',
    textAlign: 'center',
    padding: '0.2rem 1rem',
    backgroundColor: '#000000ff',
    color: 'white',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: '1.5px solid yellow',
    boxShadow: '2px 2px 10px yellow', 
    };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '2rem', color: '#dc2626' }}>{error}</div>;

  return (
    <div style={{ background: 'black', minHeight: '120vh', paddingBottom: '2rem', marginTop: '-35px' }}>
      <div style={{ maxWidth: '1500px', margin: '0 auto', marginTop: '2rem', padding: '0 1rem' }}>
        
        {/* Slider */}
        <Slider {...sliderSettings} style={{ marginBottom: '2rem', borderRadius: '10px', overflow: 'hidden' }}>
          {[pic1, pic2, pic3, pic4].map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            </div>
          ))}
        </Slider>

        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', color: 'white' }}>Events</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {events.map((event) => (
            <div key={event.id} style={{
                backgroundColor: '#1f2937',
                color: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '85%',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{event.title}</h2>
              <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
                {event.description.length > 70 
                  ? event.description.slice(0, 70) + '...' 
                  : event.description
                }
              </p>
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
                    style={joinBtnStyle}
                  >
                    Join
                  </button>
                  <button
                    onClick={() => handleLeaveEvent(event.id)}
                    style={{ backgroundColor: '#ff5900ff', color: 'white', padding: '0.25rem 0.75rem', border: '1.5px solid #ff5900ff', borderRadius: '0.25rem', cursor: 'pointer', boxShadow: '2px 2px 10px #ff4d00ff'}}
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
