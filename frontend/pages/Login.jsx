import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
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
      console.log('Login failed:' + err.response?.data?.message || err.message);
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
      </form>
    </div>
  );
}
