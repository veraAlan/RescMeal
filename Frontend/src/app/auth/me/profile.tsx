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

export default function UserProfile() {
   const [profileInfo, setProfileInfo] = useState<Profile | null>(null)

   useEffect(() => {
      async function fetchProfile() {
         try {
            const response = await axiosConfig.get(`/api/auth/me`)
            setProfileInfo(response.data)
         } catch {
            toast.error('No se pudo cargar el perfil.')
         }
      }
      fetchProfile()
   }, [])

   return (
      <div className="container mx-auto mt-16 mb-8 p-4 sm:p-8 bg-white text-black shadow-xl rounded-xl max-w-screen-lg">
         {profileInfo ? (
            <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 text-lg border rounded-xl border-gray-300">
               <div className="w-full flex flex-col items-start text-center">
                  <h3 className="font-semibold text-xl text-gray-700 mb-2">
                     Nombre de Usuario: <span className="text-gray-900">{profileInfo.username}</span>
                  </h3>
               </div>
               <div className="w-full flex flex-col items-start text-center">
                  <h3 className="font-semibold text-xl text-gray-700 mb-2">
                     Email: <span className="text-gray-900">{profileInfo.email}</span>
                  </h3>
               </div>
               <div className="flex justify-center w-full mt-4">
                  <a href="/auth/me/user">
                     <button className="border border-gray-300 rounded-lg px-6 py-2 font-bold bg-blue-600 text-white hover:bg-blue-700 transition duration-300">Modificar datos</button>
                  </a>
               </div>
            </div>
         ) : (
            <p className="text-center text-red-500">Cargando...</p>
         )}
         
         {profileInfo?.business && <BusinessProfile profile={profileInfo.business} />}
         {profileInfo?.client && <ClientProfile profile={profileInfo.client} />}
         {profileInfo?.carrier && <CarrierProfile profile={profileInfo.carrier} />}
      </div>
   )   
}