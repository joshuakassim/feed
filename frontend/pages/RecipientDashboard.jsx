import { useEffect, useState } from 'react';
import api from '../utils/api';
import Header from '../components/Header';
import ListingDetails from '../components/ListingDetails';
import ListingsMap from '../components/ListingsMap';

/**
 * RecipientDashboard Component
 *
 * Displays the dashboard for recipient users, showing available food donation listings nearby.
 * Allows recipients to view details for each listing and claim donations.
 * Fetches available listings from the backend API and displays them in a list and on a map.
 *
 * Features:
 * - Lists all available donations with images, donor info, quantity, and expiry date.
 * - Allows users to view detailed information and claim a donation.
 * - Shows an interactive map with markers for each available listing.
 *
 * Usage:
 *   <RecipientDashboard />
 */
const RecipientDashboard = () => {
  // State for available donation listings
  const [availableListings, setAvailableListings] = useState([]);
  // State for viewing listing details
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  // State for the currently selected listing
  const [selectedListing, setSelectedListing] = useState(null);

  /**
   * Fetches available donation listings from the backend API when the component mounts.
   * Updates the availableListings state with the fetched data.
   */
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get('/donations');
        setAvailableListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  });

  // If viewing details, render the ListingDetails component
  if (isViewingDetails && selectedListing) {
    return (
      <ListingDetails
        listing={selectedListing}
        onBack={() => {
          setIsViewingDetails(false);
          setSelectedListing(null);
        }}
      />
    );
  }

  // Main dashboard view
  return (
    <>
      <Header />
      <div className='flex flex-col md:flex-row h-[calc(100vh-64px)]'>
        {/* Listings sidebar */}
        <div className='flex-shrink-0 md:h-full md:w-2/5 bg-white p-4 overflow-y-auto'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>
            Available Nearby
          </h2>
          <div className='space-y-3'>
            {availableListings.length > 0 ? (
              availableListings.map((listing) => (
                <div
                  onClick={() => {
                    setIsViewingDetails(true);
                    setSelectedListing(listing);
                  }}
                  key={listing._id}
                  className='p-4 border rounded-lg'
                >
                  <div className='flex gap-4'>
                    <img
                      src={listing.imageUrl}
                      alt={listing.title}
                      className='w-20 h-20 object-cover rounded-md flex-shrink-0 bg-gray-200'
                    />
                    <div>
                      <p className='font-semibold text-gray-800'>
                        {listing.title}
                      </p>
                      <p className='text-sm text-gray-600'>
                        {listing.donor.name}
                      </p>
                      <p className='text-sm text-gray-500 mt-1'>
                        {listing.quantity}
                      </p>
                      <div className='text-xs font-semibold text-green-700 mt-2'>
                        Expires:{' '}
                        {listing.expiryDate
                          ? new Date(listing.expiryDate).toLocaleDateString()
                          : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-gray-500 py-8'>
                No available food donations right now. Please check back later.
              </p>
            )}
          </div>
        </div>
        {/* Map area */}
        <div className='flex-grow md:h-full md:w-3/5'>
          <ListingsMap listings={availableListings} />
        </div>
      </div>
    </>
  );
};

export default RecipientDashboard;
