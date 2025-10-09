# 🌍 Feed — Food Donation Platform

Feed is a full-stack web application designed to connect food donors with recipient organizations, helping to reduce food waste and support communities in need. The platform allows donors to list surplus food, and recipients to claim donations and view available listings on an interactive map.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Register and login as a donor or recipient.
- **Donor Dashboard:** Create, view, and manage food donation listings. Track your impact (meals saved).
- **Recipient Dashboard:** Browse available donations, view details, and claim food. See listings on an interactive map.
- **Interactive Map:** Visualize nearby donations using [react-leaflet](https://react-leaflet.js.org/).
- **Role-Based Access:** Protected routes for donors and recipients.
- **Geolocation:** Automatically capture user location for accurate listings.
- **Toast Notifications:** User feedback for actions and errors.

---

## Tech Stack

- **Frontend:** React, Vite, React Router, React Toastify, React Leaflet, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Other:** Axios, ESLint

---

## Project Structure

```
feed/
├── LICENSE
├── backend/
│   ├── .gitignore
│   ├── package.json
|   ├── package-lock.json
│   ├── server.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── donationController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Donation.js
│   │   └── User.js
│   └── routes/
│       ├── auth.js
│       └── donations.js
├── frontend/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
|   ├── package-lock.json
│   ├── README.md
│   ├── vite.config.js
│   ├── components/
│   │   ├── DonorForm.jsx
│   │   ├── Header.jsx
│   │   ├── ListingDetails.jsx
│   │   ├── ListingsMap.jsx
│   │   ├── Modal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── DonorDashboard.jsx
│   │   ├── Login.jsx
│   │   ├── RecipientDashboard.jsx
│   │   └── Register.jsx
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── utils/
│       └── api.js
```

---

## Getting Started

### Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**

   - Create a `.env` file and set your values:
     ```
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     PORT=5000
     ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`.

### Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

---

## Environment Variables

Backend `.env` example:

```
MONGO_URI=mongodb://localhost:27017/feed
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Usage

- **Register:** Sign up as a donor or recipient. Your location is captured automatically.
- **Login:** Access your dashboard based on your role.
- **Donor Dashboard:** Create new food listings, view/manage your donations, and track your impact.
- **Recipient Dashboard:** Browse available donations, view details, claim items, and see listings on a map.
- **Logout:** Securely log out from any dashboard.

---

## API Endpoints

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT

### Donations

- `GET /api/donations` — Get all available donations
- `GET /api/donations/donor` — Get donations created by the authenticated donor
- `POST /api/donations` — Create a new donation (donor only)
- `PUT /api/donations/:donationId/claim` — Claim a donation (recipient only)
- `DELETE /api/donations/:donationId/delete` — Delete a donation (donor only)

---

## Contributing

Contributions are welcome!

- Fork the repository and create your branch from `main`.
- Document your code and follow existing style conventions.
- Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the [MIT License](../LICENSE).

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Leaflet](https://leafletjs.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [Tailwind CSS](https://tailwindcss.com/)

---

> Built for GNEC Hackathon 2025 Fall — Fighting Food Waste Together!
