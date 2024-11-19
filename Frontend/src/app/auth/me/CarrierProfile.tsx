import Role from './profile'

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

export default (props: { profile: Role | null }) => {
   // TODO POR FAVOR normalizar valor de Carrier, tiene lastName cuando es last_name en la base de datos
   // Relacionado a ^^, vehicleType. Tambien se puede usar "_" en tsx, es mas rapido que tengamos el mismo nombre en la DB y en el front asi no tenemos que confirmar que estemos escribiendo algo bien o no.
   return (
      <div className='grid grid-rows-6 grid-flow-col w-full p-4 border rounded-xl border-2'>
         <label htmlFor="username" className='font-semibold text-lg self-center'>Nombre: </label>
         <h2 id="username" className='p-2 text-2xl'>{props.profile?.name}</h2>
         <label htmlFor="type" className='font-semibold text-lg self-center'>Apellido: </label>
         <h2 id="type" className='p-2 text-2xl'>{props.profile?.lastName}</h2>
         <label htmlFor="address" className='font-semibold text-lg self-center'>Tipo de Vehiculo: </label>
         <h2 id="address" className='p-2 text-2xl'>{props.profile?.vehicleType}</h2>
         <label htmlFor="phone" className='font-semibold text-lg self-center'>Celular: </label>
         <h2 id="phone" className='p-2 text-2xl'>{props.profile?.phone}</h2>
         <label htmlFor="schedule" className='font-semibold text-lg self-center'>Fecha de Nacimiento: </label>
         <h2 id="schedule" className='p-2 text-2xl'>{props.profile?.birthdate?.slice(0, 10)}</h2>
      </div>
   )
}