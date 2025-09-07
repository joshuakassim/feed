import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      const res = await api.get('donations');
      setDonations(res.data);
    };
    fetchDonations();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      api.post('donations', {
        title,
        quantity,
        location: {
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        },
        expiryDate,
      });
      setTitle('');
      setQuantity('');
      setAddress('');
      setLat('');
      setLng('');
      setExpiryDate('');
      // Refresh donations list
      const res = await api.get('donations');
      setDonations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Donations</h1>

      <form
        onSubmit={handleCreate}
        className='bg-white p-4 rounded shadow mb-6 space-y-3'
      >
        <h2 className='text-xl font-semibold'>Create Donation</h2>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
        <input
          type='text'
          placeholder='Quantity (e.g. 50kg)'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
        <input
          type='text'
          placeholder='Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
        <div className='flex gap-2'>
          <input
            type='number'
            placeholder='Latitude'
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className='w-1/2 p-2 border rounded'
            required
          />
          <input
            type='number'
            placeholder='Longitude'
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className='w-1/2 p-2 border rounded'
            required
          />
        </div>
        <input
          type='datetime-local'
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
        <button
          type='submit'
          className='bg-green-600 text-white px-4 py-2 rounded'
        >
          Add Donation
        </button>
      </form>

      <ul className='space-y-3'>
        {donations.map((donation) => (
          <li
            key={donation._id}
            className='p-4 bg-white rounded shadow flex justify-between'
          >
            <span>
              <strong>{donation.title}</strong> — {donation.quantity}
            </span>
            <span className='text-sm text-gray-500'>
              {donation.location?.address}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
