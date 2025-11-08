import React from 'react';

const ContactUs = () => {

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
    marginLeft: '65%',
    };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ 
        maxWidth: '600px', 
        width: '100%', 
        padding: '2rem', 
        marginTop: '-50px',
        backgroundColor: '#000000ff', 
        color: 'white',            
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Contact Us</h2>
        <form>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ color: 'black', minWidth: '80px', textAlign: 'left'}}>Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            color: '#111827',
                            boxSizing: 'border-box'
                            }} 
                    />
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ display: 'block', minWidth: '80px', color: 'black',textAlign: 'left'}}>Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            color: '#111827',
                            boxSizing: 'border-box'
                        }} 
                    />
            </div>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'  }}>
            <label htmlFor="message" style={{ display: 'block', minWidth: '80px', color: 'black', textAlign: 'left'}}>Message:</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: '#111827',
                boxSizing: 'border-box'
              }}
            ></textarea>
          </div>
          <button type="submit" style={submitBtnStyle}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
