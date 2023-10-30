import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Logo from "../public/Logo.png"
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { useState } from "react"

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return (
    <nav className="fixed w-full h-24 shadow-xl bg-white">
        <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
            
            {/* Pressable Logo */}
            <Link href='/'>
                <Image
                src={Logo}
                alt="logo"
                width="75"
                height="75"
                className="cursor-pointer"
                priority
                />
            </Link>

            {/* Menu Bar Selection */}
            <div classname="hidden sm:flex">
                <ul className="hidden sm:flex">
                    <Link href="/about">
                        <li className="ml-10 uppercase hover:border-b text-xl">Why Us</li>
                    </Link>
                    <Link href="/contact">
                        <li className="ml-10 uppercase hover:border-b text-xl">Contact Us</li>
                    </Link>
                    <Link href="/services">
                        <li className="ml-10 uppercase hover:border-b text-xl">Blog</li>
                    </Link>
                    <Link href="/services">
                        <li className="ml-10 uppercase hover:border-b text-xl">Our Services</li>
                    </Link>
                </ul>
            </div>

            {/* Mobile Menu Sandwich Bar: Only Shows up on Mobile Screens */}
            <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
                <AiOutlineMenu size={25} />
            </div>
            </div>

            {/* Mobile Sandwich Menu Bar Pop Up*/}
            <div className={
                menuOpen
                ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] pd-10 ease-in duration-500"
                : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
            }>

            {/* "x" button for the pop up*/}
            <div className="flex w-full items-center justify-end">
                <div onClick={handleNav} className="cursor-pointer">
                    <AiOutlineClose size={25} />
                </div>
            </div>

            {/* list menu items*/}
            <div className="flex-col py-4 px-4">
                <ul>
                    {/* Link 1*/}
                    <Link href="/">
                        <li
                            onClick={() => setMenuOpen(false)}
                            className="py-4 cursor-pointer"
                        >
                            Home
                        </li>
                    </Link>

                    {/* Link 2*/}
                    <Link href="/about">
                        <li
                            onClick={() => setMenuOpen(false)}
                            className="py-4 cursor-pointer"
                        >
                            About
                        </li>
                    </Link>

                    {/* Link 1*/}
                    <Link href="/contact">
                        <li
                            onClick={() => setMenuOpen(false)}
                            className="py-4 cursor-pointer"
                        >
                            Contact
                        </li>
                    </Link>

                    {/* Link 1*/}
                    <Link href="/services">
                        <li
                            onClick={() => setMenuOpen(false)}
                            className="py-4 cursor-pointer"
                        >
                            Services
                        </li>
                    </Link>
                </ul>
            </div>
            {/* Pressable Logo */}
            <Link href='/'>
                <Image
                src={Logo}
                alt="logo"
                width="75"
                height="75"
                className="cursor-pointer justify-center"
                priority
                />
            </Link>
        </div>
    </nav>
    )
}

export default Navbar