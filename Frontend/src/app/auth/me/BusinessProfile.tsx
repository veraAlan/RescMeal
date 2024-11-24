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
         <div className='relative grid grid-cols-3 grid-flow-row w-full p-4 text-2xl border rounded-xl border-2'>
            <h3 className='w-full h-full rounded-xl font-semibold text-center'>Nombre de Local: </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.name}</h4>
            <h3 className='w-full h-full rounded-xl font-semibold text-center'>Typo de Local: </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.type}</h4>
            <h3 className='w-full h-full rounded-xl font-semibold text-center'>Direccion: </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.address}</h4>
            <h3 className='w-full h-full rounded-xl font-semibold text-center'>Celular: </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.phone}</h4>
            <h3 className='w-full h-full rounded-xl font-semibold text-center'>Horario: </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.schedule}</h4>
            <h3 className='w-full h-full rounded-xl font-semibold text-center'>CVU: </h3>
            <h4 className='w-full h-full rounded-xl col-span-2 p-2 text-center'>{props.profile?.cvu}</h4>
            <span className='grid place-items-end col-span-3 w-full'>
               <a href='/auth/me/business'>
                  <button className='border border-white rounded-xl w-full p-4 text-xl font-bold bg-cyan-500 text-black hover:bg-cyan-700 hover:text-white'>Modificar Datos</button>
               </a>
            </span>
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
      </div>
   )
}