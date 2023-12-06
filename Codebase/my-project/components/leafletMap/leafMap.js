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

function Map() {

    //  Create the Icon
    const LeafIcon = L.Icon.extend({
      options: {}
    });

  const bloo = new LeafIcon({
    iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
    }),
    ic0 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|E74C3C&chf=a,s,ee00FFFF"
    }),
    ic1 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|DA3C78&chf=a,s,ee00FFFF"
    }),
    ic2 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|7E349D&chf=a,s,ee00FFFF"
    }),
    ic3 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0077C0&chf=a,s,ee00FFFF"
    }),
    ic4 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|07ABA0&chf=a,s,ee00FFFF"
    }),
    ic5 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0EAC51&chf=a,s,ee00FFFF"
    }),
    ic6 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F1892D&chf=a,s,ee00FFFF"
    }),  
    ic7 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|E74C3C&chf=a,s,ee00FFFF"
    }),  
    ic8 = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|9b7874&chf=a,s,ee00FFFF"
    }),
    icbm = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|808080&chf=a,s,ee00FFFF"
    })
    ;

    //  Use the state hook:
  const [icon, setIcon] = useState(ic0);

    // This function will change the state's icon:

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

            <Marker position={[51.0491277981509, -113.82159291613183]} icon={icbm}>
              <Popup>
                <h5><b>Night of Flamenco</b></h5>   
                <h6>Anniversary Park, Chestermere, AB</h6>
                <h7>Nov 04 2023, 21:00 to 23:00</h7><br/>
                <p>Experience the explosive mix of sound, movement and emotion that is flamenco.</p>
                <a href="events" className="text-blue-600"><u>More Event Info</u></a>
              </Popup>
            </Marker>

            <Marker position={[51.04558, -114.06127]} icon={ic1}>
              <Popup>
                <h5><b>Otafest(Late) 2023</b></h5>   
                <h6>Telus Convention Centre, Calgary, AB</h6>
                <h7>Nov 04 2023, 09:00 to 13:00</h7><br/>
                <p>Calgary’s Japanese pop culture festival. Shop. Cosplay. Games. Anime. Join a community and meet your favorite stars!</p>
                <a href="events" className="text-blue-600"><u>More Event Info</u></a>
              </Popup>
            </Marker>

            <Marker position={[51.132239, -114.083964]} icon={ic2}>
              <Popup>
                <h5><b>THAT PARTY LAST NIGHT VOL. 6</b></h5>   
                <h6>StoryBook Theatre, Calgary, AB</h6>
                <h7>Nov 04 2023, 15:00 to 18:00</h7><br/>
                <p>THAT PARTY LAST NIGHT VOL. 6 That Party Last Night is an ongoing music showcase series that aims to highlight exciting talent in Canada.</p>
                <a href="events" className="text-blue-600"><u>More Event Info</u></a>
              </Popup>
            </Marker>

            <Marker position={[51.064462, -114.088638]} icon={ic3}>
              <Popup>
                <h5><b>Wine Tasting Fest</b></h5>   
                <h6>SAIT Way NW, Calgary, AB</h6>
                <h7>Nov 04 2023, 12:00 to 13:00</h7><br/>
                <p>Savor a refined experience at our wine tasting event, exploring exquisite flavors and aromas in an elegant setting guided by expert sommeliers.",</p>
                <a href="events" className="text-blue-600"><u>More Event Info</u></a>
              </Popup>
            </Marker>

            <Marker position={[51.0447, -114.0719]} icon={ic4}>
              <Popup>
                <h5><b>Beer Fest!</b></h5>   
                <h6>TD Core Shopping Centre, Calgary, AB</h6>
                <h7>Nov 03 2023, 05:40 to 07:20</h7><br/>
                <p>Savor a refined experience at our beer tasting event, exploring exquisite flavors and aromas in an elegant setting guided by expert sommeliers.",</p>
                <p className="text-blue-600"><u>More Event Info</u></p>
              </Popup>
            </Marker>

            <Marker position={[51.087053, -114.173482]} icon={ic5}>
              <Popup>
                <h5><b>Build Your Snowman!</b></h5>   
                <h6>Bowmont Park, Calgary, AB</h6>
                <h7>Nov 08 2023, 15:00 to 18:00</h7><br/>
                <p>Craft your coolest snow buddy at our winter special event – come create and play in a snowy escape</p>
                <a href="events" className="text-blue-600"><u>More Event Info</u></a>
              </Popup>
            </Marker>

            <Marker position={[50.953037, -114.065156]} icon={ic6}>
              <Popup>
                <h5><b>Taylor Swift Dance Night</b></h5>   
                <h6>100 Anderson Rd SE</h6>
                <h7>Nov 08 2023, 20:00 to 23:00</h7><br/>
                <p>Calling all the Swifties to this mesmerizing night of music and delights!</p>
                <a href="events" className="text-blue-600"><u>More Event Info</u></a>
              </Popup>
            </Marker>





        </MapContainer>
      </div>
      </>
     );
}

export default Map;