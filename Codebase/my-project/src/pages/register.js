import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import backgrounder from "/public/test.png"

import sstyle from '../../src/styles/singin.module.css'
import styles from "../styles/account.module.css"


function togglePasswordVisibility() {
  let password = document.querySelector(`.${sstyle.RTBpassword} input`);

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}


export default function Home() {
  return (
          
    <>
          <Head>
            <title>ExploreWise: Register</title>
          </Head>
          
          <div className='absolute -z-10 mt-[-25px] w-full h-full'>
        <Image className="bImg" src={backgrounder} alt="background image" width={1000} height={1000}/>
        </div>
        {/*--------------------NavBar--------------------*/}

        {/*---------------------HTML---------------------*/}
        <div className={sstyle.body}>
          <div className={sstyle.container}>
            <div className={sstyle.box}>
              <div className={sstyle.login}>
                <h1>Register</h1>
              </div>
              <div className={sstyle.RTB}>
                <input type="text" required="required" />
                <span>Username</span>
              </div>
              <div className={sstyle.RTB}>
                <input type="text" required="required" />
                <span>Email</span>
              </div>
              <div className={sstyle.RTBpassword}>
                <input type="password" required="required" />
                <span>Password</span>
                <Image className={sstyle.pwImg} src="/eyeClose.png" width={1000} height={1000} onClick={togglePasswordVisibility}/>
              </div>
              <div className={sstyle.Btn}>
                <a href="events">Sign Up</a>
              </div>
              <div className={sstyle.Register}>
                <p>Already have an account? <a href="signin">Login</a></p>
                <h1 className={sstyle.ree}><a href="/">Return to Main Menu</a></h1>
              </div>
            </div>
          </div>
        </div>
        <div class={styles.container}>
            <div class={styles.rowE}>
                <div class={styles.leftC}>
                    <h1 class={styles.subT}>Support</h1>
                      <p>Contact us</p>
                      <p>FAQ</p>

                </div>
                <div class={styles.rightC}>
                  <h1 class="sub-title">Terms and settings</h1>
                      <p>Privacy Settings</p>
                      <p>Terms and Conditions</p>
                </div>
            </div>
        </div>
    </>
  )
}
