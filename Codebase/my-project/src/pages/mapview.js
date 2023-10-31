import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
import React from "react";
import styles from '../styles/mapview.module.css'
const inter = Inter({ subsets: ['latin'] })


import Map from '../../components/Map';

function Mapview() {
  return (

    <div>
      <Navbar />  
      <h1>MAP VIEW</h1>
      <Map
        center={{ lat: 37.7749, lng: -122.4194 }} // Default map center
        zoom={13} // Default zoom level
      />
    </div>
  );
}

export default Mapview;
