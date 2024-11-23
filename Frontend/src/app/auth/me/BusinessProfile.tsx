import FoodCard from '@/components/Food/FoodCard'
import Role from './profile'
import useBusinessFoods from './useBusinessFood'

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
   const { businessFoods } = useBusinessFoods()

   return (
      <div>
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
         </div>
         <div>
            {businessFoods == null ? (
               <p className="text-center text-gray-500 p-4">No tiene publicaciones de comidas.</p>
            ) : (
               <div className="flex flex-col items-center w-full max-w-4xl p-4">
                  {businessFoods.map((food) => (
                     <div key={food.name} className='w-full gap-2 flex flex-cols-2 p-4'>
                        <FoodCard key={food.id} food={food} />
                        <a href={'/food/modify?food=' + food.id} className='border border-2 rounded-xl border-slate-500 p-4 text-xl fit-content h-25'>Modificar</a>
                     </div>
                  ))}
               </div>
            )}
         </div>
         <a href="../update/carrier">
            <button className="btn-modificar">Modificar Datos</button>
         </a>
      </div>
   )
}