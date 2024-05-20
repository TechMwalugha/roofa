
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div
    className='flex items-center justify-center flex-col p-5'
    >
      <Image
      src="/assets/coming-soon-gif.gif"
      width={50}
      height={50}
      alt='coming soon gif'
      className='w-1/2 h-1/2'
       />
    </div>
  )
}

export default page
