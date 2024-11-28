import normalizePhone from '@/utils/normalizePhone'
import Role from './profile'
import normalizeDate from '@/utils/normalizeDate'

export interface Role {
   name?: string
   type?: string
   address?: string
   schedule?: string
   cvu?: string
   image?: string
   last_name?: string
   balance?: number
   vehicle_type?: string
   phone?: string
   birthdate?: string
}

export default (props: { profile: Role | null }) => {
   let phone, birthdate
   if (props.profile?.phone) phone = normalizePhone(props.profile.phone)
   if (props.profile?.birthdate) birthdate = normalizeDate(props.profile.birthdate)

   return (
      <div className='relative grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-6 bg-white text-black shadow-lg rounded-lg'>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Nombre:</h3>
            <p className='text-center'>{props.profile?.name}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Apellido:</h3>
            <p className='text-center'>{props.profile?.last_name}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Celular:</h3>
            <p className='text-center'>{phone}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Balance:</h3>
            <p className='text-center'>AR$ {props.profile?.balance}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Fecha de Nacimiento:</h3>
            <p className='text-center'>{birthdate}</p>
         </div>
         <div className='col-span-1 md:col-span-3 flex justify-end'>
            <a href='/auth/me/client'>
               <button className='border border-gray-300 rounded-xl px-4 py-2 text-xl font-bold bg-blue-500 text-white hover:bg-blue-700 transition duration-300'>Modificar datos</button>
            </a>
         </div>
      </div>
   )
}