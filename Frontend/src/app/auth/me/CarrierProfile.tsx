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
      <div className='relative grid grid-cols-3 grid-flow-row w-full p-4 text-2xl border rounded-xl border-2'>
         <h3 className='w-full h-full rounded-xl font-semibold text-center'>Nombre: </h3>
         <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.name}</h4>
         <h3 className='w-full h-full rounded-xl font-semibold text-center'>Apellido: </h3>
         <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.last_name}</h4>
         <h3 className='w-full h-full rounded-xl font-semibold text-center'>Tipo de Vehiculo: </h3>
         <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.vehicle_type}</h4>
         <h3 className='w-full h-full rounded-xl font-semibold text-center'>Celular: </h3>
         <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{phone}</h4>
         <h3 className='w-full h-full rounded-xl font-semibold pb-4 text-center'>Fecha de Nacimiento: </h3>
         <h4 className='w-full h-full rounded-xl col-span-2 pb-4 mb-4 text-center'>{birthdate}</h4>
         <span className='grid place-items-end col-span-3 w-full'>
            <a href='/auth/me/carrier'>
               <button className='border border-white rounded-xl p-4 text-xl font-bold bg-cyan-500 text-black hover:bg-cyan-700 hover:text-white'>Modificar datos</button>
            </a>
         </span>
      </div>
   )
}