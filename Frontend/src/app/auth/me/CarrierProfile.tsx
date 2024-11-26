import normalizePhone from '@/utils/normalizePhone'
import Role from './profile'
import normalizeDate from '@/utils/normalizeDate'
import { useCarrierDelivery } from '@/components/Delivery/useCarrierDelivery'

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

   const { carrierDeliverys } = useCarrierDelivery()

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
         <h3 className='w-full rounded-xl font-semibold text-center p-2 mt-2 border border-2 rounded-xl'>Historial de pedidos: </h3>
         <div className='grid place-items-end col-span-3 w-full border border-2 rounded-xl'>
            {carrierDeliverys == null ? (
               <p className="text-center text-gray-500 p-4">No tiene pedidos registrados a su cuenta.</p>
            ) : (
               <div className="items-center w-full max-w-4xl p-4">
                  {carrierDeliverys?.map((delivery) => (
                     <div key={delivery.id} className='w-full gap-2 border border-slate-300 rounded-2xl mb-4'>
                        <p className='px-4 py-2'><strong>Tiempo de entrega:</strong> {delivery.delivery_time}</p>
                        <p className='px-4 py-2'><strong>Estado:</strong> {delivery.delivery_state}</p>
                        <p className='px-4 py-2'><strong>Propina:</strong> {delivery.tip ? (delivery.tip) : ("Sin Propina")}</p>
                        <div className='py-2 grid grid-rows-subgrid grid-span-2 grid-cols-2 gap-2 border rounded-xl border-slate-500 p-2'>
                           <h3 className='row-span-3 text-center'>Comidas compradas: </h3>
                           {delivery.purchase.purchasedItems.map(item => (
                              <h2>{item.food.name}</h2>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}