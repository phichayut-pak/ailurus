import type { NextPage } from 'next'
import { useState, useEffect, useMemo, useRef } from 'react'
import HomePageOne from './components/HomePage/HomePageOne'
import HomePageTwo from './components/HomePage/HomePageTwo'
import HomePageThree from './components/HomePage/HomePageThree'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'


import Link from 'next/link'


const Home: NextPage = () => {

  const [clientWindowWidth, setClientWindowWidth] = useState<string | number>('')
  const [currentPage, setCurrentPage] = useState<number>(1)




  const handleScroll = (): void => {
    const firstHomePage = document.querySelector('first-home-page')
    const secondHomePage = document.querySelector('second-home-page')
    const thirdHomePage = document.querySelector('third-home-page')

    const clientHeight = document.documentElement.clientHeight
    const firstHomePageY = firstHomePage?.getBoundingClientRect().y
    const firstHomePageHeight = firstHomePage?.getBoundingClientRect().height

    if(clientHeight > firstHomePageY! + firstHomePageHeight!) {
      console.log('1 is here')
    } else {
      console.log('none')
    }
    
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return (): void => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <div className='relative h-screen w-screen snap-y snap-mandatory mx-auto overflow-x-hidden overflow-scroll'>
      
      
      


      <div id='first-home-page'>
        <HomePageOne />
      </div>

      <div id='second-home-page'>
        <HomePageTwo />
      </div>

      <div id='third-home-page'>
        <HomePageThree />
      </div>
      
    </div>
  )
}

export default Home
