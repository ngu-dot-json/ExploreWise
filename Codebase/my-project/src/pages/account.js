import Head from 'next/head'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar'
import Schedule from '../../components/TLScheduler'

const inter = Inter({ subsets: ['latin'] })

const styles = {
  heading:{
    marginTop: "120px", //Shifting the heading down so it is not covered by the navigation bar
  }
}

export default function Home() {
  return (
    <>
    <Navbar />
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    <h1>MY ACCOUNT</h1>
    </>
  )
}
