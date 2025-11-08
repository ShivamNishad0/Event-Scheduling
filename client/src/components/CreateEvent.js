import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/events`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create event');
    }
  };
  const submitBtnStyle = {
    width: '35%',
    padding: '0.5rem 1rem',
    backgroundColor: '#000000ff',
    color: 'white',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: '1.5px solid yellow',
    boxShadow: '2px 2px 10px yellow', 

    };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', padding: '2rem' }}>
      <div
        style={{
          maxWidth: '28rem',
          margin: '0 auto',
          backgroundColor: '#000000ff',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
          padding: '1.5rem',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
          Create New Event
        </h1>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: '#f87171', marginBottom: '1rem' }}>{error}</p>}

          {/** Input fields **/}
          {['title', 'description', 'date', 'time', 'location'].map((field) => (
            <div key={field} style={{ marginBottom: '1rem' }}>
              <label
                htmlFor={field}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  gap: '0.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: 'black',
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === 'description' ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #374151',
                    borderRadius: '0.375rem',
                    backgroundColor: 'white',
                    color: '#111827',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              ) : (
                <input
                  type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== 'location'}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #374151',
                    borderRadius: '0.375rem',
                    backgroundColor: 'white',
                    color: '#111827',
                    boxSizing: 'border-box',
                  }}
                />
              )}
            </div>
          ))}

          {/** Buttons **/}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              type="submit"
              style={submitBtnStyle}
            >
              Create Event
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#f15400ff',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
