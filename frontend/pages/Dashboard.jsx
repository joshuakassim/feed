import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='flex h-screen'>
      <aside className='w-64 bg-gray-800 text-white flex flex-col p-4'>
        <h2 className='text-2xl font-bold mb-6'>Farm2Charity</h2>
        <nav className='flex flex-col gap-2'>
          <Link to='/donations' className='hover:underline'>
            Donations
          </Link>
          <Link to='/matches' className='hover:underline'>
            Matches
          </Link>
          <Link to='/charity' className='hover:underline'>
            Charity View
          </Link>
        </nav>
        <button
          onClick={logout}
          className='mt-auto bg-red-500 px-3 py-2 rounded'
        >
          Logout
        </button>
      </aside>
      <main className='flex-1 p-6 bg-gray-100'>
        <Outlet />
      </main>
    </div>
  );
}
