'use client'

import React from 'react'
import { useLoginUser } from '../../hooks/User/useLoginUser'

import axios from 'axios' // Can be removed after setting logout in the correct place.

const RegisterBusiness: React.FC = () => {
   const {
      loginData,
      error,
      handleChange,
      handleSubmit
   } = useLoginUser();

   const handleLogOut = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {}, { withCredentials: true })
         .catch(error => console.error("Cannot logout: ", error))
   }

   return (
      <div className="container mx-auto p-4">
         <h2 className="text-2xl mb-4">Entra a tu cuenta</h2>
         {error && <p className="text-red-500">{error}</p>}
         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label className="block">Nombre o email:</label>
               <input
                  type="text"
                  name="identifier"
                  value={loginData.identifier}
                  onChange={handleChange}
                  className="border p-2 w-full"
               />
            </div>
            <div>
               <label className="block">Contraseña:</label>
               <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="border p-2 w-full"
               />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
               Login
            </button>
         </form>

         <form onSubmit={handleLogOut} className="space-y-4">
            <button type="submit" className="bg-blue-500 text-white p-2 my-4 rounded">
               Logout
            </button>
         </form>
      </div>
   )
}

export default RegisterBusiness