import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import RecipientDashboard from '../pages/RecipientDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import DonorDashboard from '../pages/DonorDashboard';
import { useEffect } from 'react';

/**
 * App Component
 *
 * Main entry point for the frontend application.
 * Sets up client-side routing using react-router-dom.
 * Defines routes for login, registration, donor dashboard, and recipient dashboard.
 * Uses ProtectedRoute to restrict access to dashboard routes based on user role and authentication.
 * Sets the document title on mount.
 *
 * Routes:
 * - /login: Login page
 * - /register: Registration page
 * - /donations: Donor dashboard (protected, donor only)
 * - /charity: Recipient dashboard (protected, recipient only)
 *
 * Usage:
 *   <App />
 */
function App() {
  // Set the browser tab title when the component mounts
  useEffect(() => {
    document.title = '🌍 Feed - Fighting Food Waste Together';
  }, []);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Protected dashboard routes */}
        <Route path='/'>
          <Route
            path='donations'
            element={
              <ProtectedRoute role='donor'>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='charity'
            element={
              <ProtectedRoute role='recipient'>
                <RecipientDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
