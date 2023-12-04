import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
import React from "react";
const inter = Inter({ subsets: ['latin'] })
import Image from 'next/image'
import backgrounder from "/public/test.png"
import Gantt from '../../components/gantt-maxsize'
import TwoButtons from "../../components/TwoButtons"

function itinerary(){
  return (
    <>
    <div>
      <Navbar />  
      <br/>
    </div>

    {/* background image container */}
    <main className="items-center justify-between">
      <div className='relative w-full'>
        <div className='absolute -z-10 mt-[-25px] w-full h-full'>
        <Image className="bImg" src={backgrounder} alt="background image" width={1000} height={1000}/>
        </div>
        <div className='gantt-center'>
          <Gantt />
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <TwoButtons />
      </div>
    </main>
    </>
  );







  
}
export default itinerary;
