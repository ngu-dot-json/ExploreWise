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

// function LocationMarker({ lat, lng }) {
//   const [position, setPosition] = useState(null);
//   const [bbox, setBbox] = useState([]);
//   const map = useMap();

//   useEffect(() => {
//     map.flyTo([lat, lng], map.getZoom());
//   }, [lat]);

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

// BLUE: 0077C0
// RED: E74C3C
// PINK: DA3C78
// PURPLE: 7E349D
// TEAL: 07ABA0
// GREEN: 0EAC51
// ORANGE: F1892D


function Map() {

    //  Create the Icon
    const LeafIcon = L.Icon.extend({
      options: {}
    });

  const blueIcon = new LeafIcon({
    iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    }),
    greenIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0077C0&chf=a,s,ee00FFFF"
    });

    //  Use the state hook:
  const [icon, setIcon] = useState(blueIcon);

    // This function will change the state's icon:

  const changeIconColor = (icon) => {
    if (icon.options.iconUrl === greenIcon.options.iconUrl) {
      setIcon((current) => (current = blueIcon));
    } else {
      setIcon((current) => (current = greenIcon));
    }
  };

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

            {/* <Marker position={[51.0447, -114.0719]}>
              <Popup>
                Wow Words!
              </Popup>
            </Marker> */}

            <Marker position={[51.0447, -114.0719]} icon={greenIcon}>
              <Popup>
                <h3>WOW BIG WORDS</h3>
                <button onClick={() => changeIconColor(icon)}>
                  Change Marker Color
                </button>
              </Popup>
            </Marker>


            <Marker position={[51.1457, -114.0719]}>
              <Popup>
                Wow Words!
              </Popup>
            </Marker>

        </MapContainer>
      </div>
      </>
     );
}

export default Map;