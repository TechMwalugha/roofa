'use client'
import { useRouter } from 'next/navigation'
import { TbRefresh } from "react-icons/tb";
import React from 'react'

const Refresh = () => {

    const router = useRouter()
  return (
    <div>
      <button 
      type='button' 
      className='mt-5 p-.5 bg-blue rounded-full text-black'
      onClick={()=> router.refresh()}
      >
        <TbRefresh size={30} />
      </button>
    </div>
  )
}

export default Refresh
