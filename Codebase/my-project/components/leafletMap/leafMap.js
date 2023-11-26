// Import necessary modules
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Create a functional component
const MyMap = () => {
  // Set up the map center and zoom
  const center = [51.0478, -114.0593];
  const zoom = 10;

  return (
    // Render the map container with tile layer, marker, and popup
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
