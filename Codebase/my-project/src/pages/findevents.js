import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
import React from "react";
import styles from '../styles/mapview.module.css'
const inter = Inter({ subsets: ['latin'] })

import Schedule from '../../components/TLScheduler'

function Mapview() {
  return (

    <div>
      <Navbar />  
      <h1>FIND EVENTS</h1>
    
      <div id="root" className="py-80"></div>
      <Schedule
      />




    </div>
  );
}

export default Mapview;
