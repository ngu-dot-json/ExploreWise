import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
import React from "react";
import styles from '../styles/mapview.module.css'
const inter = Inter({ subsets: ['latin'] })
import Map from '../../components/Map';
import Schedule from '../../components/TLScheduler'


function Mapview() {
  return (

    <div>
      <Navbar />  
      <h1>MAP VIEW</h1>
      <Map
      />


<div id="root"></div>
      <Schedule
      />


    </div>


  );
}

export default Mapview;
