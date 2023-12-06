import Head from 'next/head'
import Image from 'next/image'
import backgrounder from "/public/test.png"


import sstyle from '../../src/styles/singin.module.css'

export default function Home() {
  return (
          
    <>
      <Head>
        <title>ExploreWise: Forgot Password</title>
      </Head>
          
      <div className='absolute -z-10 mt-[-25px] w-full h-full'>
        <Image className="bImg" src={backgrounder} alt="background image" width={1000} height={1000}/>
      </div>

        <div className={sstyle.body}>
          <div className={sstyle.container}>
            <div className={sstyle.box}>
              <div className={sstyle.title}>
                <h1>Account Recovery</h1>
              </div>
              <div className={sstyle.text}>
                <p>Enter the username associated with your account. If there is an account with that username, you will receieve an email to recover your account</p>
              </div>
              <div className={sstyle.textbox}>
                <input type="text" required="required" />
                <span>Username</span>
              </div>
              <div className={sstyle.Btn}>
                <a href="#">Send Recovery Email</a>
              </div>
              <div className={sstyle.rembLogin}>
                <p>Remember your password? <a href="signin">Login</a></p>
                <h1 className={sstyle.ree}><a href="/">Return to Main Menu</a></h1>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}