import React, { useState, ChangeEvent, FormEvent } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'

import resetPassword from '../../../public/assets/reset-password-page.jpg'
import mobileResetPassword from '../../../public/assets/mobile-reset-password-page.png'



const ResetPasswordPage: NextPage = () => {
  const { push, query } = useRouter()
  const [password, setPassword] = useState<string>('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')
  const [confirmedPasswordErrorMessage, setConfirmedPasswordErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const validateValues = (password: string, confirmdPassword: string) => {
    let isPasswordFilled: boolean = false
    let isPasswordLongEnough: boolean = false
    let isConfirmedPasswordFilled: boolean = false
    let isConfirmedPasswordRight: boolean = false

    if(password.trim().length === 0) {
      setPasswordErrorMessage('กรุณาตรวจสอบรหัสผ่าน')
    } else {
      setPasswordErrorMessage('')
      isPasswordFilled = true
    }

    if(password.trim().length < 6) {
      setPasswordErrorMessage('รหัสผ่านต้องมีมากกว่า 6 ตัวอักษร')
    } else {
      setPasswordErrorMessage('')
      isPasswordLongEnough = true
    }

    if(confirmedPassword.trim().length === 0 ) {
      setConfirmedPasswordErrorMessage('กรุณายืนยันรหัสผ่าน')
    } else {
      setConfirmedPasswordErrorMessage('')
      isConfirmedPasswordFilled = true
    }

    if(password !== confirmedPassword) {
      setConfirmedPasswordErrorMessage('รหัสผ่านไม่ตรงกัน')
    } else {
      setConfirmedPasswordErrorMessage('')
      isConfirmedPasswordRight = true
    }

    return isPasswordFilled && isPasswordLongEnough && isConfirmedPasswordFilled && isConfirmedPasswordRight
  }
  
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)

    const validate = validateValues(password, confirmedPassword)

    if(validate) {
      const response = await axios.post(`/api/auth/reset/${query.token}`, {
        password,
        confirmedPassword
      })
      
      const data = await response.data

      if(data.success) {
        push('/auth/login')
      } else {
        if(data.message === 'No user found!') {
          push('/')
        } 

        if(data.message === 'Passwords do not match') {
          setPasswordErrorMessage('รหัสผ่านไม่ตรงกัน')
          setConfirmedPasswordErrorMessage('รหัสผ่านไม่ตรงกัน')
        } else { setPasswordErrorMessage('') ; setConfirmedPasswordErrorMessage('') }

        if(data.message === 'Invalid input!') {
          setPasswordErrorMessage('กรุณาตรวจสอบรหัสผ่าน')
        } else { setPasswordErrorMessage('') }
        
      }
    }
    
    setLoading(false)
    
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const changeConfirmedPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.target.value)
  }

  

  return (
    <div className='relative h-screen w-screen bg-main pt-[5.7rem] z-0 flex justify-center items-center' >
      <div className="inset-0 z-0 absolute hidden desktop:block opacity-50">
        <Image src={resetPassword} layout='fill' alt='forgot password image'></Image>
      </div>

      <div className="inset-0 z-0 absolute block desktop:hidden opacity-50">
        <Image src={mobileResetPassword} layout='fill' alt='forgot password image'></Image>
      </div>

      <div className="bg-white relative flex-col justify-center items-center max-w-2xl w-full space-y-5 py-12">

        <div className='font-notoThai font-bold text-4xl text-center'>
          ลืมรหัสผ่าน
        </div>

        <div className='mx-16'>
          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div className='relative'>
              <label htmlFor="password" className='font-notoThai text-main'>รหัสผ่าน</label>
              <div id="password-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ passwordErrorMessage }</div>
              <input onChange={changePasswordHandler} value={password} type="password" className={`rounded-lg font-notoThai px-3 outline-none border-[0.5px] border-inputBorder w-full h-8 ${passwordErrorMessage.length === 0 ? 'border-inputBorder' : 'border-red-500' } ` }/>
            </div>
            <div className='relative'>
              <label htmlFor="confirmedPassword" className='font-notoThai text-main'>ยืนยันรหัสผ่าน</label>
              <div id="confirmdPasswordpassword-email-error" className="font-notoThai text-red-500 absolute right-0 top-0.5">{ confirmedPasswordErrorMessage }</div>
              <input onChange={changeConfirmedPasswordHandler} value={confirmedPassword} type="password" className={`rounded-lg font-notoThai px-3 outline-none border-[0.5px] border-inputBorder w-full h-8 ${confirmedPasswordErrorMessage.length === 0 ? 'border-inputBorder' : 'border-red-500' } ` }/>
            </div>
            <div id="submit">
              <button disabled={loading} onClick={onSubmitHandler} type="submit" className='rounded-lg my-3 py-1.5 w-full border-[0.5px] border-main bg-main text-white font-notoThai transition duration-150 ease-in hover:text-main hover:bg-white '>
                ยืนยัน
              </button>
            </div>

          </form>
        </div>

        
      </div>
    </div>  
  )
}

export default ResetPasswordPage