import { useListBusinesses } from '@/hooks/Business/useListBusinesses'


export default () => {

   const { businesses } = useListBusinesses()

   return (
      <div className="container mx-auto my-4 p-4 border rounded-2xl border-4 border">
         <h1>Encontra tu local favorito</h1>
         <div>
            {businesses == null ? (
               <p className="text-center text-gray-500 p-4">No hay locales registrados.</p>
            ) : (
               <div className="flex flex-col items-center w-full max-w-4xl p-4">
                  {businesses.map((business) => (
                     <div>
                        <img className="w-full h-48 object-cover md:w-48 md:h-auto" src={business.image} alt={business.name} />
                        <div key={business.name} className='w-full gap-2 flex flex-cols-2 p-4'>
                        <h3 className='border border-2 rounded-xl border-slate-500 p-4 text-xl fit-content h-25'> {business.name}</h3>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div >
   )
}