import React from 'react'
import { useLoginUser } from '../../hooks/User/useLoginUser'

const RegisterBusiness: React.FC = () => {
   const {
      loginData,
      error,
      handleChange,
      handleSubmit
   } = useLoginUser();

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
      </div>
   )
}

export default RegisterBusiness