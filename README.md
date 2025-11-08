# Event Scheduling Web Application

A full-stack event scheduling application built with PERN stack (PostgreSQL, Express.js, React, Node.js).

## Features

- User authentication (signup/login) with JWT
- Create, view, edit, and delete events
- RSVP system (join/leave events)
- Responsive React frontend with Tailwind CSS
- RESTful API with Express.js
- PostgreSQL database

## Tech Stack

- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, JWT, bcryptjs
- **Database:** PostgreSQL
- **Other:** CORS, dotenv

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL database:
   - Create a PostgreSQL database named `event_scheduling`
   - Run the SQL script in `database.sql` to create tables

4. Configure environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     PORT=5001
     DATABASE_URL=postgresql://username:password@localhost:5432/event_scheduling
     JWT_SECRET=your_jwt_secret_key_here
     ```
   - Replace `username`, `password`, and `your_jwt_secret_key_here` with your actual PostgreSQL credentials and a secure JWT secret

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the client directory with the following variable:
     ```
     REACT_APP_API_URL=http://localhost:5001
     ```
   - This sets the API base URL for the React app to communicate with the backend server

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event (authenticated)
- `PUT /api/events/:id` - Update event (authenticated, creator only)
- `DELETE /api/events/:id` - Delete event (authenticated, creator only)
- `POST /api/events/:id/join` - Join event (authenticated)
- `POST /api/events/:id/leave` - Leave event (authenticated)

## Project Structure

```
event-scheduling/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── database.sql       # Database schema
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## Usage

1. Register a new account or login with existing credentials
2. View all available events on the homepage
3. Create new events (requires login)
4. Join or leave events
5. View event details and attendee lists
6. Edit or delete your own events

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
