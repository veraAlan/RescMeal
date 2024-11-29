import React from 'react';
import { useLoginUser } from '../../hooks/User/useLoginUser';

const LoginUser: React.FC = () => {
   const {
      loginData,
      error,
      handleChange,
      handleSubmit
   } = useLoginUser();

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
            <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Entra a tu cuenta</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block mb-1 font-medium">Nombre o email:</label>
                  <input
                     type="text"
                     name="identifier"
                     value={loginData.identifier}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
               </div>
               <div>
                  <label className="block mb-1 font-medium">Contraseña:</label>
                  <input
                     type="password"
                     name="password"
                     value={loginData.password}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
               </div>
               <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                  Login
               </button>
            </form>
         </div>
      </div>
   );
};

export default LoginUser;