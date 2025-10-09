import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

/**
 * ListingsMap Component
 *
 * Renders an interactive map using react-leaflet, displaying markers for each donation listing.
 * Centers the map on the current user's location.
 * Each marker represents a donation listing and shows details in a popup.
 * Clicking a marker triggers the onMarkerClick callback with the listing data.
 *
 * Props:
 * - listings: Array of donation listing objects to display as markers.
 * - onMarkerClick: Function called when a marker is clicked, receives the listing object.
 *
 * Usage:
 *   <ListingsMap listings={availableListings} onMarkerClick={handleMarkerClick} />
 */
const ListingsMap = ({ listings, onMarkerClick = () => {} }) => {
  // Get user's location from localStorage
  const { lat, lng } = JSON.parse(localStorage.getItem('user')).location;
  // Store latitude and longitude in state
  const [latitude] = useState(lat);
  const [longitude] = useState(lng);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={12}
      scrollWheelZoom={true}
      className='h-full w-full rounded-lg shadow-md'
    >
      {/* OpenStreetMap tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {/* Render a marker for each listing */}
      {listings.map((listing) => (
        <Marker
          key={listing._id}
          position={[listing.location.lat, listing.location.lng]}
          eventHandlers={{
            click: () => onMarkerClick(listing),
          }}
        >
          {/* Popup with listing details */}
          <Popup>
            <div>
              <h3 className='font-bold'>{listing.title}</h3>
              <p>{listing.description}</p>
              <p className='text-sm text-gray-600'>
                Donor: {listing.donor.name}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ListingsMap;
