import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Logo from "../public/logo-l.png"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

    const [menuOpen, setMenuOpen] = useState(false)
    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return ( // bg-white shadow-xl
    <nav className="fixed top-0 w-full h-15 bg-grey z-10">
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
                        <li className="ml-10 mr-10 text-l p-2 hover:text-orange-300">Itinerary</li>
                    </Link>

                    <Link className='navElements' href="/mapview">
                        <li className="ml-10 mr-10 text-l p-2 hover:text-orange-300">Map View</li>
                    </Link>

                    <Link className='navElements' href="/events">
                        <li className="ml-10 mr-10 text-l p-2 hover:text-orange-300">Events</li>
                    </Link>

                    <Link className='navElements' href="/budget">
                        <li className="ml-10 mr-10 text-l p-2 hover:text-orange-300">My Budget</li>
                    </Link>
                    
                    <Link className='navElements' href="/account">
                        <li className="ml-10 mr-10 text-l p-2 hover:text-orange-300">Account</li>
                    </Link>
                </ul>
            </div>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
