'use client'
import { createContext, useState, useEffect, ReactNode } from 'react'
import axiosConfig from '@/utils/axiosConfig'
import { redirect } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
               redirect('/')
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
            toast.success("Sesion iniciada!", {
               position: "bottom-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark"
            })
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
            toast.success("Sesion cerrada!", {
               position: "bottom-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark"
            })
            redirect("/")
         })
         .catch(e => {
            toast.error(e, {
               position: "bottom-right",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "dark"
            })
         })
   }

   return (
      <AuthContext.Provider value={{ isLoggedIn, sessionRole, login, logout }}>
         <ToastContainer />
         {children}
      </AuthContext.Provider>
   )
}

export { AuthContext }