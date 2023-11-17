'use client'

import Link from "next/link"
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { BsFillHousesFill } from "react-icons/bs";
import { RiPassPendingLine } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { usePathname } from "next/navigation";

const AsideCard = ({
    title,
    icon,
    route,
}: {
    title: string
    icon: string
    route: string
}) => {
    const pathname = usePathname()
    const isActive = (pathname.includes(route) && route.length > 1 || pathname === route)

  return (
    <Link 
    href={route}
    >

    <div className={`flex items-center gap-2  text-dark-4 hover:text-dark-1 hover:ml-2 p-2 transition-all duration-300 ease-in-out rounded-md text-center cursor-pointer ${isActive && 'ml-2 bg-primary hover:text-dark-1 shadow-md'}`}>
        {icon === 'RxDashboard' && (
            <RxDashboard size={30} />
            )}
        {icon === 'FaUsers' && (
            <FaUsers size={30} />
            )}
        {icon === 'BsFillHousesFill' && (
            <BsFillHousesFill size={30} />
            )}
        {icon === 'RiPassPendingLine' && (
            <RiPassPendingLine size={30} />
            )}
        {icon === 'IoNotifications' && (
            <IoNotifications size={30} />
            )}
        {icon === 'MdOutlinePayments' && (
            <MdOutlinePayments size={30} />
            )}
        {icon === 'BiLogOut' && (
            <BiLogOut size={30} />
            )}
      <p>{title}</p>
    </div>
    </Link>
  )
}

export default AsideCard
