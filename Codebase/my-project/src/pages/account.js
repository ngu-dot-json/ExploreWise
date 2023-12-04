import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import backgrounder from "/public/test.png"
import { useState } from 'react';

import sstyles from '../../src/styles/account.module.css'

export default function Home() {


const [profilePicSrc, setProfilePicSrc] = useState("/test.png");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProfilePicSrc(URL.createObjectURL(file));
      }
    };

  return (
          
    <>
          <Head>
            <title>Create Next App</title>

          </Head>
          
          <div className='absolute -z-10 mt-[-25px] w-full h-full'>
        <Image className="bImg" src={backgrounder} alt="background image" width={1000} height={1000}/>
        </div>
        {/*--------------------NavBar--------------------*/}
        <div>
          <Navbar/>  
          <br/>
        </div>

        
        {/*---------------------HTML---------------------*/}
        
        <div className={sstyles.body}>
          <div className={sstyles.container}>
            <div className={sstyles.row}>

              <div className={sstyles['left-column']}>
                <div className={sstyles.user}>
                  <h2>John Smith</h2>
                </div>
                <div className={sstyles['profile-pic']}>
                  
                  <Image src={profilePicSrc} alt="Profile Picture" width={300} height={300} id="pfp" />
                  <label htmlFor="input-file">Upload Profile Picture</label>
                  <input type="file" accept="image/jpg, image/jpeg, image/png" id="input-file" onChange={handleFileChange}/>

                  <div className={sstyles["sign-out-btn"]}>
                    <a href="/">Sign Out</a>
                  </div>
                </div>
              </div>

              <div className={sstyles["right-column"]}>
                <div className={sstyles["wlcm-msg"]}>
                  <h1>Welcome to your profile page!</h1>
                </div>
                <div className={sstyles.row}>
                  <div className={sstyles['change-email']}>
                    <h2><u>Change Email</u></h2>
                    <div className={sstyles.current}>
                      <input type="text" required="required" />
                      <span>Current email</span>
                    </div>
                    <div className={sstyles.new}>
                      <input type="text" required="required" />
                      <span>New email</span>
                    </div>
                    <div className={sstyles.button}>
                      <p>Send Verification Email</p>
                    </div>
                  </div>

                  <div className={sstyles['change-username']}>
                    <h2><u>Change Username</u></h2>
                    <div className={sstyles.current}>
                      <input type="text" required="required" />
                      <span>Current username</span>
                    </div>
                    <div className={sstyles.new}>
                      <input type="text" required="required" />
                      <span>New username</span>
                    </div>
                    <div className={sstyles.button}>
                      <p>Change Username</p>
                    </div>
                  </div>
                </div>

                <div className={sstyles['change-password']}>
                    <h2><u>Change password</u></h2>
                    <div className={sstyles.row}>
                      <div className={sstyles.current}>
                      <input type="text" required="required" />
                      <span>Current password</span>
                      </div>
                      <div className={sstyles.rightBtn}>
                        <div className={sstyles.button}>
                      <p>Change password</p>
                      </div>
                      </div>
                    </div>
                    
                    <div className={sstyles.new}>
                      <input type="text" required="required" />
                      <span>New password</span>
                    </div>
                    
                  </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
