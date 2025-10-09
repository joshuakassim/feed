import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../utils/api';

/**
 * Register Component
 *
 * Renders a registration form for new users to create an account.
 * Handles form state, submission, and communicates with the backend API.
 * Automatically retrieves the user's geolocation for location data.
 * Stores authentication data in localStorage and navigates users based on their role.
 * Displays toast notifications for errors and geolocation issues.
 *
 * Usage:
 *   <Register />
 */
const Register = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const navigate = useNavigate();

  /**
   * useEffect hook to request user's geolocation on mount.
   * Sets latitude and longitude state if successful.
   * Displays toast notifications for geolocation errors.
   */
  useEffect(() => {
    // Check if the browser supports the Geolocation API
    if (navigator.geolocation) {
      // Request the user's current position
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        function (position) {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        // Error callback function
        function (error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              toast.error('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              toast.error('An unknown error occurred.');
              break;
          }
        },
        // Options object (optional)
        {
          enableHighAccuracy: true, // Request high accuracy, if available
          timeout: 10000000000, // Maximum time (in milliseconds) to wait for a position
          maximumAge: 0, // Don't use a cached position
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, [lat, lng]);

  /**
   * Handles registration form submission.
   * Sends a POST request to the backend to create a new user account.
   * Stores token and user info in localStorage on success.
   * Navigates to the appropriate dashboard based on user role.
   * Displays a toast notification on error.
   *
   * @param {Object} e - Form submit event
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await api.post('auth/register', {
        name,
        email,
        password,
        role,
        location: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      role === 'donor' ? navigate('/donations') : navigate('/charity');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleRegister}
        className='bg-white p-6 rounded-lg shadow-md w-80'
      >
        <h1 className='text-xl font-bold mb-4'>Sign Up</h1>
        <input
          type='text'
          placeholder='Name'
          className='w-full mb-3 p-2 border rounded'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          className='w-full mb-3 p-2 border rounded'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className='w-full mb-3 p-2 border rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          className='w-full mb-3 p-2 border rounded'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <select
          className='w-full mb-3 p-2 border rounded'
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value='' disabled>
            Select Role
          </option>
          <option value='donor'>Donor</option>
          <option value='recipient'>Recipient</option>
        </select>
        <button className='w-full bg-blue-500 text-white py-2 rounded'>
          Register
        </button>
        <p className='text-sm text-gray-600 mt-4'>
          Already have an account?{' '}
          <a
            className='text-blue-500 hover:underline'
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Log In
          </a>
        </p>
      </form>
      {/* Toast notifications container */}
      <ToastContainer pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Register;
