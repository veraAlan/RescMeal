'use client'
import { useModifyClient } from '@/hooks/Client/useModifyClient';
import React from 'react'

const RegisterClient: React.FC = () => {
   const {
      clientForm,
      clientErrors,
      handleChange,
      handleSubmit
   } = useModifyClient();

   return (
      <div id="myElement" className="container mx-auto p-4">
         <h2 className="text-2xl mb-4">Modificar Cliente</h2>
         <form onSubmit={handleSubmit} className="space-y-4">
            <label className='block text-lg'>Informacion Personal</label>
            <div>
               <label className="block">Nombre:</label>
               <input
                  type="text"
                  name="name"
                  value={clientForm.name}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  maxLength={20}
               />
               {clientErrors.name && <p className="text-red-500">{clientErrors.name}</p>}
            </div>
            <div>
               <label className="block">Apellido:</label>
               <input
                  type="text"
                  name="last_name"
                  value={clientForm.last_name}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  maxLength={20}
               />
               {clientErrors.last_name && <p className="text-red-500">{clientErrors.last_name}</p>}
            </div>
            <div>
               <label className="block">Telefono:</label>
               <input
                  type="text"
                  name="phone"
                  value={clientForm.phone}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  maxLength={15}
               />
               {clientErrors.phone && <p className="text-red-500">{clientErrors.phone}</p>}
            </div>
            <div>
               <label className="block">Fecha de Nacimiento:</label>
               <input
                  type="date"
                  name="birthdate"
                  value={clientForm.birthdate}
                  onChange={handleChange}
                  className="border p-2 w-full"
               />
               {clientErrors.birthdate && <p className="text-red-500">{clientErrors.birthdate}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Modificar</button>
         </form>
      </div>
   );
};

export default RegisterClient;
