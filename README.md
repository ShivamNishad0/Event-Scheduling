# Event Scheduling Web Application

A full-stack event scheduling application built with PERN stack (PostgreSQL, Express.js, React, Node.js).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Supabase Setup](#supabase-setup)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Image Sources](#image-sources)
- [Usage](#usage)

## Features

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

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, React Router, Axios, Tailwind CSS |
| **Backend** | Node.js, Express.js, JWT, bcryptjs |
| **Database** | PostgreSQL (Supabase) |
| **Other** | CORS, dotenv |

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

## Screenshots

### Homepage Before Login
![Homepage](screenshots/Homepage.png)

### Signup Page
![Signup Page](screenshots/Signuppage.png)

### Signin Page
![Signin Page](screenshots/Signpage.png)

### Homepage After Login
![Homepage After Login](screenshots/HomepageAfterlogin.png)

### Create Event Page
![Create Event Page](screenshots/Createeventpage.png)

### Event Page
![Event Page](screenshots/Eventpage.png)

### Profile Page
![Profile Page](screenshots/Profilepage.png)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Supabase account (free tier is sufficient)

### Supabase Setup

1. **Create a Supabase Account**:
   - Go to [Supabase](https://supabase.com/) and sign up for a free account

2. **Create a New Project**:
   - Click "New Project"
   - Fill in project name (e.g., "event-scheduling")
   - Set a database password and remember it
   - Wait for the project to be created (may take a few minutes)

3. **Get Connection Details**:
   - Go to Project Settings → Database
   - Find the "Connection string" section
   - Copy the PostgreSQL connection string (starts with `postgres://`)
   - It will look like:
     ```
     postgres://postgres:password@host:5432/postgres
     ```

4. **Set Up Database Tables**:
   - Go to the SQL Editor in Supabase dashboard
   - Copy the contents of `server/database.sql`
   - Run the SQL script to create the necessary tables

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     PORT=5001
     DATABASE_URL=your_supabase_connection_string_here
     JWT_SECRET=your_jwt_secret_key_here
     ```
   - Example `DATABASE_URL`:
     ```
     DATABASE_URL=postgres://postgres:yourpassword@db.projectid.supabase.co:5432/postgres
     ```
   - Replace `your_supabase_connection_string_here` with your actual Supabase connection string
   - Replace `your_jwt_secret_key_here` with a secure random string
   - The `.env` file should be placed in the root of the `server` directory and should not be committed to version control (ensure it's in `.gitignore`)

4. Start the server:
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

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | User registration (requires: name, email, password) |
| POST | `/api/auth/login` | User login (requires: email, password) |

### Event Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events (public) |
| GET | `/api/events/:id` | Get single event details with attendees (public) |
| GET | `/api/events/:id/attendees` | Get attendees for a specific event (public) |
| POST | `/api/events` | Create new event (authenticated, requires: title, description, date, time, location) |
| PUT | `/api/events/:id` | Update event (authenticated, creator only, requires: title, description, date, time, location) |
| DELETE | `/api/events/:id` | Delete event (authenticated, creator only) |
| POST | `/api/events/:id/join` | Join event (authenticated) |
| POST | `/api/events/:id/leave` | Leave event (authenticated) |
| GET | `/api/events/created` | Get events created by the logged-in user with attendees (authenticated) |
| PUT | `/api/events/created/:id` | Update event from profile (authenticated, creator only) |
| DELETE | `/api/events/created/:id` | Delete event from profile (authenticated, creator only) |

## Dependencies

### Client Dependencies

| Package | Purpose |
|---------|---------|
| react | Core React library for building the user interface |
| react-dom | React DOM rendering library |
| react-router-dom | Declarative routing for React applications |
| axios | HTTP client for making API requests |
| react-slick | Carousel/slider component for auto-swapping images |
| tailwindcss | Utility-first CSS framework for styling |
| web-vitals | Library for measuring web performance metrics |

### Server Dependencies

| Package | Purpose |
|---------|---------|
| express | Web framework for Node.js |
| pg | PostgreSQL client for Node.js |
| jsonwebtoken | Implementation of JSON Web Tokens for authentication |
| bcryptjs | Library for hashing passwords |
| cors | Middleware for enabling Cross-Origin Resource Sharing |
| dotenv | Module for loading environment variables from a .env file |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| nodemon (server) | Tool for automatically restarting the server during development |
| autoprefixer (client) | PostCSS plugin for adding vendor prefixes |
| postcss (client) | Tool for transforming CSS with JavaScript |

## Image Sources

All images used in the project are sourced from [Pixabay](https://pixabay.com/), a free stock photo website. The images are located in `client/src/assets/images/` and include:
- pic1.jpg
- pic2.jpg
- pic3.jpg
- pic4.jpg

## Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Browse Events**: View all available events on the homepage
3. **Create Events**: Create new events (requires login)
4. **RSVP**: Join or leave events
5. **View Details**: Check event details and attendee lists
6. **Manage Events**: Edit or delete your own events from the Profile page

