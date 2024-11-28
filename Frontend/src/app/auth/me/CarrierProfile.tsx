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
      <div className='relative grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-6 bg-white text-black shadow-lg rounded-lg'>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Nombre:</h3>
            <p className='text-center'>{props.profile?.name}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Apellido:</h3>
            <p className='text-center'>{props.profile?.last_name}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Tipo de Vehículo:</h3>
            <p className='text-center'>{props.profile?.vehicle_type}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Celular:</h3>
            <p className='text-center'>{phone}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Fecha de Nacimiento:</h3>
            <p className='text-center'>{birthdate}</p>
         </div>
         <div className='col-span-1 md:col-span-3 flex justify-end'>
            <a href='/auth/me/carrier'>
               <button className='border border-gray-300 rounded-xl px-4 py-2 text-xl font-bold bg-blue-500 text-white hover:bg-blue-700 transition duration-300'>Modificar datos</button>
            </a>
         </div>
         <h3 className='w-full font-semibold text-lg text-center p-2 mt-4 border border-gray-300 rounded-lg'>Historial de pedidos:</h3>
         <div className='col-span-1 md:col-span-3 w-full border border-gray-300 rounded-lg p-4'>
            {carrierDeliverys == null ? (
               <p className="text-center text-gray-500">No tiene pedidos registrados a su cuenta.</p>
            ) : (
               <div className="w-full max-w-4xl mx-auto">
                  {carrierDeliverys?.map((delivery) => (
                     <div key={delivery.id} className='w-full mb-4 p-4 border border-gray-300 rounded-lg'>
                        <p><strong>Tiempo de entrega:</strong> {delivery.delivery_time}</p>
                        <p><strong>Estado:</strong> {delivery.delivery_state}</p>
                        <p><strong>Propina:</strong> {delivery.tip ? delivery.tip : "Sin Propina"}</p>
                        <div className='grid grid-cols-1 gap-2 border-t border-gray-200 pt-2 mt-2'>
                           <h4 className='font-semibold text-center'>Comidas compradas:</h4>
                           {delivery.purchase.purchasedItems.map(item => (
                              <h2 className='text-center'>{item.food.name}</h2>
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