import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { MdLogout } from 'react-icons/md';

/**
 * Header Component
 *
 * Renders the top navigation bar for the application.
 * Displays the app name, a welcome message with the user's first name, and a logout button.
 * Handles user logout by clearing authentication data from localStorage and redirecting to the login page.
 * Shows toast notifications for logout errors.
 *
 * Usage:
 *   Place <Header /> at the top of your page layout.
 */
const Header = () => {
  // Retrieve user information from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  /**
   * Logs out the current user.
   * Removes token and user info from localStorage and navigates to the login page.
   * Displays a toast notification if logout fails.
   */
  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed:', error);
    }
  };

  return (
    <header className='bg-white shadow-md sticky top-0 z-40'>
      <nav className='container mx-auto px-4 py-3 flex justify-between items-center'>
        {/* Application name */}
        <div className='text-2xl font-bold text-green-600'>🌍 Feed</div>
        <div className='flex items-center gap-4'>
          {/* Welcome message with user's first name */}
          <span className='text-gray-700 hidden sm:block'>
            Welcome,{' '}
            <span className='font-semibold'>{user?.name?.split(' ')[0]}</span>
          </span>
          {/* Logout button */}
          <button
            onClick={logout}
            className='flex items-center text-gray-600 hover:text-red-500 transition duration-300'
          >
            <MdLogout className='mr-2' size={20} /> Logout
          </button>
        </div>
      </nav>
      {/* Toast notifications container */}
      <ToastContainer />
    </header>
  );
};

export default Header;
