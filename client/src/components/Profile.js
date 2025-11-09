import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', color: 'white' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
        <p style={{ color: '#dc2626' }}>{error}</p>
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSeeAttendees = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${eventId}/attendees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedEvent({
        id: eventId,
        attendees: response.data,
      });
    } catch (error) {
      console.error('Error fetching attendees:', error);
      alert('Failed to load attendee details');
    }
  };

  const handleClosePopup=()=>{
    setSelectedEvent(null);
  }
  const handleExport=()=>{
    if(!selectedEvent?.attendees?.length) {
      alert('No attendees to export.');
      return;
    }
    const csvHeader = "Name,Email\n";
    const csvRows = selectedEvent.attendees.map(attendee => `"${attendee.name}","${attendee.email}"`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + csvHeader + csvRows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const containerStyle = {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: 'black',
    color: 'white',
  };

  const eventsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
    height: '85%',
  };

  const eventCardStyle = {
    minHeight: '10vh',
    backgroundColor: '#1f2937', // dark gray card
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
  };

  const eventTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
  };

  const eventDetailStyle = {
    fontSize: '0.875rem',
    color: '#d1d5db',
    marginBottom: '0.25rem',
    textAlign: 'left',
  };

  const seeattendeebtnStyle = {
    width: '100%',
    padding: '0.5rem 1rem',
    backgroundColor: '#000000ff',
    color: 'white',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: 'auto',
    border: '1.5px solid yellow',
    boxShadow: '2px 2px 10px yellow', 
  }

  const popupOverlayStyle = {
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const popupStyle = {
    backgroundColor: '#111827',
    borderRadius: '0.75rem',
    padding: '2rem',
    color: 'white',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 0 10px yellow',
  };

  const exportBtnStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: 'black',
    border: '1.5px solid green',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '0.375rem',
    marginTop: '1rem',
    boxShadow: '2px 2px 10px green',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'left', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', marginTop: '-1rem' }}>
        Welcome {user.name},
      </h1>
      <div>
        <h2 style={{ textAlign: 'left', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Your Profile
        </h2>
        <p style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'left' }}>Name: {user.name}</p>
        <p style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'left' }}>Email: {user.email}</p>
      </div>
      <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <h2 style={{ textAlign: 'left', fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Your Created Events
        </h2>
        <p style={{ fontSize: '1rem' }}>
          Here are the events you have created. You can view attendee details for each event below.
        </p>
      </div>
      {events.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#d1d5db' }}>You haven't created any events yet.</p>
      ) : (
        <div style={eventsGridStyle}>
          {events.map((event) => (
            <div key={event.id} style={eventCardStyle}>
              <h2 style={eventTitleStyle}>{event.title}</h2>
              <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
                {event.description.length > 70 
                  ? event.description.slice(0, 70) + '...' 
                  : event.description
                }
              </p>
              <p style={eventDetailStyle}><b>Date:</b>{event.date}</p>
              <p style={eventDetailStyle}><b>Time:</b> {event.time}</p>
              <p style={eventDetailStyle}><b>Location:</b> {event.location}</p>
              <p style={eventDetailStyle}><b>Attendees:</b> {event.attendee_count}</p>
              <button style={seeattendeebtnStyle} onClick={() => handleSeeAttendees(event.id)}>See Attendee</button>
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      {selectedEvent && (
        <div style={popupOverlayStyle} onClick={handleClosePopup}>
          <div style={popupStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Attendee List</h2>
            {selectedEvent.attendees.length === 0 ? (
              <p>No attendees yet.</p>
            ) : (
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {/* Header row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '0.5fr 1fr 1.5fr',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid yellow',
                    fontWeight: '600',
                    color: 'yellow',
                    marginBottom: '0.5rem',
                    textAlign: 'left',
                  }}
                >
                  <span>S.No.</span>
                  <span>Name</span>
                  <span>Email</span>
                </div>

                {/* Attendee rows */}
                {selectedEvent.attendees.map((attendee, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '0.5fr 1fr 1.5fr',
                      padding: '0.4rem 0',
                      borderBottom: '1px solid #333',
                      textAlign: 'left',
                    }}
                  >
                    <span>{index + 1}.</span>
                    <span>{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                ))}
              </div>

            )}
            <button style={exportBtnStyle} onClick={handleExport}>Export Details</button>
            <button style={{ backgroundColor: 'black', marginLeft: '1rem', border: 'yellow', boxShadow: '2px 2px 10px yellow' }} onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;


