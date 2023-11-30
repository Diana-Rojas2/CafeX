'use client'

import { SessionProvider } from "next-auth/react"

const SessionContextGlobal = ({children} : {children : React.ReactNode}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionContextGlobal