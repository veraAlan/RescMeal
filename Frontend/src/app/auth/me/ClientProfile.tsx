import Role from './profile'

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
   // TODO Mejorar formatting de fecha.
   return (
      <div className='grid grid-rows-6 grid-flow-col w-full p-4 border rounded-xl border-2'>
         <label htmlFor="username" className='font-semibold text-lg self-center'>Nombre: </label>
         <h2 id="username" className='p-2 text-2xl'>{props.profile?.name}</h2>
         <label htmlFor="type" className='font-semibold text-lg self-center'>Apellido: </label>
         <h2 id="type" className='p-2 text-2xl'>{props.profile?.last_name}</h2>
         <label htmlFor="phone" className='font-semibold text-lg self-center'>Celular: </label>
         <h2 id="phone" className='p-2 text-2xl'>{props.profile?.phone}</h2>
         <label htmlFor="schedule" className='font-semibold text-lg self-center'>balance: </label>
         <h2 id="schedule" className='p-2 text-2xl'>AR$ {props.profile?.balance}</h2>
         <label htmlFor="schedule" className='font-semibold text-lg self-center'>Fecha de Nacimiento: </label>
         <h2 id="schedule" className='p-2 text-2xl'>{props.profile?.birthdate?.slice(0, 10)}</h2>
      </div>
   )
}