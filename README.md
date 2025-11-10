# Event Scheduling Web Application

A full-stack event scheduling application built with PERN stack (PostgreSQL, Express.js, React, Node.js).

## Features

- User authentication (signup/login) with JWT
- Create, view, edit, and delete events
- RSVP system (join/leave events)
- Responsive React frontend with Tailwind CSS
- RESTful API with Express.js
- PostgreSQL database

## Requirements Fulfillment

All core requirements from the assignment are fully implemented:

## Tech Stack

- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, JWT, bcryptjs
- **Database:** PostgreSQL
- **Other:** CORS, dotenv

### Core Features 
1. **User Management**: Signup/login with JWT, user profiles with basic info (name, email, registration date), access control for logged-in users only.
2. **Event Management**: CRUD operations for events (create, edit, delete own events), view all events, event details include title, description, date, time, location.
3. **Join/Leave Events (RSVP System)**: Users can join/leave events once, attendee lists displayed, unique RSVP constraint.
4. **Frontend Functionality**: All required pages (Login/Signup, Events List, Event Details, Create/Edit Event), React Router navigation, error/success messages.

### Best Practices 
- Functional components and hooks
- Modular design and clean code
- Responsive design
- Error handling with user feedback
- Comments for complex logic

### Extra Features
1. **Profile Page with Created Events**: Displays user's events with attendee details and CSV export functionality.
2. **Image Slider**: Auto-swapping images on Events List page using react-slick.
3. **About Us Page**: Additional informational page.
4. **Contact Us Page**: Additional contact page.
5. **Navbar Conditional Rendering**: Dynamic navigation based on login status.
6. **Event Attendee Popup**: Detailed attendee list in Profile with export to CSV.
7. **Responsive Grid Layout**: Events displayed in responsive grid.
8. **Logout Functionality**: Proper token removal and navigation.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Server Setup

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
   - The `.env` file should be placed in the root of the `server` directory and should not be committed to version control (ensure it's in `.gitignore`)

5. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5001`

### Client Setup

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
   - The `.env` file should be placed in the root of the `client` directory and should not be committed to version control (ensure it's in `.gitignore`)

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
event-scheduling/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   │   ├── index.html               # Main HTML file
│   │   ├── manifest.json            # PWA manifest
│   │   └── robots.txt               # Robots file
│   ├── src/
│   │   ├── assets/                  # Static assets like images
│   │   │   └── images/              # Image files (sourced from https://pixabay.com/)
│   │   │       ├── pic1.jpg
│   │   │       ├── pic2.jpg
│   │   │       ├── pic3.jpg
│   │   │       └── pic4.jpg
│   │   ├── components/              # React components
│   │   │   ├── AboutUs.js           # About Us page component
│   │   │   ├── ContactUs.js         # Contact Us page component
│   │   │   ├── CreateEvent.js       # Create event form component
│   │   │   ├── EditEvent.js         # Edit event form component
│   │   │   ├── EventDetails.js      # Event details page component
│   │   │   ├── EventsList.js        # List of events component
│   │   │   ├── Login.js             # Login form component
│   │   │   ├── Navbar.js            # Navigation bar component
│   │   │   ├── Profile.js           # User profile component
│   │   │   └── Signup.js            # Signup form component
│   │   ├── App.js                   # Main App component
│   │   ├── App.css                  # App-specific styles
│   │   ├── index.css                # Global styles
│   │   ├── index.js                 # App entry point
│   │   ├── reportWebVitals.js       # Performance monitoring
│   │   ├── setupTests.js            # Test setup
│   │   └── styles.css               # Additional styles
│   ├── package.json                 # Client dependencies and scripts
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── .gitignore                   # Git ignore for client
├── server/                          # Express backend
│   ├── middleware/                  # Custom middleware
│   │   └── auth.js                  # JWT authentication middleware
│   ├── routes/                      # API route handlers
│   │   ├── auth.js                  # Authentication routes (signup, login)
│   │   └── events.js                # Event-related routes
│   ├── database.sql                 # PostgreSQL database schema
│   ├── index.js                     # Server entry point
│   ├── package.json                 # Server dependencies and scripts
│   └── .gitignore                   # Git ignore for server
├── .gitignore                       # Root git ignore
└── README.md                        # Project documentation
```

## Dependencies

### Client Dependencies

- **react**: Core React library for building the user interface
- **react-dom**: React DOM rendering library
- **react-router-dom**: Declarative routing for React applications
- **axios**: HTTP client for making API requests
- **react-slick**: Carousel/slider component for auto-swapping images in the EventsList component
- **tailwindcss**: Utility-first CSS framework for styling
- **web-vitals**: Library for measuring web performance metrics

### Server Dependencies

- **express**: Web framework for Node.js
- **pg**: PostgreSQL client for Node.js
- **jsonwebtoken**: Implementation of JSON Web Tokens for authentication
- **bcryptjs**: Library for hashing passwords
- **cors**: Middleware for enabling Cross-Origin Resource Sharing
- **dotenv**: Module for loading environment variables from a .env file

### Dev Dependencies

- **nodemon** (server): Tool for automatically restarting the server during development
- **autoprefixer** (client): PostCSS plugin for adding vendor prefixes
- **postcss** (client): Tool for transforming CSS with JavaScript

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/signup` - User registration (requires: name, email, password)
- `POST /api/auth/login` - User login (requires: email, password)

### Event Endpoints
- `GET /api/events` - Get all events (public)
- `GET /api/events/:id` - Get single event details with attendees (public)
- `GET /api/events/:id/attendees` - Get attendees for a specific event (public)
- `POST /api/events` - Create new event (authenticated, requires: title, description, date, time, location)
- `PUT /api/events/:id` - Update event (authenticated, creator only, requires: title, description, date, time, location)
- `DELETE /api/events/:id` - Delete event (authenticated, creator only)
- `POST /api/events/:id/join` - Join event (authenticated)
- `POST /api/events/:id/leave` - Leave event (authenticated)
- `GET /api/events/created` - Get events created by the logged-in user with attendees (authenticated)
- `PUT /api/events/created/:id` - Update event from profile (authenticated, creator only)
- `DELETE /api/events/created/:id` - Delete event from profile (authenticated, creator only)

## Image Sources

All images used in the project are sourced from [Pixabay](https://pixabay.com/), a free stock photo website. The images are located in `client/src/assets/images/` and include:
- pic1.jpg
- pic2.jpg
- pic3.jpg
- pic4.jpg

## Usage

1. Register a new account or login with existing credentials
2. View all available events on the homepage
3. Create new events (requires login)
4. Join or leave events
5. View event details and attendee lists
6. Edit or delete your own events
