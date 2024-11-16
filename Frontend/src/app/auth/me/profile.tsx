import axios from 'axios'
import { useEffect, useState } from 'react';
import BusinessProfile from './BusinessProfile';

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

   useEffect(() => {
      if (profileInfo == null) {
         axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true })
            .then(r => {
               useProfile(r.data)
               console.log('User and Role: ', r.data)
            })
            .catch(e => {
               console.log(e)
            })
      }
   })

   return (
      <div className="container mx-auto p-4">
         {profileInfo &&
            <div>
               <label htmlFor="username" className='font-semibold text-lg'>Username: </label>
               <h2 id="username" className='p-2 text-2xl'>{profileInfo.username}</h2>
               <label htmlFor="email" className='font-semibold text-lg'>Email: </label>
               <h2 id="email" className='p-2 text-2xl'>{profileInfo.email}</h2>
            </div>
         }

         {profileInfo?.business &&
            <BusinessProfile profile={profileInfo.business} />
         }
         {/* Need to create visualization of Client and Carrier */}
         {profileInfo?.client &&
            <BusinessProfile profile={profileInfo.client} />
         }
         {profileInfo?.carrier &&
            <BusinessProfile profile={profileInfo.carrier} />
         }
      </div >
   );
};