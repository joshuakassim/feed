import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import Modal from './Modal';
import api from '../utils/api';

/**
 * ListingDetails Component
 *
 * Displays detailed information about a selected donation listing.
 * Allows the user to claim the donation, showing a confirmation modal and a claim code upon success.
 * Handles claim requests to the backend and displays toast notifications for errors.
 *
 * Props:
 * - listing: Object containing details of the donation listing to display.
 * - onBack: Function to call when the user wants to return to the listings view.
 */
const ListingDetails = ({ listing, onBack }) => {
  // State to control claim modal visibility
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  // State to track if claim was confirmed
  const [isConfirmed, setIsConfirmed] = useState(false);

  /**
   * Handles the claim action for the donation listing.
   * Sends a PUT request to the backend to claim the donation.
   * Closes the modal and sets confirmation state on success.
   * Displays a toast notification on error.
   */
  const handleClaim = async () => {
    try {
      await api.put(`donations/${listing._id}/claim`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setIsClaimModalOpen(false);
    setIsConfirmed(true);
  };

  // If claim is confirmed, show claim code and pickup details
  if (isConfirmed) {
    return (
      <div className='p-4 md:p-8 max-w-2xl mx-auto text-center'>
        <div className='bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg text-left shadow-md'>
          <h2 className='text-2xl font-bold mb-4'>Claim Confirmed!</h2>
          <p className='mb-2'>Your claim code is:</p>
          <p className='text-4xl font-mono font-bold bg-white p-4 rounded-lg text-center tracking-widest my-4'>
            {listing.claimCode}
          </p>
          <p className='mb-2'>
            <strong>Item: </strong> {listing.title}
          </p>
          <p className='mb-2'>
            <strong>Pickup at: </strong>
            {listing.location.address}
          </p>
          <p className='mt-4 text-sm'>Please show your claim code at pickup.</p>
        </div>
        <button
          onClick={onBack}
          className='mt-8 bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition duration-300'
        >
          Back to Listings
        </button>
      </div>
    );
  }

  // Main details view for the listing
  return (
    <div className='p-4 md:p-6 bg-gray-50'>
      {/* Back button */}
      <button
        onClick={onBack}
        className='flex items-center text-gray-600 hover:text-gray-900 mb-4 font-semibold'
      >
        <IoArrowBack className='mr-2' /> Back to Listings
      </button>
      <div className='bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto'>
        <img
          src={listing.imageUrl ?? '/placeholder-food.jpg'}
          alt={listing.description}
          className='w-full h-64 object-cover'
        />
        <div className='p-6'>
          <h2 className='text-3xl font-bold text-gray-800'>
            {listing.description}
          </h2>
          <p className='text-md text-gray-600 mt-2'>
            From <span className='font-semibold'>{listing.donor.name}</span>
          </p>

          <div className='mt-6 border-t pt-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <p>
                  <span className='font-semibold'>Details:</span>{' '}
                  {listing.title}
                </p>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                  Pickup Information
                </h3>
                <div className='flex items-start mt-2'>
                  <p>{listing.location.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Claim button */}
          <div className='mt-8 text-center'>
            <button
              onClick={() => setIsClaimModalOpen(true)}
              className='w-full sm:w-auto bg-green-600 text-white py-3 px-12 rounded-lg font-bold text-lg hover:bg-green-700 transition duration-300 shadow-md'
            >
              Claim Food
            </button>
          </div>
        </div>
      </div>

      {/* Claim confirmation modal */}
      <Modal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        title='Confirm Claim'
      >
        <p className='text-gray-700 mb-6'>
          Please confirm you can pick up this item from{' '}
          <span className='font-semibold'>{listing.donor.name}</span> at{' '}
          <span className='font-semibold'>{listing.location.address}</span>.
        </p>
        <div className='flex justify-end gap-4'>
          <button
            onClick={() => setIsClaimModalOpen(false)}
            className='bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={handleClaim}
            className='bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700'
          >
            Confirm Claim
          </button>
        </div>
      </Modal>
      {/* Toast notifications container */}
      <ToastContainer pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default ListingDetails;
