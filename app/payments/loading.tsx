import React from 'react'

const loading = () => {
  return (
    <div className=" animate-pulse relative flex justify-center items-center h-[50vh] w-full p-5">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue"></div>
      <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  className="rounded-full h-28 w-28" />
   </div>
  )
}

export default loading
