import React, { FC } from 'react'
import Link from 'next/link'


interface FooterProps {
  isHome: boolean,
  isMobileNavClicked: boolean
}

const Footer: FC<FooterProps> = ({ isHome, isMobileNavClicked }) => {



  return (
    <div className={`w-full justify-between py-3 items-center bg-main px-8 ${isHome && 'hidden'} ${!isHome && 'inline-flex'} ${isMobileNavClicked ? 'hidden' : 'inline-flex'}`}>

      <div id="copyrights" className="font-montserrat text-white text-sm">
        © 2021 Copyright Ailurus 
      </div>

      <div id="footer-navs" className="font-montserrat text-white inline-flex justify-center items-center space-x-5 text-sm">

        <div id="footer-home">
          <Link href='/'>Home</Link>
        </div>

        <div id="footer-features">
          <Link href='/features'>Features</Link>
        </div>

        <div id="footer-contact-us">
          <Link href='/contact-us'>Contact Us</Link>
        </div>

      </div>

    </div>
  )
}

export default Footer