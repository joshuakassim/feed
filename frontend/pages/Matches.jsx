import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await api.get('matches');
      setMatches(res.data);
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Matches</h1>
      <ul className='space-y-3'>
        {matches.map((m) => (
          <li key={m._id} className='p-4 bg-white rounded shadow flex flex-col'>
            <span>
              Donation: <strong>{m.donation?.title}</strong>
            </span>
            <span>Charity: {m.charity?.name}</span>
            <span>Status: {m.status}</span>
            {m.route && (
              <span className='text-sm text-gray-500'>
                {m.route.distance}, {m.route.duration}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
