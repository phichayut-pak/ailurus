import '../styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SessionProvider } from "next-auth/react"

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { pathname } = useRouter()
  const [isMobileNavClicked, setIsMobileNavClicked] = useState<boolean>(false)


  return (
  <>
    <Head>
      <title>Ailurus</title>
    </Head>
    <SessionProvider session={session}>
      <Navbar isHome={pathname === '/'? true : false} isForgetPassword={pathname === '/auth/forgot_password' ? true : false } isResetPassword={pathname === '/auth/reset_password' ? true : false} isFeatures={pathname === '/features' ? true : false} setMobileNavClicked={setIsMobileNavClicked}>
        <Component {...pageProps} />
      </Navbar>
      {/* <Footer isHome={pathname === '/'? true: false} isMobileNavClicked={isMobileNavClicked} /> */}
    </SessionProvider>
  </>
  )
}

export default MyApp
