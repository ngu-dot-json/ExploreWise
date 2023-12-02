import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const mapContainerStyle = {
    width: '60%',
    height: '400px',
    margin: '60px 50px', // Adjust the margin as needed to move the map down
  };

  const center = {
    lat: 51.0478, // Default center (San Francisco)
    lng: -114.0593,
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10.3}
      >
        <Marker position={center} />
        {/* You can add more markers or other map components here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

