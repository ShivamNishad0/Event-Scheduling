import React from 'react';
import Footer from './Footer';

const ContactUs = () => {

  const labelStyle = { 
    color: 'black', 
    marginBottom: '0.5rem', 
    textAlign: 'left' ,
    minWidth: '100px,',
    fontWeight: 'bold'
  }

  const inputStyle = {
    flex:1,
    width: '100%',
    padding: '0.5rem 0.75rem',
    marginRight: '1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    color: '#111827',
    backgroundColor: '#fff',
    boxSizing: 'border-box'
  };

  const submitBtnStyle = {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#000',
    color: 'white',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: '1.5px solid yellow',
    boxShadow: '2px 2px 10px yellow',
    alignSelf: 'flex-end',
    marginTop: '1rem'
  };


  return (
    <div style={{ backgroundColor: 'black', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <form style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'black'}}>Contact Us</h2>
          
          {/* Name Field */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
            <label htmlFor="name" style={labelStyle}>Name:</label>
            <input type="text" id="name" name="name" style={inputStyle} />
          </div>

          {/* Email Field */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
            <label htmlFor="email" style={labelStyle}>Email:</label>
            <input type="email" id="email" name="email" style={inputStyle} />
          </div>

          {/* Message Field */}
          <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem' }}>
            <label htmlFor="message" style={labelStyle}>Message:</label>
            <textarea id="message" name="message" rows="5" style={inputStyle}></textarea>
          </div>
          {/* Submit Button */}
          <button type="submit" style={submitBtnStyle}>Send Message</button>
          
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
