import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import manStandingInFrontOfWindow from '../../../public/assets/man-standing-in-front-of-window.png'
import mobileManStandingInFrontOfWindow from '../../../public/assets/mobile-man-standing-in-front-of-window.png'

const HomePageTwo: FC = () => {
  const [clientWindowWidth, setClientWindowWidth] = useState<string | number>('')

  const handleResize = (): void => {
    setClientWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return (): void => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <section className='snap-start relative w-screen h-screen flex flex-col justify-center items-center desktop:grid desktop:grid-cols-2 justify-items-start bg-main'>
      
      <div className='absolute z-30 left-8 md:left-16 desktop:left-36 translate -transform-x-1/2 -transform-y-1/2 flex flex-col justify-center items-center space-y-20'>
        
        <div className={`w-3 h-3 border border-white rounded-full  bg-main`} />
        <div className={`w-3 h-3 border border-white rounded-full bg-white `} />
        <div className={`w-3 h-3 border border-white rounded-full bg-main`} />

      </div> 

      <div className='z-10 mb-3 flex flex-col justify-center items-center desktop:items-start pl-0 desktop:pl-60 font-notoThai text-white text-6xl desktop:text-8xl desktop:pt-0 w-full h-full space-y-3 desktop:space-y-5 '>

        <div className='text-center'>
          อย่าละเลย
        </div>

        <div className="text-center">
          โรคซึมเศร้า
        </div>

      </div>

      <div className='bg-main w-full h-full justify-end items-end hidden desktop:flex'>

        <Image src={manStandingInFrontOfWindow} alt='little girl hugging mother'></Image>

      </div>

      <div className="absolute inset-0 inline-flex justify-center items-center w-full h-full pt-10 z-0 desktop:hidden">
        <Image src={manStandingInFrontOfWindow} width={1000} height={1200} className='opacity-50' alt='little girl hugging mother'></Image>
      </div>

    </section>
  )
}

export default HomePageTwo