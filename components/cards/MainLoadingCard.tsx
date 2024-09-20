import React from 'react'

const MainLoadingCard = () => {
  return (
        <div className=" animate-pulse relative flex justify-center items-center h-screen w-full p-5">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue"></div>
                <img src="/assets/avatar-thinking-9.svg"  className="rounded-full h-24 w-24" />
        </div>
       
  )
}

export default MainLoadingCard
