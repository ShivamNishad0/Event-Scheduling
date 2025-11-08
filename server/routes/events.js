const express = require('express');
const { Pool } = require('pg');
const auth = require('../middleware/auth');

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await pool.query(`
      SELECT e.*, u.name as creator_name,
             (SELECT COUNT(*) FROM event_attendees ea WHERE ea.event_id = e.id) as attendee_count
      FROM events e
      JOIN users u ON e.created_by = u.id
      ORDER BY e.date, e.time
    `);
    res.json(events.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get events created by the logged-in user with attendees (protected)
router.get('/created', auth, async (req, res) => {
  try {
    const events = await pool.query(`
      SELECT e.*, u.name as creator_name,
             (SELECT COUNT(*) FROM event_attendees ea WHERE ea.event_id = e.id) as attendee_count
      FROM events e
      JOIN users u ON e.created_by = u.id
      WHERE e.created_by = $1
      ORDER BY e.date, e.time
    `, [req.user.id]);

    // For each event, fetch attendees
    const eventsWithAttendees = await Promise.all(events.rows.map(async (event) => {
      const attendees = await pool.query(`
        SELECT u.id, u.name, u.email
        FROM event_attendees ea
        JOIN users u ON ea.user_id = u.id
        WHERE ea.event_id = $1
      `, [event.id]);
      return { ...event, attendees: attendees.rows };
    }));

    res.json(eventsWithAttendees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event from profile (protected, only creator)
router.put('/created/:id', auth, async (req, res) => {
  const { title, description, date, time, location } = req.body;

  try {
    const event = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (event.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.rows[0].created_by !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedEvent = await pool.query(
      'UPDATE events SET title = $1, description = $2, date = $3, time = $4, location = $5 WHERE id = $6 RETURNING *',
      [title, description, date, time, location, req.params.id]
    );
    res.json(updatedEvent.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event from profile (protected, only creator)
router.delete('/created/:id', auth, async (req, res) => {
  try {
    const event = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (event.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.rows[0].created_by !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await pool.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event with attendees
router.get('/:id', async (req, res) => {
  try {
    const event = await pool.query(`
      SELECT e.*, u.name as creator_name
      FROM events e
      JOIN users u ON e.created_by = u.id
      WHERE e.id = $1
    `, [req.params.id]);

    if (event.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const attendees = await pool.query(`
      SELECT u.id, u.name, u.email, ea.joined_at
      FROM event_attendees ea
      JOIN users u ON ea.user_id = u.id
      WHERE ea.event_id = $1
    `, [req.params.id]);

    res.json({ ...event.rows[0], attendees: attendees.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create event (protected)
router.post('/', auth, async (req, res) => {
  const { title, description, date, time, location } = req.body;

  try {
    const newEvent = await pool.query(
      'INSERT INTO events (title, description, date, time, location, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, date, time, location, req.user.id]
    );
    res.status(201).json(newEvent.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update event (protected, only creator)
router.put('/:id', auth, async (req, res) => {
  const { title, description, date, time, location } = req.body;

  try {
    const event = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (event.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.rows[0].created_by !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedEvent = await pool.query(
      'UPDATE events SET title = $1, description = $2, date = $3, time = $4, location = $5 WHERE id = $6 RETURNING *',
      [title, description, date, time, location, req.params.id]
    );
    res.json(updatedEvent.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event (protected, only creator)
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (event.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.rows[0].created_by !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await pool.query('DELETE FROM events WHERE id = $1', [req.params.id]);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join event (protected)
router.post('/:id/join', auth, async (req, res) => {
  try {
    const event = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (event.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already joined
    const alreadyJoined = await pool.query('SELECT * FROM event_attendees WHERE event_id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    if (alreadyJoined.rows.length > 0) {
      return res.status(400).json({ message: 'Already joined this event' });
    }

    await pool.query('INSERT INTO event_attendees (event_id, user_id) VALUES ($1, $2)', [req.params.id, req.user.id]);
    res.json({ message: 'Joined event successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leave event (protected)
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const event = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (event.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await pool.query('DELETE FROM event_attendees WHERE event_id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    res.json({ message: 'Left event successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
