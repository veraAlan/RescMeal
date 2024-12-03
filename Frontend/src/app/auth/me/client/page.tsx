'use client'
import { useModifyClient } from '@/hooks/Client/useUpdateClient';
import React from 'react';
import Link from 'next/link';

const RegisterClient: React.FC = () => {
   const {
      clientForm,
      clientErrors,
      handleChange,
      handleSubmit
   } = useModifyClient();

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div id="myElement" className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-4 text-center">Modificar Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               <label className='block text-lg font-semibold'>Informacion Personal</label>
               <div>
                  <label className="block mb-1">Nombre:</label>
                  <input
                     type="text"
                     name="name"
                     value={clientForm.name}
                     onChange={handleChange}
                     className="border p-2 w-full rounded"
                     maxLength={20}
                  />
                  {clientErrors.name && <p className="text-red-500">{clientErrors.name}</p>}
               </div>
               <div>
                  <label className="block mb-1">Apellido:</label>
                  <input
                     type="text"
                     name="last_name"
                     value={clientForm.last_name}
                     onChange={handleChange}
                     className="border p-2 w-full rounded"
                     maxLength={20}
                  />
                  {clientErrors.last_name && <p className="text-red-500">{clientErrors.last_name}</p>}
               </div>
               <div>
                  <label className="block mb-1">Telefono:</label>
                  <input
                     type="text"
                     name="phone"
                     value={clientForm.phone}
                     onChange={handleChange}
                     className="border p-2 w-full rounded"
                     maxLength={15}
                  />
                  {clientErrors.phone && <p className="text-red-500">{clientErrors.phone}</p>}
               </div>
               <div>
                  <label className="block mb-1">Fecha de Nacimiento:</label>
                  <input
                     type="date"
                     name="birthdate"
                     value={clientForm.birthdate}
                     onChange={handleChange}
                     className="border p-2 w-full rounded"
                  />
                  {clientErrors.birthdate && <p className="text-red-500">{clientErrors.birthdate}</p>}
               </div>
               <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">Modificar</button>
            </form>
            <div className="mt-4 text-center">
               <Link href="/auth/me" legacyBehavior>
                  <a className="bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-600 block text-center">Volver</a>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default RegisterClient;