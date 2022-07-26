import React, { FC, useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { HiMenu } from 'react-icons/hi'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'

import MobileNavbar from './MobileNavbar'

interface NavbarProps {
  isHome: boolean,
  isForgetPassword: boolean,
  isResetPassword: boolean,
  isFeatures: boolean,
  children: any,
  setMobileNavClicked: (isMobileNavClicked: boolean) => void
}

const Navbar: FC<NavbarProps> = ({ isHome, isForgetPassword, isResetPassword, isFeatures, children, setMobileNavClicked }) => {
  const { pathname } = useRouter()
  const { data: session } = useSession()
  const [isMobileNavClicked, setIsMobileNavClicked] = useState<boolean>(false)
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false)

  const onHamburgerClickHandler = (): void => {
    setIsMobileNavClicked(true)
    setMobileNavClicked(true)
  }

  const onRemoveMobileNav = (): void => {
    setIsMobileNavClicked(false)
    setMobileNavClicked(false)
  }
  
  const signOutHandler = (): void => {
    signOut()
  }

  return (
    <>
      <div className={`${isHome && 'border-none'} border-b-[0.5px] border-inputBorder ${isFeatures ? 'relative' : 'fixed'} z-10 w-screen h-24 px-7 justify-between items-center ${isHome ? 'bg-transparent' : 'bg-main'} ${isMobileNavClicked ? 'hidden' : 'inline-flex'}`}>

        <div id='title' className='font-montserrat font-bold text-white text-2xl '>
          <Link href="/">Ailurus</Link>
        </div>

        <div id='links' className={`hidden desktop:inline-flex justify-center items-center space-x-8 font-montserrat text-white font-normal ${(isForgetPassword || isResetPassword) && 'hidden desktop:hidden'} `}>
          <Link href='/'>
            <div className={`cursor-pointer link-underline link-underline-black ${pathname === '/' ? 'link__active' : ''}`}>
              Home
            </div>
          </Link>
          
          <Link href='/features'>
            <div className={`cursor-pointer link-underline link-underline-black ${pathname === '/features' ? 'link__active' : ''}`}>
              Features
            </div>
          </Link>

          <Link href='/contact-us'>
            <div className={`cursor-pointer link-underline link-underline-black ${pathname === '/contact-us' ? 'link__active' : ''}`}>
              Contact Us
            </div>
          </Link>

        </div>

        <div id='auth-links' className={`hidden desktop:inline-flex justify-center items-center space-x-8 font-montserrat font-normal`}>

          <div id='login' className={`text-white cursor-pointer ${session && 'hidden'} ${(isForgetPassword || isResetPassword) && 'hidden desktop:hidden'}`}>
            <Link href='/auth/login'>Login</Link>
          </div>
          
          <div id='signup' className={`cursor-pointer flex justify-center items-center py-1 px-3 bg-white border-2 border-white rounded-full transition duration-150 ease-in group hover:bg-main ${session && 'hidden'} ${(isForgetPassword || isResetPassword) && 'hidden desktop:hidden'}`}>
            <div className='text-main group-hover:text-white'>
              <Link href='/auth/register'>Sign up</Link>
            </div>
          </div>


          <div id="user-email" className={`relative ${session ? 'block' : 'hidden'}`}>
            <Menu>
              <Menu.Button>
                <div className='inline-flex justify-center items-center'>
                  <div className='text-white font-montserrat'>
                    { session?.user?.email }
                  </div>

                  <div>
                    <IoMdArrowDropdown className='w-7 h-7 text-white' />
                  </div>
        
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >

              
                <Menu.Items className={`shadow-lg bg-white absolute -bottom-32 py-5 px-5 right-1.5 flex flex-col justify-center items-center rounded-lg space-y-3 `}>
                  <Menu.Item>
          
                      <div className='text-main font-montserrat'>
                        <Link href={`/collections/${session?.user?.email}`}>Collections</Link>
                      </div>
                  
                  </Menu.Item>
                  
                  <div className="w-full border border-main"></div>

                  <Menu.Item>
                
                    <div className='text-main font-montserrat cursor-pointer' onClick={signOutHandler}>
                      Log out
                    </div>
                  
                  </Menu.Item>

                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* <div id="user-email" className={`relative ${session ? 'block' : 'hidden' } group`}>

            <div className='inline-flex justify-center items-center cursor-pointer' onMouseEnter={onMouseEnterProfile} onMouseLeave={onMouseLeaveProfile}>
              <div className='text-white font-montserrat'>
                { session?.user?.email }
              </div>

              <div>
                <IoMdArrowDropdown className='w-7 h-7 text-white' />
              </div>
    
            </div>

            <div id='dropdown-nav' className={`bg-white absolute -bottom-32 py-5 px-5 right-1.5 flex-col justify-center items-center rounded-lg space-y-3 ${isMouseEnter ? 'flex' : 'hidden'}`}>
              <div className='text-main font-montserrat'>
                Collections
              </div>

              <div className="w-full border border-main"></div>

              <div className='text-main font-montserrat'>
                Log out
              </div>

            </div>


          </div> */}
        </div>


        <button onClick={onHamburgerClickHandler} title='hamburger' className='text-white inline-flex desktop:hidden justify-center items-center'>
          <HiMenu className='w-8 h-8'/>
        </button>

      </div>
      <MobileNavbar isClicked={isMobileNavClicked} onRemoveMobileNav={onRemoveMobileNav} />

      

      { children }

      
      
    </>
  )
}

export default Navbar