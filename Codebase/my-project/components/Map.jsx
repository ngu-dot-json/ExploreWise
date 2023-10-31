import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapContainerStyle = {
    width: '65%',
    height: '500px',
    margin: '100px 50px', // Adjust the margin as needed to move the map down
  };

  const center = {
    lat: 51.0478, // Default center (San Francisco)
    lng: -114.0593,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAedGxQxDycM7pqGLGUweN_RlaTl3nUM5Q">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
        {/* You can add more markers or other map components here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
