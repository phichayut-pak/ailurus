import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'
import littleGirlHuggingMother from '../../../public/assets/little-girl-hugging-mother.jpg'
import mobileLittleGirlHuggingMother from '../../../public/assets/mobile-little-girl-hugging-mother.png'

const HomePageOne: FC = () => {
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
    <section className='snap-start relative h-screen w-screen flex flex-col justify-center items-center desktop:grid desktop:grid-cols-2 justify-items-start bg-main'>
      <div className='absolute z-30 left-8 md:left-16 desktop:left-36 translate -transform-x-1/2 -transform-y-1/2 flex flex-col justify-center items-center space-y-20'>
        
        <div className={`w-3 h-3 border border-white rounded-full  bg-white`} />
        <div className={`w-3 h-3 border border-white rounded-full bg-main `} />
        <div className={`w-3 h-3 border border-white rounded-full bg-main`} />

      </div>  

      <div className='flex flex-col justify-center items-center desktop:items-start pl-0 desktop:pl-60 font-notoThai text-white text-6xl desktop:text-8xl pt-36 desktop:pt-0 w-full h-full space-y-3 desktop:space-y-5 '>

        <div className='text-left'>
          {clientWindowWidth < 1200 ? 'อย่าสู้ตัว' : 'อย่าสู้'}
        </div>

        <div className="">
          {clientWindowWidth < 1200 ? 'คนเดียว' : 'ตัวคนเดียว'}
        </div>

      </div>

      {/* <div className="flex desktop:hidden justify-center items-center"></div> */}

      <div className='bg-main w-full h-full inline-flex justify-center items-end desktop:flex desktop:justify-end desktop:items-end'>
          <Image src={clientWindowWidth < 1200 ? mobileLittleGirlHuggingMother : littleGirlHuggingMother} alt='little girl hugging mother'></Image>
      </div>

    </section>
  )
}

export default HomePageOne