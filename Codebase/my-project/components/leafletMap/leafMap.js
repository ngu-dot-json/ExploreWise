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

  const bloo = new LeafIcon({
    iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    }),
    blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0077C0&chf=a,s,ee00FFFF"
    }),
    redIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|E74C3C&chf=a,s,ee00FFFF"
    })    
    
    
    ;

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

            <Marker position={[51.0457, -114.0617]} icon={blueIcon}>
              <Popup>
                <h5><b>Wine Tasting Convention</b></h5>   
                <h6>136 8 Ave SE</h6>
                <h7>Dec 14 2023, 11:00 to 18:45</h7><br/>
                <p>Its a wine tasting event, but really big and full of people who taste wine and all that jazz or whatever. I don't really even like wine, its bitter and not that good, but there do exist people who enjoy wine and I won't take that away from them as that is an essential part of some people's diets or something im not sure what else to write to fill this ins!</p>
                <p><u>More Event Info</u></p>
              </Popup>
            </Marker>

            <Marker position={[51.0784, -114.1347]} icon={redIcon}>
              <Popup>
                <h5><b>CPSC 481 Project Demo</b></h5>   
                <h6>2500 University Dr NW</h6>
                <h7>Dec 13 2023, 16:00 to 16:45</h7><br/>
                <p>The place to demo ExploreWise!</p>
                <p><u>More Event Info</u></p>

              </Popup>
            </Marker>



        </MapContainer>
      </div>
      </>
     );
}

export default Map;