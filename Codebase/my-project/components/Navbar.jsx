import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Logo from "../public/Logo.png"
import {AiOutlineMenu} from 'react-icons/ai'
import { useState } from "react"

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    return (
    <nav className="fixed w-full h-24 shadow-xl bg-white">
        <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
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
        <div onClick={handleNav} className="sm:hidden cursor-pointer pl-24">
            <AiOutlineMenu size={25} />
        </div>
        </div>
    </nav>
    )
}

export default Navbar