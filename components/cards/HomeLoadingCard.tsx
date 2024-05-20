import React from 'react'

const HomeLoadingCard = () => {
  return (
    <div className="border border-blue-300 shadow rounded-md mx-au cursor-pointer flex-auto w-72 mb-10">
        <div className="animate-pulse">
          <div className='bg-slate-700 w-full h-36 mb-3 rounded-t-md'></div>
          <div className='flex items-center justify-center gap-2 mb-3'>
            <span className='bg-blue w-2 h-2 rounded-full'></span>
            <span className='bg-slate-700 w-2 h-2 rounded-full'></span>
            <span className='bg-slate-700 w-2 h-2 rounded-full'></span>
            <span className='bg-slate-700 w-2 h-2 rounded-full'></span>
            <span className='bg-slate-700 w-2 h-2 rounded-full'></span>
          </div>

          <div className='px-2 mb-3'>
              <div className="bg-slate-700 w-full h-2 rounded-md mb-2"></div>
              <div className="bg-slate-700 w-3/4 h-2 rounded-md mb-2"></div>
              <div className="bg-slate-700 w-1/2 h-2 rounded-md mb-2"></div>
          </div>
        </div>
    </div>
  )
}

export default HomeLoadingCard
