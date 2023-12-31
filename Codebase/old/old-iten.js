import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '../my-project/components/Navbar'
import React from "react";
const inter = Inter({ subsets: ['latin'] })
import Map from '../my-project/components/Map';
import Schedule from '../my-project/components/TLScheduler'
import Image from 'next/image'
import backgrounder from "/public/test.png"

function Itinerary(){
  return (
    <>
    <div>
      <Navbar />  
      <br/>
    </div>

    {/* background image container */}
    <main className="flex flex-col items-center justify-between">
      <div className='relative w-full'>
        <div className='absolute -z-10 mt-[-25px] w-full h-full'>
        <Image className="bImg" src={backgrounder} alt="background image" width={1000} height={1000}/>
        </div>
        <div>
          <Map/>
          <Schedule/>
        </div>
      </div>
    </main>
    </>
  );
}



// function Mapview() {
//   return (
//     <>

//       <div>
//         <Navbar />  
//       </div>
//       <div id="root">
//         <Map/>
//         <Schedule/>
//       </div>
    
//     </>
//   );
// }





// function Mapview() {
//   return (

//     <div>
//       <Navbar />  
//       <h1>MAP VIEW</h1>
//       <Map
//     />

//   <div id="root"></div>
//       <Schedule
// />
//     </div>
//   );
// }

export default Itinerary;
