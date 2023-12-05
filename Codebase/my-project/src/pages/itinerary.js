import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import React from "react";
const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";
import backgrounder from "/public/test.png";
import Gantt from "../../components/gantt-maxsize";
import TwoButtons from "../../components/TwoButtons";

function itinerary() {
  return (
    <>
      <div>
        <Navbar />
        <br />
      </div>

      {/* background image container */}
      <main className="flex flex-col w-full h-full gap-4">
        <div className="gantt-center">
          <Gantt />
        </div>
      </main>
    </>
  );
}
export default itinerary;
