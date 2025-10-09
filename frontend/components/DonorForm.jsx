import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import api from '../utils/api';

/**
 * DonorForm Component
 *
 * Renders a form for donors to create a new food donation listing.
 * Handles form state, submission, and communicates with the backend API.
 *
 * Props:
 * - onListingCreated: Function to call after a successful listing creation.
 * - onCancel: Function to call when the user cancels the form.
 */
const DonorForm = ({ onListingCreated, onCancel }) => {
  // Form state variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  /**
   * Handles form submission.
   * Sends a POST request to the backend to create a new donation listing.
   * Resets form fields and calls onListingCreated on success.
   *
   * @param {Object} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      api.post('donations', {
        title,
        quantity,
        location: {
          address,
          lat: parseFloat(
            JSON.parse(localStorage.getItem('user')).location.lat
          ),
          lng: parseFloat(
            JSON.parse(localStorage.getItem('user')).location.lng
          ),
        },
        expiryDate,
      });
      // Reset form fields
      setTitle('');
      setQuantity('');
      setAddress('');
      setExpiryDate('');
      // Notify parent component
      onListingCreated();
      setIsSubmitting(false);
    } catch (err) {
      // Log error to console
      console.log(err);
    }
  };

  return (
    <div className='p-4 md:p-6 bg-gray-50'>
      {/* Back button */}
      <button
        onClick={onCancel}
        className='flex items-center text-gray-600 hover:text-gray-900 mb-4 font-semibold'
      >
        <IoArrowBack /> Back to Dashboard
      </button>
      <div className='bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>
          Create New Food Listing
        </h2>
        {/* Donation form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Food Description
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder='e.g., 5 loaves of sourdough bread'
              className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500'
            />
          </div>
          <div>
            <label
              htmlFor='quantity'
              className='block text-sm font-medium text-gray-700'
            >
              Quantity
            </label>
            <input
              type='text'
              name='quantity'
              id='quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              placeholder='e.g., Approx. 3 kg, Feeds 4-5 people'
              className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500'
            />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='expiryDate'
                className='block text-sm font-medium text-gray-700'
              >
                Expiry Date
              </label>
              <input
                type='date'
                name='expiryDate'
                id='expiryDate'
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Address
              </label>
              <input
                type='text'
                name='address'
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500'
              />
            </div>
          </div>
          {/* Form action buttons */}
          <div className='flex justify-end pt-4'>
            <button
              type='button'
              onClick={onCancel}
              className='bg-gray-200 text-gray-800 py-2 px-6 rounded-lg mr-4 hover:bg-gray-300 transition duration-300'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-md disabled:bg-green-300'
            >
              {isSubmitting ? 'Submitting...' : 'Submit Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorForm;
