# MERN Room Booking System

A full-stack MERN (MongoDB, Express.js, React, Node.js) room booking application with separate admin and user roles.

## Features

- User and Admin Registration & Login
- Role-based redirection (admin dashboard, user homepage)
- Book rooms and view bookings
- Responsive design using React-Bootstrap

## Tech Stack

- Frontend: React, React Router, React Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: Role-based login
- Hosting: Coming soon...

## Setup Instructions

1. Clone the repository
2. Run `npm install` in both `frontend/` and `backend/`
3. Add `.env` files (see below)

## .env Example

Create `.env` files like this:

### `/backend/.env`

MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
