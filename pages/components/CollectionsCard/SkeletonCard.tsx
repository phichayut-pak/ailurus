import React, { FC } from 'react'



const SkeletonCard: FC = () => {

  return (
    <div className='w-64 h-96 grid grid-rows-2 bg-white shadow-lg '>
      <div className="row-span-1 inline-flex bg-main">
        <div className='w-full h-full bg-gray-300 animate-pulse'>

        </div>
      </div>
      <div className="row-span-1 relative ">
        <div className="absolute inset-3 flex flex-col justify-start items-start space-y-5">
          <div className='font-notoThai text-3xl font-bold text-ellipsis overflow-hidden whitespace-pre-line'>
            <div className="w-36 h-7 bg-gray-300 animate-pulse"></div>
          </div>

          
            
            <div className="w-full h-full relative font-notoThai flex justify-center items-center">
              <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            </div>
            
            
          

        </div>
      </div>
    </div>
  )
}

export default SkeletonCard