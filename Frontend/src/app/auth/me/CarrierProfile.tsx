import React, { useState } from 'react';
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
   const [filterDate, setFilterDate] = useState('');
   let phone, birthdate, creation_date
   if (props.profile?.phone) phone = normalizePhone(props.profile.phone)
   if (props.profile?.birthdate) birthdate = normalizeDate(props.profile.birthdate)

   const handleDateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => { 
      setFilterDate(event.target.value); 
   }; 
   const filteredDeliveries = carrierDeliverys?.filter(delivery => { 
      if (!filterDate) 
         return true; 
      const deliveryDate = new Date(delivery.purchase.creation_date).toISOString().split('T')[0]; 
      return deliveryDate === filterDate; });
   return (
      <div className='relative grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-6 bg-white text-black shadow-lg rounded-lg'>
         <div className='col-span-1'> <h3 className='font-semibold text-lg text-center'>Nombre:</h3>
            <p className='text-center'>{props.profile?.name}</p> </div> <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Apellido:</h3> <p className='text-center'>{props.profile?.last_name}</p>
         </div>
         <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Tipo de Vehículo:</h3>
            <p className='text-center'>{props.profile?.vehicle_type}</p>
         </div> <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Celular:</h3>
            <p className='text-center'>{phone}</p> </div> <div className='col-span-1'>
            <h3 className='font-semibold text-lg text-center'>Fecha de Nacimiento:</h3>
            <p className='text-center'>{birthdate}</p> </div> <div className='col-span-1 md:col-span-3 flex justify-end'>
            <a href='/auth/me/carrier'> <button className='border border-gray-300 rounded-xl px-4 py-2 text-xl font-bold bg-blue-500 text-white hover:bg-blue-700 transition duration-300'>Modificar datos</button>
            </a>
         </div>
         <h3 className='w-full font-semibold text-lg text-center p-2 mt-4 border border-gray-300 rounded-lg'>Historial de pedidos:</h3>
         <div className='col-span-1 md:col-span-3 w-full border border-gray-300 rounded-lg p-4'>
            <div className='mb-4'>
               <label className='block text-sm font-medium text-gray-700'>Filtrar por Fecha</label>
               <div className='flex space-x-4'>
                  <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={filterDate} onChange={handleDateChange} />
               </div>
            </div> {filteredDeliveries == null || filteredDeliveries.length === 0 ? (
               <p className="text-center text-gray-500">No tiene pedidos registrados a su cuenta.</p>
            ) :
               (
                  <div className="w-full max-w-4xl mx-auto"> {
                     filteredDeliveries.map((delivery) => (
                        <div key={delivery.id} className='w-full mb-4 p-4 border border-gray-300 rounded-lg'>
                           <p><strong>Tiempo de entrega:</strong> {delivery.delivery_time}</p>
                           <p><strong>Estado:</strong> {delivery.delivery_state}</p>
                           <p><strong>Propina:</strong> {delivery.tip ? delivery.tip : "Sin Propina"}</p>
                           <p><strong>Fecha:</strong> {normalizeDate(delivery.purchase.creation_date)}</p>
                           <div className='grid grid-cols-1 gap-2 border-t border-gray-200 pt-2 mt-2'>
                              <h4 className='font-semibold text-center'>Comidas del reparto:</h4>
                              {delivery.purchase.purchasedItems.map((item: { food: { id: React.Key | null | undefined; name: string; }; }) => (
                                 <h2 key={item.food.id} className='text-center'>{item.food.name}</h2>
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
