import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import depressedGirlSitting from '../../../public/assets/depressed-girl-sitting.png'
import mobileDepressedGirlSitting from '../../../public/assets/mobile-depressed-girl-sitting.png'

const HomePageThree = () => {

  return (
    <section className='snap-start h-screen w-screen bg-main relative flex justify-center items-center'>
      <div className='absolute z-30 left-8 md:left-16 desktop:left-36 translate -transform-x-1/2 -transform-y-1/2 flex flex-col justify-center items-center space-y-20'>
        
        <div className={`w-3 h-3 border border-white rounded-full  bg-main`} />
        <div className={`w-3 h-3 border border-white rounded-full bg-main `} />
        <div className={`w-3 h-3 border border-white rounded-full bg-white`} />

      </div> 

      <div className='absolute inset-0 opacity-40 hidden desktop:inline-flex'>
        <Image src={depressedGirlSitting} alt='depressed girl sitting' ></Image>
      </div>

      <div className="absolute inset-0 opacity-40 inline-flex desktop:hidden">
      <Image src={mobileDepressedGirlSitting} alt='depressed girl sitting' ></Image>
      </div>

      <div className='font-notoThai flex flex-col justify-center items-center absolute space-y-5'>
        <div className='text-white font-medium text-5xl desktop:text-7xl'>
          ให้เราช่วยคุณ
        </div>

        <Link href='/features'>
          <button className='bg-white px-7 py-2 border-2 border-white text-black text-3xl rounded-full'>
            ระบายมาเลย!
          </button>
        </Link> 
      </div>

      
    </section>
  )
}

export default HomePageThree