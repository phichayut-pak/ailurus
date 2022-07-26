import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import axios from 'axios'

import oldThemePhone from '../public/assets/old-theme-phone.jpg'
import mobileOldThemePhone from '../public/assets/mobile-old-theme-phone.png'


const ContactUsPage: NextPage = () => {
  const [clientWindowWidth, setClientWindowWidth] = useState<string | number>('')
  const [name, setName] = useState<string>('')
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [messageErrorMessage, setMessageErrorMessage] = useState<string>('')

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  } 

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const changeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value)
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()

    if(name.length === 0 || !email.includes('@') || message.length === 0) {
    
      if(name.length === 0) {
        setNameErrorMessage('กรุณาใส่ชื่อ')
      } else {
        setNameErrorMessage('')
      }

      if(!email.includes('@')) {
        setEmailErrorMessage('กรุณาเช็คอีเมล')
      } else {
        setEmailErrorMessage('')
      }

      if(message.length === 0) {
        setMessageErrorMessage('กรุณาใส่ข้อความ')
      } else {
        setMessageErrorMessage('')
      }
      
  
    } else {

      const response = await axios.post('/api/contact-us', {
        name,
        email,
        message
      })

      const data = await response.data
    
      if(!data.success) {
        alert('ไม่สามารถส่งอีเมลได้')
        return
      }


      setName('')
      setEmail('')
      setMessage('')
      setNameErrorMessage('')
      setEmailErrorMessage('')
      setMessageErrorMessage('')
    }



  }

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
    <div className='relative h-screen w-screen bg-main desktop:bg-white pt-[5.7rem] z-0 flex justify-center items-center'>
      {/* Desktop */}
      <div className='h-full w-full hidden desktop:grid grid-cols-5 justify-items-center '>

        <div className='relative col-span-3 h-full w-full inline-flex'>
          <Image src={oldThemePhone} alt="contact us image" className='opacity-40'></Image>
          <div className='absolute inset-0 flex justify-center items-center font-montserrat font-bold text-8xl text-black drop-shadow-lg'>
            Get in touch!
          </div>
          
          
        </div>

        <div id='form' className='bg-white w-full h-full col-span-2 relative'>
          <div className="absolute inset-10 bg-white py-10 flex flex-col justify-start items-start">

            <div id='contact-us-title' className='font-notoThai font-bold text-4xl text-left'>
              ติดต่อเรา
            </div>

            <form onSubmit={onSubmitHandler} id='contact-us-desktop-form' className='mt-12 w-full space-y-5'>

              <div className='relative'>
                <label htmlFor="contact-us-desktop-name" className='font-notoThai text-black'>ชื่อ</label>
                <div id="contact-us-desktop-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ nameErrorMessage }</div>
                <input onChange={changeNameHandler} value={name} type="text" className={`font-notoThai px-3 py-0.5 outline-none border-[0.5px] w-full ${nameErrorMessage ? 'border-red-500' : 'border-inputBorder'}`} />
              </div>

              <div className='relative'>
                <label htmlFor="contact-us-desktop-email" className='font-notoThai text-black'>อีเมล</label>
                <div id="contact-us-desktop-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ emailErrorMessage }</div>
                <input onChange={changeEmailHandler} value={email} type="text" className={`font-notoThai px-3 py-0.5 outline-none border-[0.5px] w-full ${emailErrorMessage ? 'border-red-500' : 'border-inputBorder'}`}/>
              </div>
              
              <div className='relative'>
                <label htmlFor="contact-us-desktop-message" className="font-notoThai text-black">ข้อความ</label>
                <div id="contact-us-desktop-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ messageErrorMessage }</div>
                <textarea onChange={changeMessageHandler} value={message} name="message" id="message" cols={50} rows={15} className={`px-3 font-notoThai resize-none outline-none border-[0.5px] w-full ${messageErrorMessage.length === 0 ? 'border-inputBorder' : 'border-red-500'}`}></textarea>              </div>

              <div id="contact-us-form-submit-btn" className='flex justify-end items-end group'>
                <button disabled={name === '' || email === '' || message === ''} onClick={onSubmitHandler} type="submit" className='py-1.5 bg-main px-3 text-white font-notoThai border-[0.5px] border-main transition duration-150 ease-in hover:bg-white hover:text-main'>ส่งข้อความ</button>
              </div>
            </form>


          </div>  
        </div>
      </div>

      {/* Mobile */}
      <div className='absolute desktop:hidden inset-0 opacity-50 z-0 '>
        <Image src={mobileOldThemePhone} layout='fill' alt='contact us image'></Image>
      </div>
      
      <div id='contact-us-mobile-card' className="bg-white relative desktop:hidden flex-col justify-center items-center max-w-2xl w-full space-y-5 py-12">
        
        <div id="contact-us-mobile=title" className="font-notoThai font-bold text-4xl text-center">
          ติดต่อเรา
        </div>

        <div id='contact-us-mobile-form' className='mx-16'>

          <form onSubmit={onSubmitHandler} className='space-y-5'>

            <div className='relative'>
              <label htmlFor="name" className='font-notoThai text-main'>ชื่อ</label>
              <div id="contact-us-desktop-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ nameErrorMessage }</div>
              <input onChange={changeNameHandler} value={name} type="text" className={`font-notoThai px-3 outline-none border-[0.5px] border-inputBorder w-full h-8 ${nameErrorMessage.length === 0 ? 'border-inputBorder' : 'border-red-500'}`} />
            </div>

            <div className='relative'>
              <label htmlFor="email" className='font-notoThai text-main'>อีเมล</label>
              <div id="contact-us-desktop-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ emailErrorMessage }</div>
              <input onChange={changeEmailHandler} value={email} type="text" className={`font-notoThai px-3 outline-none border-[0.5px] border-inputBorder w-full h-8 ${emailErrorMessage.length === 0 ? 'border-inputBorder' : 'border-red-500' } ` }/>
            </div>

            <div className='relative'>
              <label htmlFor="message" className='font-notoThai text-main'>ข้อความ</label>
              <div id="contact-us-mobile-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ messageErrorMessage }</div>
              <textarea onChange={changeMessageHandler} value={message} name="message" id="message" cols={50} rows={15} className={`px-3 font-notoThai resize-none outline-none border-[0.5px] w-full ${messageErrorMessage.length === 0 ? 'border-inputBorder' : 'border-red-500'}`}></textarea>
            </div>

            <div id="submit">
              <button onClick={onSubmitHandler} type="submit" className='py-1.5 w-full bg-main text-white font-notoThai border-[0.5px] border-main transition duration-150 ease-in hover:bg-white hover:text-main'>ส่งข้อความ</button>
            </div>


          </form>
        </div>

      </div>

    </div>
  )
}

export default ContactUsPage