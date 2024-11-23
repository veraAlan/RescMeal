'use client'
import { createContext, useState, useEffect, ReactNode } from 'react'
import axiosConfig from '../utils/axiosConfig'
import { redirect } from 'next/navigation'

interface AuthContextType {
   isLoggedIn: boolean
   sessionRole: string | null
   login: (token: string) => void
   logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
   const [sessionRole, setSessionRole] = useState<string | null>(null)
   const [sessionError, setSessionError] = useState<string | null>(null)

   useEffect(() => {
      const token = localStorage.getItem('token')
      if (token != null && token != '') {
         setIsLoggedIn(true)
         const role = localStorage.getItem('role')
         if (role != null && role != '') setSessionRole(role)
      } else {
         axiosConfig.get('/api/auth/signout')
            .then(() => {
               localStorage.removeItem('token')
               localStorage.removeItem('role')
               setIsLoggedIn(false)
            })
            .catch(e => { setSessionError(e) })
      }
   }, [isLoggedIn])

   const login = (token: string) => {
      localStorage.setItem('token', token)
      axiosConfig.get('/api/auth/me')
         .then(r => {
            const role = r.data.roles[0].name.slice(5,)
            localStorage.setItem('role', role)
            setSessionRole(role)
         })
         .catch(e => setSessionError("Error consiguiendo rol: " + e))
      setIsLoggedIn(true)
   }

   const logout = () => {
      axiosConfig.get('/api/auth/signout')
         .then(() => {
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            setIsLoggedIn(false)
         })
         .catch(e => { setSessionError(e) })
      redirect("/")
   }

   return (
      <AuthContext.Provider value={{ isLoggedIn, sessionRole, login, logout }}>
         {children}
      </AuthContext.Provider>
   )
}

export { AuthContext }
