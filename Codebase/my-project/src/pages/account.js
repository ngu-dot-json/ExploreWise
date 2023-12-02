import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import backgrounder from "/public/test.png"
import { useState } from 'react';

import styles from '../styles/Home.module.css'
import additionalStyles from '../../src/styles/account.module.css'
// Codebase\my-project\src\styles\account.module.css

export default function Home() {
{/*
useEffect(() => {
  const image_input = document.querySelector("#input-file");
  var uploaded_image = "";
  const pfpElement = document.querySelector("#pfp");
  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      pfpElement.src = uploaded_image;
    });
    reader.readAsDataURL(this.files[0]);
  });
}, []);*/}

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
        
        <div className={additionalStyles.body}>
          <div className={additionalStyles.container}>
            <div className={additionalStyles.row}>

              <div className={additionalStyles['left-column']}>
                <div className={additionalStyles['profile-pic']}>
                  <Image src={profilePicSrc} alt="Profile Picture" width={300} height={300} id="pfp" />
                  <label htmlFor="input-file">Upload Profile Picture</label>
                  <input type="file" accept="image/jpg, image/jpeg, image/png" id="input-file" onChange={handleFileChange}/>

                  <div className={additionalStyles["sign-out-btn"]}>
                    <h2>Sign Out</h2>
                  </div>
                </div>
              </div>

              <div className={additionalStyles["right-column"]}>
                <div className={additionalStyles["wlcm-msg"]}>
                  <h2><u>Welcome to your profile page!</u></h2>
                </div>
                <div className={additionalStyles.row}>
                  <div className={additionalStyles['change-email']}>
                    <h2><u>Change Email</u></h2>
                    <div className={additionalStyles.current}>
                      <input type="text" required="required" />
                      <span>Current email</span>
                    </div>
                    <div className={additionalStyles.new}>
                      <input type="text" required="required" />
                      <span>New email</span>
                    </div>
                    <div className={additionalStyles.button}>
                      <p>Send Verification Email</p>
                    </div>
                  </div>

                  <div className={additionalStyles['change-username']}>
                    <h2><u>Change Username</u></h2>
                    <div className={additionalStyles.current}>
                      <input type="text" required="required" />
                      <span>Current username</span>
                    </div>
                    <div className={additionalStyles.new}>
                      <input type="text" required="required" />
                      <span>New username</span>
                    </div>
                    <div className={additionalStyles.button}>
                      <p>Change Username</p>
                    </div>
                  </div>
                </div>

                <div className={additionalStyles['change-password']}>
                    <h2><u>Change password</u></h2>
                    <div className={additionalStyles.current}>
                      <input type="text" required="required" />
                      <span>Current password</span>
                    </div>
                    <div className={additionalStyles.new}>
                      <input type="text" required="required" />
                      <span>New password</span>
                    </div>
                    <div className={additionalStyles.button}>
                      <p>Change password</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
   
        </div>
    </>

      < Map />
      {/* <main className={styles.main}>
        <Map />
      </main> */}
    </div>
  )
}