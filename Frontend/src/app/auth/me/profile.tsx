import { useEffect, useState } from 'react'
import BusinessProfile from './BusinessProfile'
import ClientProfile from './ClientProfile'
import CarrierProfile from './CarrierProfile'
import axiosConfig from '@/utils/axiosConfig'
import { toast } from 'react-toastify'

export interface Profile {
   id: number
   username?: string
   email?: string
   role?: string
   password?: string
   business?: Object
   client?: Object
   carrier?: Object
}

export default () => {
   const [profileInfo, useProfile] = useState<Profile | null>(null)

   useEffect(() => {
      async function fetchProfile() {
         await axiosConfig.get(`/api/auth/me`)
            .then(r => { useProfile(r.data) })
            .catch(() => { toast.error('No se pudo cargar el perfil.') })
      }
      fetchProfile()
   }, [])

   return (
      <div className="container mx-auto my-4 p-6 bg-white text-black shadow-2xl rounded-2xl">
         {profileInfo &&
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4 text-xl border rounded-xl border-gray-300'>
               <div className='col-span-1 md:col-span-3 text-center'>
                  <h3 className='font-semibold'>Nombre de Usuario:</h3>
                  <p id="username" className='text-lg'>{profileInfo.username}</p>
               </div>
               <div className='col-span-1 md:col-span-3 text-center'>
                  <h3 className='font-semibold'>Email:</h3>
                  <p id="email" className='text-lg'>{profileInfo.email}</p>
               </div>
               <div className='col-span-1 md:col-span-3 flex justify-end'>
                  <a href='/auth/me/user'>
                     <button className='border border-gray-300 rounded-xl px-4 py-2 text-xl font-bold bg-blue-500 text-white hover:bg-blue-700 transition duration-300'>Modificar datos</button>
                  </a>
               </div>
            </div>
         }

         {profileInfo?.business && <BusinessProfile profile={profileInfo.business} />}
         {profileInfo?.client && <ClientProfile profile={profileInfo.client} />}
         {profileInfo?.carrier && <CarrierProfile profile={profileInfo.carrier} />}
      </div>
   )
}