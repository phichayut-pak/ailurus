import React, { useState, ChangeEvent, FormEvent } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

import loginPage from '../../public/assets/login-page.jpg'
import mobileLoginPage from '../../public/assets/mobile-login-page.png'
import googleIcon from '../../public/assets/google-icon.png'


const LoginPage: NextPage = () => {
  const { push } = useRouter()

  const [email, setEmail] = useState<string>('')
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const validateValues = (email: string, password: string) => {
    let isEmailRight: boolean = false
    let isPasswordRight: boolean = false

    if(!email.includes('@')) {
      setEmailErrorMessage('กรุณาตรวจสอบอีเมล')

    } else {
      setEmailErrorMessage('')
      isEmailRight = true
    }
    
    if(password.trim().length === 0 ) {
      setPasswordErrorMessage('กรุณาตรวจสอบรหัสผ่าน')
    } else {
      setPasswordErrorMessage('')
      isPasswordRight = true
    }

    return isEmailRight! && isPasswordRight!
  }

  const submitFormHandler = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)

    const validate = validateValues(email, password)

    if(validate) {

      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
      })

      if(result?.ok) {
        push('/')
      }

      if(!result?.ok) {
        if(result?.error === 'Could not log you in') {
          setPasswordErrorMessage('กรุณาตรวจสอบรหัสผ่าน')
        } else {
          setPasswordErrorMessage('')
        }

        if(result?.error === 'No user found!') {
          setEmailErrorMessage('ไม่พบอีเมลดังกล่าว')
        } else {
          setEmailErrorMessage('')
        }

        
      }

    }
    
    setLoading(false)

  }

  const googleLoginHandler = async (e: FormEvent<HTMLButtonElement>) => {
    await signIn('google', {
      redirect: false,
      callbackUrl: '/'
    })
  }

  return (
    <div className='relative h-screen w-screen bg-main pt-[5.7rem] z-0 flex justify-center items-center'>
      
      {/* Desktop */}
      <div className='h-full w-full hidden desktop:grid grid-cols-5 justify-items-center'>
        
        <div className="bg-white w-full h-full col-span-2 relative" id="login-form">
          <div className="absolute inset-10 bg-white py-10 flex flex-col justify-start items-start">

            <div id="login-title" className="font-notoThai font-bold text-6xl text-left">
              ล๊อกอิน
            </div>

            <div id="login-description" className='font-notoThai text-inputBorder text-left text-xl my-2'>
              ป้อนข้อมูลเพื่อเข้าถึงบัญชีของคุณ
            </div>  

            <button onClick={googleLoginHandler} id='google-login' className='my-5 transition duration-150 ease-in font-montserrat w-full shadow-lg rounded-lg border-[0.5px] border-inputBorder bg-white hover:bg-main group py-5 inline-flex justify-center items-center'>

              <div className='inline-flex justify-center items-center space-x-3 '>
                <Image src={googleIcon} alt='google icon' width={25} height={25}></Image>
                <div className='font-montserrat text-black group-hover:text-white transition duration-150 ease-in'>
                  Log In With Google
                </div>
              </div>

            </button>

            <div className='inline-flex justify-center items-center w-full my-5'>
              <div className="w-full border-[0.5px] border-inputBorder mr-5"></div>
              <div className="font-montserrat text-inputBorder text-xl">or</div>
              <div className="w-full border-[0.5px] border-inputBorder ml-5"></div>

            </div>

            <form className='w-full relative' onSubmit={submitFormHandler}>

              <div className='relative mt-8'>
                <label htmlFor="login-email" className='font-notoThai text-black'>อีเมล</label>
                <div className="font-notoThai text-red-500 absolute right-0 top-0.5">{ emailErrorMessage }</div>
                <input onChange={changeEmailHandler} value={email} type="text" className={`font-notoThai px-3 py-2 rounded-xl outline-none border-[0.5px] w-full ${emailErrorMessage.trim().length > 0  ? 'border-red-500' : 'border-inputBorder'}`}/>
              </div>

              <div className="relative mt-8">
                <label htmlFor="login-password" className="font-notoThai text-black">รหัสผ่าน</label>
                <div className={`font-notoThai  absolute right-0 top-0.5 ${passwordErrorMessage.trim().length === 0 ? 'text-[#386FFE]' : 'text-red-500'}`}>
                  {
                    passwordErrorMessage.trim().length === 0 ? <Link href='/auth/forgot_password'>ลืมรหัสผ่าน</Link> : passwordErrorMessage
                  }
                  
                </div>
                <input onChange={changePasswordHandler} value={password} type="password" className={`font-notoThai px-3 py-2 rounded-xl outline-none border-[0.5px] w-full ${passwordErrorMessage ? 'border-red-500' : 'border-inputBorder'}`} />
                
              </div>  

              <div className='relative'>
                <button disabled={loading} onClick={submitFormHandler} type="submit" className={`mt-16 w-full py-2.5 inline-flex justify-center items-center font-notoThai text-white bg-main text-xl rounded-xl border border-main transition duration-150 ease-in hover:bg-white hover:text-main ${loading && 'opacity-50'}`}>ล๊อกอิน</button>
                <div className='absolute -bottom-10 left-0 inline-flex justify-center items-center space-x-2'>
                  <div className='font-notoThai text-lg text-main'>
                    ยังไม่เคยสมัคร?
                  </div>

                  <div className='font-notoThai text-lg text-[#386FFE]'>
                    <Link href='/auth/register'>สมัครเลย</Link>
                  </div>
                </div>
              </div>
            </form>


          </div>
        </div>
        
        <div className="relative col-span-3 h-full w-full inline-flex">
          <Image src={loginPage} alt='login page image' className='opacity-70'></Image>
        </div>
      
      </div>

      {/* Mobile */}
      <div className="absolute desktop:hidden inset-0 z-0">
        <Image src={mobileLoginPage} layout='fill' alt='login page image'></Image>
      </div>

      <div id="login-card" className="bg-white relative desktop:hidden flex-col justify-center items-center max-w-2xl w-full space-y-5 py-20">
        <div id='login-title' className='font-notoThai font-bold text-4xl text-center'>
          ล๊อกอิน
        </div>

        <div className='mx-16'>
          <button onClick={googleLoginHandler} id='google-login' className='my-5 transition duration-150 ease-in font-montserrat w-full shadow-lg rounded-lg border-[0.5px] border-inputBorder bg-white hover:bg-main group py-5 inline-flex justify-center items-center'>

            <div className='inline-flex justify-center items-center space-x-3 '>
              <Image src={googleIcon} alt='google icon' width={25} height={25}></Image>
              <div className='font-montserrat text-black group-hover:text-white transition duration-150 ease-in'>
                Log In With Google
              </div>
            </div>

          </button>
        </div>

      
        <div className='inline-flex justify-center items-center w-full my-5'>
          <div className="w-full border-[0.5px] border-inputBorder mr-5 mx-16"></div>
          <div className="font-montserrat text-inputBorder text-xl">or</div>
          <div className="w-full border-[0.5px] border-inputBorder ml-5 mx-16"></div>

        </div>

        <div id='login-form' className='mx-16'>

          <form onSubmit={submitFormHandler}>

            <div className='relative mt-8'>
              <label htmlFor="login-email" className='font-notoThai text-black text-lg'>อีเมล</label>
              <div className="font-notoThai text-red-500 absolute right-0 top-0.5">{ emailErrorMessage }</div>
              <input onChange={changeEmailHandler} value={email} type="text" className={`text-lg font-notoThai px-3 py-2 rounded-xl outline-none border-[0.5px] w-full ${emailErrorMessage ? 'border-red-500' : 'border-inputBorder'}`}/>
            </div>

            <div className="relative mt-8 text-lg">
              <label htmlFor="login-password" className="font-notoThai text-black">รหัสผ่าน</label>
              <div className={`font-notoThai  absolute right-0 top-0.5 ${passwordErrorMessage.trim().length === 0 ? 'text-[#386FFE]' : 'text-red-500'}`}>
                  {
                    passwordErrorMessage.trim().length === 0 ? <Link href='/auth/forgot_password'>ลืมรหัสผ่าน</Link> : passwordErrorMessage
                  }
                  
                </div>
              <input onChange={changePasswordHandler} value={password} type="password" className={`font-notoThai px-3 py-2 rounded-xl outline-none border-[0.5px] w-full ${passwordErrorMessage ? 'border-red-500' : 'border-inputBorder'}`} />
              
            </div>  

            <div className='relative'>
              <button disabled={loading} onClick={submitFormHandler} type="submit" className={`mt-16 w-full py-2.5 inline-flex justify-center items-center font-notoThai text-white bg-main text-xl rounded-xl border border-main transition duration-150 ease-in hover:bg-white hover:text-main ${loading && 'opacity-50'}`}>ล๊อกอิน</button>
              <div className='absolute -bottom-12 left-0 inline-flex justify-center items-center space-x-2'>
                <div className='font-notoThai text-lg text-main'>
                  ยังไม่เคยสมัคร?
                </div>

                <div className='font-notoThai text-lg text-[#386FFE]'>
                  <Link href='/auth/register'>สมัครเลย</Link>
                </div>
              </div>
            </div>

          </form>

        </div>        
      </div>



    </div>
  )
}

export const getServerSideProps: any = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)


  if(session) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  return {
    props: {
      session,
    }
  }

}

export default LoginPage