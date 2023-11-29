import 'leaflet/dist/leaflet.css'
import style from '../../src/styles/Home.module.css'
import { MapContainer, TileLayer } from 'react-leaflet'

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import {
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useMemo } from "react";

function LocationMarker({ lat, lng }) {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], map.getZoom());
  }, [lat]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}


function Map() {
    return (
      <>


      <div className="leaflet">
        <MapContainer className={style.map} center={[51.0447, -114.0719]} zoom={10.4} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="http://127.0.0.1:8000/tiles/{z}/{x}/{y}.png"
            />
            <LocationMarker lat={51.0447} lng={-114.0719} />
        </MapContainer>
      </div>
      </>
     );
}

export default Map;