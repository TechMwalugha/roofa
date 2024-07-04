'use client'
import Image from "next/image"
import Link from "next/link"
import SearchBar from "../forms/SearchBar"
import DropMenu from "../cards/DropMenu"
import { IoBedSharp } from 'react-icons/io5'
import { BiBorderAll } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { SiPlaystation } from "react-icons/si";
import { MdRoofing } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { useEffect, useState } from "react"
import SearchUser from "../admin/forms/SearchUser"
import { usePathname } from "next/navigation"

const TopBar = () => {
  const scrollDirection = useScrollDirection()

  const path: string = usePathname()

  console.log(path)
  
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

        <Link href='/' className={`text-dark-1 hover:text-dark-4 ${path.includes('airbnbs') ? "" : "bg-gray-300 p-2"}`}>Rentals</Link>
        <Link href='/airbnbs' className={`text-dark-1 hover:text-dark-4 ${path.includes('airbnbs') ? "bg-gray-300 p-2" : ""}`}>Airbnbs</Link>

        <DropMenu/>
        </div>

        <div>
        <SearchUser routeType={`${path.includes('airbnbs') ? "/airbnbs" : "/"}`} />
        </div>

        <div className="flex items-center justify-between gap-3  overflow-x-scroll hide-scrollbar mt-4">
          <div>
            <Link href={`${path.includes('airbnbs') ? "/airbnbs" : "/"}`} className="flex gap-2 items-center justify-center"><BiBorderAll/> All</Link>
          </div>
          <div>
            <Link href='?q=single room' className="flex gap-2 items-center justify-center"><IoBedSharp/> <span>Single</span> <span>Room</span></Link>
          </div>
          <div>
            <Link href='?q=bedsitter' className="flex gap-2 items-center justify-center"><IoBedSharp/> Bedsitter</Link>
          </div>
          <div>
            <Link href='?q=one bedroom' className="flex gap-2 items-center justify-center"><IoBedSharp/> <span>One</span> <span>Bedroom</span></Link>
          </div>
          <div>
            <Link href='?q=two bedroom' className="flex gap-2 items-center justify-center"><IoBedSharp/> <span>Two</span> <span>Bedroom</span></Link>
          </div>
          <div>
            <Link href='?q=nakuru rafiki' className="flex gap-2 items-center justify-center"><MdLocationPin/> <span>Nakuru</span> <span>Rafiki</span></Link>
          </div>
          <div>
            <Link href='?q=nakuru kampi' className="flex gap-2 items-center justify-center"><MdLocationPin/> <span>Nakuru</span> <span>Kampi</span></Link>
          </div>
          <div>
            <Link href='?q=nakuru town' className="flex gap-2 items-center justify-center"><MdLocationPin/> <span>Nakuru</span> <span>Town</span></Link>
          </div>
          <div>
            <Link href='?q=play station' className="flex gap-2 items-center justify-center"><SiPlaystation/> <span>Play</span> <span>Station</span> </Link>
          </div>
          <div>
            <Link href='?q=internet' className="flex gap-2 items-center justify-center"><FaWifi/> Internet</Link>
          </div>
          <div>
            <Link href='?q=Rooftop Terrace' className="flex gap-2 items-center justify-center"><MdRoofing/> <span>Rooftop</span> <span>Terrace</span> </Link>
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