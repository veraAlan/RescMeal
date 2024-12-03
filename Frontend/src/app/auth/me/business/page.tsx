'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useUpdateBusiness } from '@/hooks/Business/useUpdateBusiness'
import AddressPicker from '@/components/Map/AddressPicker'
import Image from 'next/image'

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

   const [previewImage, setPreviewImage] = useState<string | null>(null);

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreviewImage(reader.result as string);
         };
         reader.readAsDataURL(file);
         handleImage(event);
      }
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
            <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Registrar Negocio</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               <label className='block text-lg mb-1 font-medium'>Información de Negocio</label>
               <div>
                  <div>
                     <label className="block mb-1 font-medium">Logo/Portada: (Opcional)</label>
                     <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="border rounded-lg p-2 w-full"
                     />
                     {previewImage ? (
                        <div className="mt-4">
                           <Image
                              src={previewImage}
                              alt="Imagen de previsualización"
                              width={100}
                              height={100}
                              className="mx-auto rounded"
                           />
                        </div>
                     ) : (
                        <div className="mt-4">
                           <Image
                              src={`/Business/${businessForm.image}`}
                              alt="Imagen de previsualización"
                              width={100}
                              height={100}
                              className="mx-auto rounded"
                           />
                        </div>
                     )}
                     {imageError && <p className="text-red-500">{imageError}</p>}
                  </div>
                  <div>
                     <label className="block mb-1 font-medium">Nombre:</label>
                     <input
                        type="text"
                        name="name"
                        value={businessForm.name}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                     />
                     {businessErrors.name && <p className="text-red-500">{businessErrors.name}</p>}
                  </div>
                  <div>
                     <label className="block mb-1 font-medium">Tipo de Negocio:</label>
                     <input
                        type="text"
                        name="type"
                        value={businessForm.type}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                     />
                     {businessErrors.type && <p className="text-red-500">{businessErrors.type}</p>}
                  </div>
                  <div>
                     <label className="block mb-1 font-medium">Nueva dirección: (Opcional)</label>
                     <AddressPicker
                        setAddress={setAddress}
                        setAddressLat={setAddressLat}
                        setAddressLong={setAddressLong}
                     />
                     {businessErrors.address && <p className="text-red-500">{businessErrors.address}</p>}
                  </div>
                  <div>
                     <label className="block mb-1 font-medium">Horario:</label>
                     <input
                        type="text"
                        name="schedule"
                        value={businessForm.schedule}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                     />
                     {businessErrors.schedule && <p className="text-red-500">{businessErrors.schedule}</p>}
                  </div>
                  <div>
                     <label className="block mb-1 font-medium">CVU:</label>
                     <input
                        type="text"
                        name="cvu"
                        value={businessForm.cvu}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                     />
                     {businessErrors.cvu && <p className="text-red-500">{businessErrors.cvu}</p>}
                  </div>
                  <div>
                     <label className="block mb-1 font-medium">Teléfono:</label>
                     <input
                        type="text"
                        name="phone"
                        value={businessForm.phone}
                        onChange={handleChange}
                        className="border rounded-lg p-2 w-full"
                     />
                     {businessErrors.phone && <p className="text-red-500">{businessErrors.phone}</p>}
                  </div>
               </div>
               <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                  Actualizar datos
               </button>
            </form>
            <Link href="/auth/me" className="bg-gray-500 text-white p-3 rounded-lg w-full text-center hover:bg-gray-600 transition duration-300 mt-4 block">
               Volver
            </Link>
         </div>
      </div>
   )
}

export default RegisterBusiness