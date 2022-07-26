import React, { useState, ChangeEvent, FormEvent } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import axios from 'axios'

import forgotPassword from '../../public/assets/forgot-password.jpg'
import mobileForgotPassword from '../../public/assets/mobileForgotPassword.png'


const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState<string>('')
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
  const [done, setDone] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  
  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)

    if(!email.includes('@')) {
      if(!email.includes('@')) {
        setEmailErrorMessage('กรุณาตรวจสอบอีเมล')
      }
  
    } else {
      const response = await axios.patch('/api/auth/forgot_password', {
        email
      })

      const data = await response.data

      if(data.success) {
        setSuccess(true)
        setEmailErrorMessage('')
        setEmail('')
        setDone('ส่งอีเมลเสร็จสิ้น')
        
      } 

      if(!data.success) {
        if(data.message === 'Invalid input!') {
          setEmailErrorMessage('กรุณาตรวจสอบอีเมล')
        } else {
          setEmailErrorMessage('')
        }

        if(data.message === 'No user found!'){
          setEmailErrorMessage('ไม่พบอีเมล')
        } else {
          setEmailErrorMessage('')
        }
      }
    }
    
  

    setLoading(false)

  }

  return (
    <div className='relative h-screen w-screen bg-main pt-[5.7rem] z-0 flex justify-center items-center' >
      <div className="inset-0 z-0 absolute hidden desktop:block">
        <Image src={forgotPassword} layout='fill' alt='forgot password image'></Image>
      </div>

      <div className="inset-0 z-0 absolute block desktop:hidden">
        <Image src={mobileForgotPassword} layout='fill' alt='forgot password image'></Image>
      </div>

      <div className="bg-white relative flex-col justify-center items-center max-w-2xl w-full space-y-5 py-12">

        <div className='font-notoThai font-bold text-4xl text-center'>
          ลืมรหัสผ่าน
        </div>

        <div className='mx-16'>
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div className='relative'>
              <label htmlFor="email" className='font-notoThai text-main'>อีเมล</label>
              <div id="forgot-password-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ emailErrorMessage }</div>
              <div id="" className="font-notoThai text-[#386FFE] absolute right-0 top-0.5">{ done }</div>
              <input onChange={changeEmailHandler} value={email} type="text" className={`rounded-lg font-notoThai px-3 outline-none border-[0.5px] border-inputBorder w-full h-8 ${emailErrorMessage.length === 0 ? 'border-inputBorder' : 'border-red-500' } ` }/>
            </div>
            <div id="submit">
              <button disabled={loading} onClick={onSubmitHandler} type="submit" className='rounded-lg my-3 py-1.5 w-full border-[0.5px] border-main bg-main text-white font-notoThai transition duration-150 ease-in hover:text-main hover:bg-white '>
                ส่งลิงค์รีเซ็ตรหัสผ่าน
              </button>
            </div>

          </form>
        </div>

        
      </div>
    </div>  
  )
}

export default ForgotPasswordPage