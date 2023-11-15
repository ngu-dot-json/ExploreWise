import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
import Schedule from '../../components/TLScheduler'
import Image from 'next/image'
import background from "/public/test.png"

const inter = Inter({ subsets: ['latin'] })

// const styles = {
//   heading:{
//     marginTop: "120px", //Shifting the heading down so it is not covered by the navigation bar
//   }
// }

export default function Home() {
  return (
    <>
    <div>
      <Navbar />  
      <h1>MAP VIEW</h1>
      <br/>
    </div>

    {/* background image container */}
    <main className="flex flex-col items-center justify-between">
      <div className='relative w-full'>
        <div className='absolute -z-10 w-full'>
          <Image src={background} alt="background image" className="w-full" width={1000}/>
        </div>
        <div>
        <heading className='text-align: center'>

        <h2 className="ewHeading">Welcome To:</h2>
        <h1 className="ewEW">ExploreWise</h1>
        <h3 className='ewText'>Your Modern Travel Planning Platform.</h3>
    </heading>


          
        </div>
      </div>
    </main>


    </>
  )
}
