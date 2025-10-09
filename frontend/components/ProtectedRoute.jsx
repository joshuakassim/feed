import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 *
 * Restricts access to routes based on authentication and user role.
 * Checks for a valid JWT token in localStorage and optionally verifies the user's role.
 * Redirects unauthenticated users to the login page.
 * Redirects users with an incorrect role to the home page.
 *
 * Props:
 * - children: React nodes to render if access is granted.
 * - role: (Optional) String specifying the required user role ('donor', 'recipient', etc.).
 *
 * Usage:
 *   <ProtectedRoute role="donor">
 *     <DonorDashboard />
 *   </ProtectedRoute>
 */
const ProtectedRoute = ({ children, role }) => {
  // Retrieve token and user info from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to='/login' />;
  }

  // Redirect to home if user role does not match required role
  if (role && user.role !== role) {
    return <Navigate to='/' />;
  }

  // Render children if access is granted
  return children;
};

export default ProtectedRoute;
