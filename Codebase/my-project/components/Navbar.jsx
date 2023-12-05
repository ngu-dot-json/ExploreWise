import Image from "next/image";
import React from "react";
import Link from "next/link";
import Logo from "../public/logo-l.png";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    // bg-white shadow-xl
    <nav className="fixed top-0 w-full h-15 bg-white z-10 shadow-md">
      <div className="flex justify-between items-center h-full w-full px-4 py-2">
        {/* Pressable Logo */}
        <Link href="/">
          <Image className="logo" src={Logo} alt="logo" height="50" priority />
        </Link>

        {/* Menu Bar Selection */}
        <ul className="hidden sm:flex gap-8 items-center justify-between m-0">
          <Link href="/itinerary" className="no-underline text-black">
            <li
              className={`text-lg p-2 ${
                pathname === "/itinerary" && "text-orange-300"
              } hover:text-orange-300 font-bold`}
            >
              Itinerary
            </li>
          </Link>

          <Link className="no-underline text-black" href="/mapview">
            <li
              className={`text-lg p-2 ${
                pathname === "/mapview" && "text-orange-300"
              } hover:text-orange-300 font-bold`}
            >
              Map View
            </li>
          </Link>

          <Link className="no-underline text-black" href="/events">
            <li
              className={`text-lg p-2 ${
                pathname === "/events" && "text-orange-300"
              } hover:text-orange-300 font-bold`}
            >
              Events
            </li>
          </Link>

          <Link className="no-underline text-black" href="/budget">
            <li
              className={`text-lg p-2 ${
                pathname === "/budget" && "text-orange-300"
              } hover:text-orange-300 font-bold`}
            >
              My Budget
            </li>
          </Link>

          <Link className="no-underline text-black" href="/account">
            <li
              className={`text-lg p-2 ${
                pathname === "/account" && "text-orange-300"
              } hover:text-orange-300 font-bold`}
            >
              Account
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
