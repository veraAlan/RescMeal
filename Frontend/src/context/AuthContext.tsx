'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
   isLoggedIn: boolean
   login: (token: string) => void
   logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

   useEffect(() => {
      const token = localStorage.getItem('token')
      if (token != null && token != '') {
         setIsLoggedIn(true)
      }
   }, [])

   const login = (token: string) => {
      localStorage.setItem('token', token)
      setIsLoggedIn(true)
   }

   const logout = () => {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
   }

   return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
         {children}
      </AuthContext.Provider>
   )
}

export { AuthContext }
