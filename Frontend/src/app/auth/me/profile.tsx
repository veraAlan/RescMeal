import axios from 'axios'
import { useEffect, useState } from 'react';

export interface Profile {
   username?: string
   email?: string
   role?: string
   password?: string
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
   const [roleInfo, useRole] = useState<Role | null>(null)

   useEffect(() => {
      if (profileInfo == null) {
         axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true })
            .then(r => {
               console.log('User: ', r.data)
               axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true })
                  .then(r => {
                     console.log(r.data)
                     useRole('Role: ', r.data)
                  })
                  .catch(e => {
                     console.log(e)
                  })
               useProfile(r.data)
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
      </div>
   );
};