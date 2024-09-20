'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { IoCaretBackCircle } from "react-icons/io5";

const ComingSoonCard = () => {

    const router = useRouter()
  return (
    <div
    className='animate-pulse flex items-center justify-center flex-col p-5 h-screen'
    >
      <Image
      src="/assets/coming-soon-gif.gif"
      width={50}
      height={50}
      alt='coming soon gif'
      className='w-1/2 full'
      unoptimized
       />

       <Button
       className='flex items-center justify-center gap-3'
       onClick={() => router.back()}
       >
        <p>Back</p>
        <IoCaretBackCircle size={30} />
       </Button>
    </div>
  )
}

export default ComingSoonCard
