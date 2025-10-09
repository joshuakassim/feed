import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

/**
 * Login Component
 *
 * Renders a login form for users to authenticate.
 * Handles form state, submission, and communicates with the backend API.
 * Stores authentication data in localStorage and navigates users based on their role.
 * Displays toast notifications for errors.
 *
 * Usage:
 *   <Login />
 */
const Login = () => {
  // State variables for email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /**
   * Handles login form submission.
   * Sends a POST request to the backend to authenticate the user.
   * Stores token and user info in localStorage on success.
   * Navigates to the appropriate dashboard based on user role.
   * Displays a toast notification on error.
   *
   * @param {Object} e - Form submit event
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (res.data.user.role === 'donor') {
        navigate('/donations');
      } else if (res.data.user.role === 'recipient') {
        navigate('/charity');
      } else {
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-6 rounded-lg shadow-md w-80'
      >
        <h1 className='text-xl font-bold mb-4'>Login</h1>
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
        <button className='w-full bg-blue-500 text-white py-2 rounded'>
          Login
        </button>

        <p className='text-sm text-gray-600 mt-4'>
          Don't have an account?{' '}
          <a
            className='text-blue-500 hover:underline'
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Sign Up
          </a>
        </p>
      </form>
      {/* Toast notifications container */}
      <ToastContainer pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Login;
