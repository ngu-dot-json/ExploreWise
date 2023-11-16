import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Logo from "../public/logo-l.png"
import { useState } from "react"

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return ( // bg-white shadow-xl
    <nav className="fixed w-full h-15">
        <div className="flex justify-between items-center h-full w-full px-4">
            
            {/* Pressable Logo */}
            <Link href='/'>
                <Image className="logo"
                src={Logo}
                alt="logo"
                height="50"
                priority
                />
            </Link>

            {/* Menu Bar Selection */}
            <div classname>
            {/* <div classname="hidden sm:flex"> */}
                <ul className="hidden sm:flex">
                    <Link className='navElements' href="/itinerary">
                        <li className="ml-10 mr-10 hover:border-b text-l">Itinerary</li>
                    </Link>

                    <Link className='navElements' href="/mapview">
                        <li className="ml-10 mr-10 hover:border-b text-l">Map View</li>
                    </Link>

                    <Link className='navElements' href="/findevents">
                        <li className="ml-10 mr-10 hover:border-b text-l">Find Events</li>
                    </Link>

                    <Link className='navElements' href="/budgettracker">
                        <li className="ml-10 mr-10 hover:border-b text-l">Budget Tracker</li>
                    </Link>
                    
                    <Link className='navElements' href="/account">
                        <li className="ml-10 mr-10 hover:border-b text-l">Account</li>
                    </Link>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Navbar