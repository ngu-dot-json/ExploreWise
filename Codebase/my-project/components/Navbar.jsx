import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Logo from "../public/logo-l.png"
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { useState } from "react"

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return (
    <nav className="fixed w-full h-15 shadow-xl bg-white">
        <div className="flex justify-between items-center h-full w-full px-4">
            
            {/* Pressable Logo */}
            <Link href='/'>
                <Image
                src={Logo}
                alt="logo"
                height="50"
                className="cursor-pointer"
                priority
                />
            </Link>

            {/* Menu Bar Selection */}
            <div classname>
            {/* <div classname="hidden sm:flex"> */}
                <ul className="hidden sm:flex">
                <Link href="/mapview">
                        <li className="ml-10 mr-10 hover:border-b text-l">Itinerary</li>
                    </Link>

                    <Link href="/mapview">
                        <li className="ml-10 mr-10 hover:border-b text-l">Map View</li>
                    </Link>

                    <Link href="/findevents">
                        <li className="ml-10 mr-10 hover:border-b text-l">Find Events</li>
                    </Link>

                    <Link href="/budgettracker">
                        <li className="ml-10 mr-10 hover:border-b text-l">Budget Tracker</li>
                    </Link>
                    
                    <Link href="/account">
                        <li className="ml-10 mr-10 hover:border-b text-l">Account</li>
                    </Link>
                </ul>
            </div>

            {/* Mobile Menu Sandwich Bar: Only Shows up on Mobile Screens */}
            <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
                <AiOutlineMenu size={25} />
            </div>
        </div>
    </nav>
    )
}

export default Navbar