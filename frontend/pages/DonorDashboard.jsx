import { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import DonorForm from '../components/DonorForm';
import Header from '../components/Header';
import api from '../utils/api';

/**
 * DonorDashboard Component
 *
 * Displays the dashboard for donor users, showing their donation listings and impact score.
 * Allows donors to create new donation listings, view existing ones, and cancel available listings.
 * Fetches donor-specific listings from the backend API and calculates the total meals saved.
 *
 * Features:
 * - Shows a summary of meals saved based on donated quantity.
 * - Lists all donations created by the donor, with status and claim code.
 * - Provides a form to create new donations.
 * - Allows cancellation of available listings.
 *
 * Usage:
 *   <DonorDashboard />
 */
const DonorDashboard = () => {
  // State for showing the donation creation form
  const [isCreating, setIsCreating] = useState(false);
  // State for storing donor's listings
  const [listings, setListings] = useState([]);

  /**
   * Fetches donor's listings from the backend API when the component mounts.
   * Updates the listings state with the fetched data.
   */
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('donations/donor');
        setListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  });

  // Alias for listings array
  const donorListings = listings;

  /**
   * Calculates the total number of meals saved from all donations.
   * Assumes 1 meal = 500g. Extracts numeric value from quantity string.
   */
  const mealsSaved = donorListings.reduce((acc, curr) => {
    const qtyMatch = curr.quantity.match(/(\d+(\.\d+)?)/);
    const qty = qtyMatch ? parseFloat(qtyMatch[0]) : 1;
    return acc + qty / 0.5; // 1 meal = 500g
  }, 0);

  /**
   * Handles successful creation of a new listing.
   * Closes the creation form.
   */
  const handleListingCreated = () => {
    setIsCreating(false);
  };

  /**
   * Cancels an available listing by sending a delete request to the backend.
   * @param {string} listingId - The ID of the listing to cancel.
   */
  const handleCancelListing = async (listingId) => {
    try {
      api.delete(`donations/${listingId}/delete`);
    } catch (error) {
      console.log(error);
    }
  };

  // Render the donor form if creating a new listing
  if (isCreating) {
    return (
      <DonorForm
        onListingCreated={handleListingCreated}
        onCancel={() => setIsCreating(false)}
      />
    );
  }

  // Main dashboard view
  return (
    <>
      <Header />
      <div className='p-4 md:p-6 bg-gray-50'>
        <div className='max-w-4xl mx-auto'>
          {/* Impact summary */}
          <div className='bg-green-600 text-white p-8 rounded-xl shadow-lg mb-8 text-center'>
            <h3 className='text-lg font-semibold'>Your Impact</h3>
            <p className='text-5xl font-bold my-2'>{Math.floor(mealsSaved)}</p>
            <p>Meals Saved From Waste!</p>
          </div>

          {/* Listings header and new donation button */}
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>Your Listings</h2>
            <button
              onClick={() => setIsCreating(true)}
              className='flex items-center bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md'
            >
              <FiPlusCircle className='mr-2' /> New Donation
            </button>
          </div>

          {/* Listings list */}
          <div className='bg-white p-4 rounded-xl shadow-lg'>
            <div className='space-y-4'>
              {donorListings.length > 0 ? (
                donorListings.map((listing) => (
                  <div
                    key={listing._id}
                    className='p-4 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'
                  >
                    <div>
                      <p className='font-semibold text-gray-800'>
                        {listing.title}
                      </p>
                      <div className='text-sm text-gray-600 mt-1'>
                        Claim code: {listing.claimCode}
                      </div>
                    </div>
                    <div className='flex items-center gap-4 ml-auto'>
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          listing.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : listing.status === 'claimed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {listing.status.charAt(0).toUpperCase() +
                          listing.status.slice(1)}
                      </span>
                      {listing.status === 'available' && (
                        <button
                          onClick={() => handleCancelListing(listing._id)}
                          className='text-sm text-red-500 hover:underline'
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-center text-gray-500 py-8'>
                  You have no active listings.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorDashboard;
