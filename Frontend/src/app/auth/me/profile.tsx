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
      <div className="container relative mx-auto my-4 p-4 border rounded-2xl border-4 border bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 shadow-2xl">
         {profileInfo &&
            <div className='grid grid-cols-3 grid-flow-row text-2xl gap-4 pt-8 px-4 pb-4 m-2 place-content-evenly border rounded-xl border-2'>
               <h3 className='font-semibold text-3xl text-center'>Nombre de Usuario: </h3>
               <h4 id="username" className='col-span-2 text-3xl text-center'>{profileInfo.username}</h4>
               <h3 className='font-semibold text-3xl text-center'>Email: </h3>
               <h4 id="email" className='col-span-2 text-3xl text-center'>{profileInfo.email}</h4>
               <span className='grid place-items-end col-span-3 w-full'>
                  <a href='/auth/me/user'>
                     <button className='border border-white rounded-xl p-4 text-xl font-bold bg-cyan-500 text-black hover:bg-cyan-700 hover:text-white'>Modificar datos</button>
                  </a>
               </span>
            </div>

         }

         {profileInfo?.business && <BusinessProfile profile={profileInfo.business} />}
         {profileInfo?.client && <ClientProfile profile={profileInfo.client} />}
         {profileInfo?.carrier && <CarrierProfile profile={profileInfo.carrier} />}
      </div>
   )
}