import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import React, { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import Map from "../../components/leafletMap";
import Image from "next/image";
import Gantt from "../../components/gantt-calendar";
import styles from "../styles/account.module.css";

function Mapview() {
  const [popup, setPopup] = useState(null);

  return (
    <>
      <Head>
        <title>ExploreWise: Map View</title>
      </Head>
      <div>
        <Navbar />
        <br />
      </div>

      {/* background image container */}
      <main className="flex flex-col w-full h-full gap-4">
        <div>
          {popup !== null && (
            <div className="bg-white shadow-md p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] text-black ">
              <p className="font-bold">{popup.title}</p>
              <p>{popup.message}</p>
              <div className="flex gap-4 w-full">
                <button
                  className="flex relative justify-between px-4 appearance-none items-center group bg-white border-2 border-orange-500  hover:border-orange-700 text-black font-bold w-full py-2 rounded"
                  onClick={() => popup.cancel?.()}
                >
                  {popup.cancelText ?? "Cancel"}
                </button>
                <button
                  className="flex relative justify-between px-4 appearance-none items-center group bg-orange-500 hover:bg-orange-700 text-white font-bold w-full py-2 rounded"
                  onClick={() => popup.confirm?.()}
                >
                  {popup.confirmText ?? "Confirm"}
                </button>
              </div>
            </div>
          )}
          <h1 className="mt-[60px] ml-20 text-bold text-center text-sm">
            Simply click and drag the map to interact! To view event info,
            simply click on the marker for more information!
          </h1>
          <Map />
          <h1 className="ml-20 text-sm text-center text-gray-400 ">
            Colored markers are events already in the itinerary, color matched
            for ease of use!
          </h1>
        </div>
        <Gantt setPopup={(p) => setPopup(p)} />
      </main>
      <br />
      <br />
      <hr class="h-px my-8 bg-black border-0 dark:bg-gray-700" />
      <div class={styles.container}>
        <div class={styles.rowE}>
          <div class={styles.leftC}>
            <h1 class={styles.subT}>Support</h1>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>FAQ</p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div class={styles.rightC}>
            <h1 class="sub-title">Terms and settings</h1>
            <p>Privacy Settings</p>
            <p>Mailing List</p>
            <p>Terms and Conditions</p>
          </div>
        </div>
      </div>
      <br />
      <p className="text-center text-gray-500 font-xs">ExploreWise (c) 2023</p>
    </>
  );
}

export default Mapview;
