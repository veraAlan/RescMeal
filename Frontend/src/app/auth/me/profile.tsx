import axios from 'axios'
import { useEffect, useState } from 'react'
import BusinessProfile from './BusinessProfile'
import ClientProfile from './ClientProfile'
import CarrierProfile from './CarrierProfile'

export interface Profile {
   username?: string
   email?: string
   role?: string
   password?: string
   business?: Object
   client?: Object
   carrier?: Object
}

export interface Role {
   name?: string
   type?: string
   address?: string
   schedule?: string
   cvu?: string
   image?: string
   lastName?: string
   last_name?: string
   balance?: number
   vehicleType?: string
   phone?: string
   birthdate?: string
}

export default () => {
   const [profileInfo, useProfile] = useState<Profile | null>(null)

   // TODO mandar a Hooks y Components los archivos necesarios.
   useEffect(() => {
      if (profileInfo == null) {
         axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true })
            .then(r => {
               useProfile(r.data)
            })
            .catch(e => {
               console.log(e)
            })
      }
   })

   return (
      <div className="container mx-auto my-4 p-4 border rounded-2xl border-4 border">
         {profileInfo &&
            <div className='grid grid-rows-2 grid-flow-col w-full pb-4 place-content-evenly'>
               <label htmlFor="username" className='font-semibold text-lg text-center'>Nombre de Usuario: </label>
               <h2 id="username" className='p-2 text-2xl text-center'>{profileInfo.username}</h2>
               <label htmlFor="email" className='font-semibold text-lg text-center'>Email: </label>
               <h2 id="email" className='p-2 text-2xl text-center'>{profileInfo.email}</h2>
            </div>
         }

         {profileInfo?.business &&
            <BusinessProfile profile={profileInfo.business} />
         }
         {/* Need to create visualization of Client and Carrier */}
         {profileInfo?.client &&
            <ClientProfile profile={profileInfo.client} />
         }
         {profileInfo?.carrier &&
            <CarrierProfile profile={profileInfo.carrier} />
         }
      </div >
   );
};