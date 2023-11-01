'use client'
import Image from "next/image"
import Link from "next/link"
import SearchBar from "../forms/SearchBar"
import DropMenu from "../cards/DropMenu"
import { IoBedSharp } from 'react-icons/io5'
import { useEffect, useState } from "react"

const TopBar = () => {
  const scrollDirection = useScrollDirection()
  return (
    <nav className={`topbar  sticky ${ scrollDirection === "down" ? "-top-30" : "top-0"} bg-white mb-3 transition-all`}>
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
        <SearchBar />
        </div>

        <div className="flex items-center justify-between gap-3  overflow-x-scroll hide-scrollbar mt-4">
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