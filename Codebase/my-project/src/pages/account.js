import Head from "next/head";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import backgrounder from "/public/test.png";
import { useState } from "react";
import styles from "../styles/account.module.css";

import sstyles from "../../src/styles/account.module.css";

function togglePasswordVisibilityCurr() {
  let password = document.querySelector(`.${sstyles.currPW} input`);

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}
function togglePasswordVisibilityNew() {
  let password = document.querySelector(`.${sstyles.newPW} input`);

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

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
        <title>ExploreWise: My Account</title>
      </Head>

      {/* <div className="absolute -z-10 mt-[-25px] w-full h-full">
        <Image
          className="bImg"
          src={backgrounder}
          alt="background image"
          width={1000}
          height={1000}
        />
      </div> */}
      {/*--------------------NavBar--------------------*/}
      <div>
        <Navbar />
        <br />
      </div>

      {/*---------------------HTML---------------------*/}

      <div className={sstyles.body}>
        <div className={sstyles.container}>
          <div className={sstyles.row}>
            <div className={sstyles["left-column"]}>
              <div className={sstyles.user}>
                <h2>User: John Smith</h2>
              </div>
              <div className={sstyles["profile-pic"]}>
                <Image
                  src={profilePicSrc}
                  alt="Profile Picture"
                  width={280}
                  height={280}
                  id="pfp"
                />
                <label htmlFor="input-file">Upload Picture</label>
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  id="input-file"
                  onChange={handleFileChange}
                />

                <div className={sstyles["sign-out-btn"]}>
                  <a href="/">Sign Out</a>
                </div>
              </div>
            </div>

            <div className={sstyles["right-column"]}>
              <div className={sstyles["wlcm-msg"]}>
                <h1>Welcome John!</h1>
              </div>
              <div className={sstyles.row}>
                <div className={sstyles["change-email"]}>
                  <h2>Change Email</h2>
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

                <div className={sstyles["change-username"]}>
                  <h2>Change Username</h2>
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

              <div className={sstyles["change-password"]}>
                <h2>Change Password</h2>
                <div className={sstyles.currPW}>
                  <input type="password" required="required" />
                  <span>Current Password</span>
                  <Image
                    className={sstyles.pwImg}
                    src="/eyeClose.png"
                    width={1000}
                    height={1000}
                    onClick={togglePasswordVisibilityCurr}
                  />
                </div>

                <div className={sstyles.newPW}>
                  <input type="password" required="required" />
                  <span>New Password</span>
                  <Image
                    className={sstyles.pwImg}
                    src="/eyeClose.png"
                    width={1000}
                    height={1000}
                    onClick={togglePasswordVisibilityNew}
                  />
                </div>
                <div className={sstyles.rightBtn}>
                  <div className={sstyles.button}>
                    <p>Change password</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
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
