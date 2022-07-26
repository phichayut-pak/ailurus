import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import type { NextPage } from 'next'
import { Switch } from '@headlessui/react'
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'





const FeaturesPage: NextPage = () => {
  const { push } = useRouter() 
  const { data: session } = useSession()
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [x1, setX1] = useState<any>(null)
  const [y1, setY1] = useState<any>(null)
  const [x2, setX2] = useState<any>(null)
  const [y2, setY2] = useState<any>(null)
  const [k, setK] = useState<number>(0)
  const [enabled, setEnabled] = useState<boolean>(false)
  const [clientWindowWidth, setClientWindowWidth] = useState<string | number>('')

  const handleResize = (): void => {
    setClientWindowWidth(window.innerWidth)
    if(window.innerWidth < 1200) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    
    window.addEventListener('resize', handleResize)
    return (): void => {
      window.removeEventListener('resize', handleResize)
    }
  })

  useEffect(() => {
    if(window.innerWidth < 1200) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])

  const random = () => {
    setX1((Math.floor(Math.random() * 201) + Math.floor(Math.random() * 201)))
    setY1(((Math.floor(Math.random() * 201) + Math.floor(Math.random() * 201))))
    setX2(Math.floor(Math.random() * 401))
    setY2(Math.floor(Math.random() * 401))
  }

  const clear = () => {
    const canvas: any = document.querySelector('canvas')
    // let canvas: any
    // if(isMobile) {
    //   canvas = document.getElementById('mobile-content-image-processing');
    // } else {
    //   canvas = document.getElementById('desktop-content-image-processing');
    // }
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setK(0)
    setX1(null)
    setX2(null)
    setY1(null)
    setY2(null)
    setContent('')
  }

  const lineTo = () => {
    var i = 0
      while (i < 1) {
        const canvas: any = document.querySelector('canvas')
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(x1, y1);
        if(k%2 == 0) {
          var g = 1
        } else {
          g = -1
        }
        var xavg = ((x1 + x2) / 2) + (50 * g);
        var yavg = ((y1 + y2) / 2) + (50 * g);
        ctx.quadraticCurveTo(xavg, yavg, x2, y2);
        setX2(x1)
        setY2(y1)
        setX1((Math.floor(Math.random() * 201) + Math.floor(Math.random() * 201)))
        setY1((Math.floor(Math.random() * 201) + Math.floor(Math.random() * 201)))
        ctx.stroke();
        setK(k + 1)
        i++
      }
  }

  const download = () => {
    const link: any = document.createElement('a')
    link.download = 'ailurus-image.png'
    const canvas: any = document.querySelector('canvas')
    // let canvas: any
    // if(clientWindowWidth < 1200) {
    //   canvas = document.getElementById('mobile-content-image-processing');
    // } else {
    //   canvas = document.getElementById('desktop-content-image-processing');
    // }
    link.href = canvas.toDataURL()
    link.click()
  }

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    
  }

  const changeContentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    if(e.target.value !== '') {
      lineTo()
    }
  }

  const saveHandler = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()

    const canvas: any = document.querySelector('canvas')
    // let canvas: any
    // if(clientWindowWidth < 1200){
    //   canvas = document.getElementById('mobile-content-image-processing')
    // } else {
    //   canvas = document.getElementById('desktop-content-image-processing')
    // }

    const formData = new FormData()
    formData.append('file', canvas.toDataURL())
    formData.append('upload_preset', 'ailurus')

    try {
      const imageResponse = await axios.post('https://api.cloudinary.com/v1_1/ailurus/image/upload', formData)
      const imageData = await imageResponse.data

      if(imageData) {
        const { secure_url: image_url } = imageData
        const response = await axios.post('/api/saveCollection', {
          email: session?.user?.email,
          title,
          content,
          enabled,
          image_url
        })
        const data = await response.data

        if(data) {
          push('/collections/'+session?.user?.email) 
        }
      }
      

    } catch(error: any) {
      throw new Error(error)
    }
    
    

    
  }




  return (
    <div className='relative h-screen w-screen bg-main desktop:bg-white pt-96 desktop:pt-[6.0rem] z-0 flex justify-center items-center '>
      {/* Desktop */}
      <div className='h-full w-full hidden desktop:grid grid-cols-2 justify-items-center z-0'>

          {!isMobile && (

            <div className='w-full h-full bg-main relative justify-center items-center hidden desktop:flex'>
              
                <canvas id='desktop-content-image-processing' width={400} height={400} className='z-50'></canvas>
                <button onClick={download} className='absolute bottom-5 left-5 bg-white px-3 py-2 text-main font-notoThai text-xl'>ดาวน์โหลด</button>
                <button onClick={clear} className="absolute bottom-5 left-36 bg-white px-3 py-2 text-main font-notoThai text-xl">เคลียร์</button>
              
            </div>
          )}
        
        <div className="w-full h-full bg-white relative">

          <div className="absolute inset-7 my-7 mr-16 flex flex-col justify-start items-start">
            
            <div className='text-main font-notoThai text-6xl font-bold  '>
              มีอะไรไม่สบายใจ
              <br />
              ระบายให้เราฟังได้เลย
            </div>

            <div className='mt-10 w-full'>
              <form onSubmit={saveHandler}>

                <div className='w-full my-4'>
                  <div className='font-notoThai text-main font-medium'>หัวข้อ</div>
                  <input onChange={changeTitleHandler} value={title} type="text" className='font-notoThai px-3 py-0.5 outline-none border-[0.5px] w-1/2 border-inputBorder' />
                </div>  

                <div className='w-full mt-2 mb-3'>
                  <label htmlFor="desktop-features-content" className='font-notoThai text-main font-medium'>เนื้อหา</label>
                  <textarea onClick={random} onChange={changeContentHandler} value={content} name="desktop-features-content" id="desktop-features-content" cols={30} rows={15} className='resize-none font-notoThai px-3 py-0.5 outline-none border-[0.5px] w-full border-inputBorder'></textarea>
                </div>

                <div className='inline-flex justify-start items-start space-x-2 font-notoThai'>
                  <div>
                    เก็บเนื้อหา
                  </div>

                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                      enabled ? 'bg-main' : 'bg-white border border-main'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition duration-150 ease-in`}
                  >
                    <span
                      className={`${
                        enabled ? 'translate-x-6 bg-white' : 'translate-x-1 bg-main'
                      } inline-flex h-4 w-4 transform rounded-full justify-center items-center transition duration-150 ease-in`}
                    
                    > 
                      {enabled ? <HiOutlineCheck className='h-3 w-3 text-main'/>: <HiOutlineX className='h-3 w-3 text-white'/>}
                    </span>
                  </Switch>
                </div>
                
                <div className="w-full inline-flex justify-end items-center">
                  <button 
                    onClick={saveHandler}
                    disabled={(title.trim().length === 0 || content.trim().length === 0) && true} 
                    type='submit' 
                    className={`py-1.5 bg-main px-3 text-white font-notoThai text-xl border border-main transition duration-150 ease-in hover:bg-white hover:text-main ${(title.trim().length === 0 || content.trim().length === 0) ? 'opacity-50' : 'opacity-100'}`}>
                      บันทึก
                  </button>
                </div>

              </form>
            </div>

          </div>

        </div>

      </div>

      {/* Mobile */}
      <div className='desktop:hidden bg-white w-screen'>

        <div className='flex flex-col justify-center items-start px-16 py-10 mt-60'>

          <div className='w-full text-main font-notoThai text-3xl md:text-4xl font-bold mt-10 '>
            มีอะไรไม่สบายใจ
            <br />
            ระบายให้เราฟังได้เลย
          </div>

          <div className='w-full my-8'>
            <div className='font-notoThai text-main font-medium text-lg'>หัวข้อ</div>
            <input onChange={changeTitleHandler} value={title} type="text" className='font-notoThai px-3 py-1.5 outline-none border-[0.5px] w-3/4 border-inputBorder' />
          </div>                
          
          <div className='w-full mt-2 mb-10 h-96'>
            <label htmlFor="desktop-features-content" className='font-notoThai text-main font-medium text-lg'>เนื้อหา</label>
            <textarea onClick={random} onChange={changeContentHandler} value={content} name="desktop-features-content" id="desktop-features-content" className='w-full h-full resize-none font-notoThai px-3 py-0.5 outline-none border-[0.5px] border-inputBorder'></textarea>
          </div>
          
          <div className='inline-flex justify-start items-start space-x-2 font-notoThai text-lg'>
            <div>
              เก็บเนื้อหา
            </div>

            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? 'bg-main' : 'bg-white border border-main'
              } relative inline-flex h-6 w-11 items-center rounded-full transition duration-150 ease-in`}
            >
              <span
                className={`${
                  enabled ? 'translate-x-6 bg-white' : 'translate-x-1 bg-main'
                } inline-flex h-4 w-4 transform rounded-full justify-center items-center transition duration-150 ease-in`}
              
              > 
                {enabled ? <HiOutlineCheck className='h-3 w-3 text-main'/>: <HiOutlineX className='h-3 w-3 text-white'/>}
              </span>
            </Switch>
          </div>
          
          <div className='w-full inline-flex justify-end items-center'>

          
          <button 
            onClick={saveHandler}
            disabled={(title.trim().length === 0 || content.trim().length === 0) && true} 
            type='submit' 
            className={` py-2 bg-main px-5 text-white font-notoThai text-xl border border-main transition duration-150 ease-in hover:bg-white hover:text-main ${(title.trim().length === 0 || content.trim().length === 0) ? 'opacity-50' : 'opacity-100'}`}>
              บันทึก
          </button>
          </div>

        </div>
        

        { isMobile && (
          <div className='py-36 bg-main relative flex justify-center items-center border-t-[0.5px] border-b-[0.5px] border-inputBorder'>
            
              <canvas id='mobile-content-image-processing' width={400} height={400} className='z-50'></canvas>
              <button onClick={download} className='absolute bottom-5 left-5 bg-white px-3 py-2 text-main font-notoThai text-xl'>ดาวน์โหลด</button>
              <button onClick={clear} className="absolute bottom-5 left-36 bg-white px-3 py-2 text-main font-notoThai text-xl">เคลียร์</button>
            
          </div>           
        )}
      </div>

      
    </div>
  )
}

export const getServerSideProps: any = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login'
      }
    }
  }
  return {
    props: {
      session
    }
  }
}

export default FeaturesPage