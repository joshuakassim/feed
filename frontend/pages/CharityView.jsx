import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function CharityView() {
  const [donations, setDonations] = useState([]);

  // Fetch available donations
  const fetchDonations = async () => {
    const res = await api.get('donations');

    setDonations(res.data);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Claim a donation
  const handleClaim = async (donationId) => {
    try {
      await api.post(`matches/${donationId}/accept`, { donationId });
      alert('Donation claimed successfully!');
      fetchDonations();
    } catch (err) {
      console.log('Failed to claim donation:', err);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Available Donations</h1>
      <ul className='space-y-3'>
        {donations.map((donation) => (
          <li
            key={donation._id}
            className='p-4 bg-white rounded shadow flex justify-between items-center'
          >
            <div>
              <strong>{donation.title}</strong> — {donation.quantity}
              <div className='text-sm text-gray-500'>
                {donation.location?.address} <br />
                Exp: {new Date(donation.expiryDate).toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => handleClaim(donation._id)}
              className='bg-blue-600 text-white px-3 py-2 rounded'
            >
              Claim
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
