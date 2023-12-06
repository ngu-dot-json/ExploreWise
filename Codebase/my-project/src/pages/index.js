import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
import Schedule from '../../components/old/TLScheduler'
import Image from 'next/image'
import background from "/public/test2.png"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <title>ExploreWise</title>
    </Head>

    {/* background image container */}
    <main className="flex flex-col items-center justify-between">
      <div className='relative w-full'>
        <div className='absolute -z-10 mt-[-25px] w-full h-full'>
          <Image className="bImg" src={background} alt="background image" width={1000} height={1000}/>
        </div>
        <div>
          <heading className='text-align: center'>
            <h2 className="ewHeading">Welcome To:</h2>
            <h1 className="ewEW">ExploreWise</h1>
            <h3 className='ewText'>Your Modern Travel Planning Platform.</h3>
            <br/>
            <h3 className='ewText2'>Please Sign In or Register to get started.</h3>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            <div className="daButton">
              <button className="daButton2">
                <a className="buttonRight" href="signin">Sign in</a>
              </button>

              <button>
                <a className="buttonRight" href="register">Register</a>
              </button>
            </div>

            <br/><br/><br/>
            
            <h3 className='ewLM'>scroll down to learn more</h3>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h2 className='ewInfo'>ExploreWise is a CPSC 481 Project</h2>
            <h2 className='ewInfo2'>Developed to provide a User Intuitive, Front-End Driven</h2>
            <h2 className='ewInfo2'>Travel Platform for the City of Calgary and Area.</h2>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            <h2 className='ewInfo'>ExploreWise is created by:</h2><br/>
            <h2 className='ewInfo2'>Jeongah Lee (30137463) - jeongah.lee@ucalgary.ca</h2>
            <h2 className='ewInfo2'>Jason Ngu (30145770) - jason.ngu1@ucalgary.ca</h2>
            <h2 className='ewInfo2'>Anmol Rana (30159019) - anmol.rana@ucalgary.ca</h2>
            <h2 className='ewInfo2'>Mahira Zabin (30150211) - mahira.zabin1@ucalgary.ca</h2>

            <br/><br/><br/><br/><br/><br/><br/>

            <h2 className='ewInfo'>Libraries and Tools Used for the Project Are:</h2><br/>
            <h2 className='ewInfo3'>NextJS 14.0.0</h2>
            <h2 className='ewInfo3'>ReactJS 18</h2>
            <h2 className='ewInfo3'>Leaflet 1.9.4</h2>
            <h2 className='ewInfo3'>Tailwind CSS v3.3</h2>
            <h2 className='ewInfo3'>gantt-schedule-timeline-calendar by NEURONET</h2>
            <br/>
          </heading> 
        </div>
      </div>
    </main>
    </>
  )
}
