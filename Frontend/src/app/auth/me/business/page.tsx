'use client'
import React from 'react'
import { useUpdateBusiness } from './useUpdateBusiness'
import AddressPicker from '@/components/Map/AddressPicker'

const RegisterBusiness: React.FC = () => {
   const {
      businessForm,
      businessErrors,
      imageError,
      setAddress,
      setAddressLat,
      setAddressLong,
      handleChange,
      handleImage,
      handleSubmit
   } = useUpdateBusiness()

   return (
      <div className="container mx-auto p-4">
         <h2 className="text-3xl font-semibold mb-4">Registrar Negocio</h2>
         <form onSubmit={handleSubmit} className="space-y-4">
            <label className='block text-lg'>Informacion de Negocio</label>
            <div>
               <div>
                  <label className="block">Logo/Portada: (Opcional)</label>
                  <input
                     type="file"
                     name="image"
                     onChange={handleImage}
                     className="border p-2 w-full"
                  />
                  {imageError && <p className="text-red-500">{imageError}</p>}
               </div>
               <div>
                  <label className="block">Nombre:</label>
                  <input
                     type="text"
                     name="name"
                     value={businessForm.name}
                     onChange={handleChange}
                     className="border p-2 w-full"
                  />
                  {businessErrors.name && <p className="text-red-500">{businessErrors.name}</p>}
               </div>
               <div>
                  <label className="block">Tipo de Negocio:</label>
                  <input
                     type="text"
                     name="type"
                     value={businessForm.type}
                     onChange={handleChange}
                     className="border p-2 w-full"
                  />
                  {businessErrors.type && <p className="text-red-500">{businessErrors.type}</p>}
               </div>
               <div>
                  <label className="block">Nueva dirección: (Opcional)</label>
                  <AddressPicker
                     setAddress={setAddress}
                     setAddressLat={setAddressLat}
                     setAddressLong={setAddressLong}
                  />
                  {businessErrors.address && <p className="text-red-500">{businessErrors.address}</p>}
               </div>
               <div>
                  <label className="block">Horario:</label>
                  <input
                     type="text"
                     name="schedule"
                     value={businessForm.schedule}
                     onChange={handleChange}
                     className="border p-2 w-full"
                  />
                  {businessErrors.schedule && <p className="text-red-500">{businessErrors.schedule}</p>}
               </div>
               <div>
                  <label className="block">CVU:</label>
                  <input
                     type="text"
                     name="cvu"
                     value={businessForm.cvu}
                     onChange={handleChange}
                     className="border p-2 w-full"
                  />
                  {businessErrors.cvu && <p className="text-red-500">{businessErrors.cvu}</p>}
               </div>
               <div>
                  <label className="block">Teléfono:</label>
                  <input
                     type="text"
                     name="phone"
                     value={businessForm.phone}
                     onChange={handleChange}
                     className="border p-2 w-full"
                  />
                  {businessErrors.phone && <p className="text-red-500">{businessErrors.phone}</p>}
               </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
               Actualizar datos
            </button>
         </form>
      </div>
   )
}

export default RegisterBusiness