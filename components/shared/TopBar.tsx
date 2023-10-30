import Image from "next/image"
import Link from "next/link"
import SearchBar from "../forms/SearchBar"
import DropMenu from "../cards/DropMenu"
import { IoBedSharp } from 'react-icons/io5'

const TopBar = () => {
  return (
    <nav className="topbar bg-white">
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
