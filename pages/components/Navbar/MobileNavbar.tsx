import React, { FC } from 'react'
import { HiOutlineX } from 'react-icons/hi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'




interface MobileNavbarProps {
  isClicked: boolean,
  onRemoveMobileNav: () => void
}

const MobileNavbar: FC<MobileNavbarProps> = ({ isClicked, onRemoveMobileNav}) => {
  const { data: session } = useSession()
  const { push } = useRouter()

  const onClickNav = (path: string) => {
    push(path)
    onRemoveMobileNav()
  }

  const signOutHandler = (): void => {
    signOut()
  }

  return (
    <div className={`w-screen h-screen bg-white fixed z-50 ${!isClicked ? 'hidden' : 'block'}`}>
      
      <div className='w-full h-24 inline-flex justify-between items-center px-7 '>
        <div onClick={() => onClickNav('/')} id='title' className='z-50 font-montserrat font-bold text-black text-2xl '>
          Ailurus
        </div>
        <button className="z-50" onClick={onRemoveMobileNav}>
          <HiOutlineX className='w-8 h-8'></HiOutlineX>
        </button>
      </div>

      <div className='absolute inset-0 flex flex-col justify-center items-center space-y-10 '>

      
          <div onClick={() => onClickNav('/')} className='font-montserrat font-bold text-black text-4xl w-full text-center py-2'>
            Home
          </div>
        
          <div onClick={() => onClickNav('/features')} className='font-montserrat font-bold text-black text-4xl w-full text-center  py-2 '>
            Features
          </div>
        
          <div onClick={() => onClickNav('/contact-us')} className='font-montserrat font-bold text-black text-4xl w-full text-center  py-2'>
            Contact Us
          </div>

          <div className='w-3/4 border -[0.5px] my-10 border-main' />

          {/* no session */}
          <div onClick={() => onClickNav('/auth/login')} className={`font-montserrat font-bold text-black text-4xl w-full text-center py-2 ${session && 'hidden'}`}>
            Login
          </div>

          <div className='py-2'>
            <div onClick={() => onClickNav('/auth/register')} className={`bg-main py-3 px-5 rounded-full font-montserrat font-bold text-white text-4xl text-center ${session && 'hidden'}`}>
              Sign up
            </div>
          </div>

          {/* have session*/}
          <div onClick={() => onClickNav(`/collections/${session?.user?.email}`)} className={`font-montserrat font-bold text-black text-4xl w-full text-center py-2 ${!session && 'hidden'}`}>
            Collections
          </div>

          <div className='py-2'>
            <div onClick={signOutHandler} className={`bg-main py-3 px-5 rounded-full font-montserrat font-bold text-white text-4xl text-center ${!session && 'hidden'}`}>
              Sign out
            </div>
          </div>

        

      </div>
    </div>
  )
}

export default MobileNavbar