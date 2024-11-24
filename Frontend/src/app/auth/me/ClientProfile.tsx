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
      <div className='relative grid grid-cols-3 grid-flow-row w-full p-4 border rounded-xl border-2 bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 shadow-lg'>
         <h2 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Nombre: </h2>
         <h3 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{props.profile?.name}</h3>
         <h2 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Apellido: </h2>
         <h3 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{props.profile?.last_name}</h3>
         <h2 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Celular: </h2>
         <h3 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{phone}</h3>
         <h2 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Balance: </h2>
         <h3 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>AR$ {props.profile?.balance}</h3>
         <h2 className='w-full h-full rounded-xl font-semibold text-3xl text-center'>Fecha de Nacimiento: </h2>
         <h3 className='w-full h-full rounded-xl col-span-2 p-2 text-3xl text-center'>{birthdate}</h3>
         <a href='/auth/me/client' className='absolute bottom-0 right-0'><button className='border border-white rounded-xl p-4 text-xl font-bold bg-cyan-500 text-black hover:bg-cyan-700 hover:text-white'>Modificar datos</button></a>
      </div>
   )
}