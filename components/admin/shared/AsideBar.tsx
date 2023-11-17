'use client'
import { asideBarContent } from "@/constants"
import AsideCard from "../cards/AsideCard"
import { RiDashboardFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useState } from "react";


const AsideBar = () => {

  const [showSideBar, setShowSideBar] = useState<boolean>(false)
  return (
    <>
     
    <div 
    className="fixed z-20 top-2 left-2 cursor-pointer md:hidden"
    onClick={() => {
      setShowSideBar(!showSideBar)
    }}
    >
    { showSideBar ? 
    (<MdCancel  size={35}/>) :
    (<RiDashboardFill size={35}/>) 
    }
    </div>

    <div 
    className={` md:left-0 ${showSideBar ? 'left-0' : 'left-full'} fixed bg-white top-0 z-6 flex h-screen w-72 flex-col justify-between gap-10 overflow-auto border-l border-l-dark-4 px-5 pb-6 pt-20`}>
     {
      asideBarContent.map((item, index) => <AsideCard
      key={index}
      title={item.title} 
      icon={item.icon}
      route={item.route}
       />)
     }
    </div>
    </>
  )
}

export default AsideBar
