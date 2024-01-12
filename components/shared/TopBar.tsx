'use client'
import Image from "next/image"
import Link from "next/link"
import SearchBar from "../forms/SearchBar"
import DropMenu from "../cards/DropMenu"
import { IoBedSharp } from 'react-icons/io5'
import { useEffect, useState } from "react"
import SearchUser from "../admin/forms/SearchUser"

const TopBar = () => {
  const scrollDirection = useScrollDirection()
  
  return (
    <nav className={`topbar  sticky top-0 ${ scrollDirection === "down" ? "transform -translate-y-full" : "transform-none"} bg-white mb-3 transition-all duration-1000`}>
        <div className="flex items-center justify-between">
        <Link href="/" className="">
            <Image 
            src='/assets/roofalogo.png'
            width={70}
            height={70}
            alt="Roofa logo"
            className="object-cover"
            />
        </Link>

        <Link href='/' className="text-dark-1 hover:text-dark-4">Rentals</Link>
        <Link href='/airbnbs'>Airbnbs</Link>

        <DropMenu/>
        </div>

        <div>
        <SearchUser routeType="/" />
        </div>

        <div className="flex items-center justify-between gap-3  overflow-x-scroll hide-scrollbar mt-4">
          <div>
            <Link href='/?q=single room' className="flex gap-2 items-center justify-center"><IoBedSharp/> <span>Single</span> <span>Room</span></Link>
          </div>
          <div>
            <Link href='/?q=bedsitter' className="flex gap-2 items-center justify-center"><IoBedSharp/> Bedsitter</Link>
          </div>
          <div>
            <Link href='/?q=one bedroom' className="flex gap-2 items-center justify-center"><IoBedSharp/> <span>One</span> <span>Bedroom</span></Link>
          </div>
          <div>
            <Link href='/?q=two bedroom' className="flex gap-2 items-center justify-center"><IoBedSharp/> <span>Two</span> <span>Bedroom</span></Link>
          </div>
          <div>
            <Link href='#' className="flex gap-2 items-center justify-center"><IoBedSharp/> Bedsitter</Link>
          </div>
          <div>
            <Link href='#' className="flex gap-2 items-center justify-center"><IoBedSharp/> Bedsitter</Link>
          </div>
          <div>
            <Link href='#' className="flex gap-2 items-center justify-center"><IoBedSharp/> Bedsitter</Link>
          </div>
          <div>
            <Link href='#' className="flex gap-2 items-center justify-center"><IoBedSharp/> Bedsitter</Link>
          </div>
          <div>
            <Link href='#' className="flex gap-2 items-center justify-center"><IoBedSharp/> Bedsitter</Link>
          </div>
          <div>
            <Link href='#' className="flex gap-2 items-center justify-center"><IoBedSharp/> Bedsitter</Link>
          </div>
        </div>
    </nav>
  )
}

export default TopBar


function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction as any);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};