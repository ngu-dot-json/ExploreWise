import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import React from "react";
const inter = Inter({ subsets: ["latin"] });
import Map from "../../components/leafletMap";
import Image from "next/image";
import backgrounder from "/public/test.png";
import Gantt from "../../components/gantt-calendar";
import TwoButtons from "../../components/TwoButtons";

function Mapview() {
  return (
    <>
      <div>
        <Navbar />
        <br />
      </div>

      {/* background image container */}
      <main className="flex flex-col w-full h-full gap-4">
        <div>
          <Map />
        </div>
      </main>
    </>
  );
}

export default Mapview;
