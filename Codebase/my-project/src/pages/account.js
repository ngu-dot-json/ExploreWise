import Head from 'next/head'
import Image from 'next/image'

import Map from '../../components/leafletMap'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      < Map />

      {/* <main className={styles.main}>
        <Map />
      </main> */}
    </div>
  )
}