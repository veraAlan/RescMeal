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
   return (
      <div className='grid grid-rows-6 grid-flow-col w-full p-4 border rounded-xl border-2'>
         <label htmlFor="username" className='font-semibold text-lg self-center'>Nombre de Local: </label>
         <h2 id="username" className='p-2 text-2xl'>{props.profile?.name}</h2>
         <label htmlFor="type" className='font-semibold text-lg self-center'>Typo de Local: </label>
         <h2 id="type" className='p-2 text-2xl'>{props.profile?.type}</h2>
         <label htmlFor="address" className='font-semibold text-lg self-center'>Direccion: </label>
         <h2 id="address" className='p-2 text-2xl'>{props.profile?.address}</h2>
         <label htmlFor="phone" className='font-semibold text-lg self-center'>Celular: </label>
         <h2 id="phone" className='p-2 text-2xl'>{props.profile?.phone}</h2>
         <label htmlFor="schedule" className='font-semibold text-lg self-center'>Horario: </label>
         <h2 id="schedule" className='p-2 text-2xl'>{props.profile?.schedule}</h2>
         <label htmlFor="schedule" className='font-semibold text-lg self-center'>CVU: </label>
         <h2 id="schedule" className='p-2 text-2xl'>{props.profile?.cvu}</h2>
         <a href="../update/carrier">
            <button className="btn-modificar">Modificar Datos</button>
         </a>
      </div>
   )
}