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
   return (<div>
      <label htmlFor="username" className='font-semibold text-lg'>Nombre de Local: </label>
      <h2 id="username" className='p-2 text-2xl'>{props.profile?.name}</h2>
      <label htmlFor="type" className='font-semibold text-lg'>Typo de Local: </label>
      <h2 id="type" className='p-2 text-2xl'>{props.profile?.type}</h2>
      <label htmlFor="address" className='font-semibold text-lg'>Direccion: </label>
      <h2 id="address" className='p-2 text-2xl'>{props.profile?.address}</h2>
      <label htmlFor="phone" className='font-semibold text-lg'>Celular: </label>
      <h2 id="phone" className='p-2 text-2xl'>{props.profile?.phone}</h2>
      <label htmlFor="schedule" className='font-semibold text-lg'>Horario: </label>
      <h2 id="schedule" className='p-2 text-2xl'>{props.profile?.schedule}</h2>
   </div>)
}