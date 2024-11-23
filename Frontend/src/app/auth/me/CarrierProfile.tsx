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
   // TODO POR FAVOR normalizar valor de Carrier, tiene lastName cuando es last_name en la base de datos
   // Relacionado a ^^, vehicleType. Tambien se puede usar "_" en tsx, es mas rapido que tengamos el mismo nombre en la DB y en el front asi no tenemos que confirmar que estemos escribiendo algo bien o no.
   return (
      <div className='grid grid-rows-6 grid-flow-col w-full p-4 border rounded-xl border-2'>
         <label htmlFor="name" className='font-semibold text-lg self-center'>Nombre: </label>
         <h2 id="name" className='p-2 text-2xl'>{props.profile?.name}</h2>
         <label htmlFor="last_name" className='font-semibold text-lg self-center'>Apellido: </label>
         <h2 id="last_name" className='p-2 text-2xl'>{props.profile?.last_name}</h2>
         <label htmlFor="vehicle_type" className='font-semibold text-lg self-center'>Tipo de Vehiculo: </label>
         <h2 id="vehicle_type" className='p-2 text-2xl'>{props.profile?.vehicle_type}</h2>
         <label htmlFor="phone" className='font-semibold text-lg self-center'>Celular: </label>
         <h2 id="phone" className='p-2 text-2xl'>{props.profile?.phone}</h2>
         <label htmlFor="birthdate" className='font-semibold text-lg self-center'>Fecha de Nacimiento: </label>
         <h2 id="birthdate" className='p-2 text-2xl'>{props.profile?.birthdate?.slice(0, 10)}</h2>
      </div>
   )
}