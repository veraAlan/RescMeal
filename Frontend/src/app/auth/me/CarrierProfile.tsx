import React, { useState } from 'react';
import normalizePhone from '@/utils/normalizePhone';
import normalizeDate from '@/utils/normalizeDate';
import { useCarrierDelivery } from '@/components/Delivery/useCarrierDelivery';
import { FaMotorcycle } from 'react-icons/fa';

export interface Role {
   name?: string;
   type?: string;
   address?: string;
   schedule?: string;
   cvu?: string;
   image?: string;
   last_name?: string;
   balance?: number;
   vehicle_type?: string;
   phone?: string;
   birthdate?: string;
}

export default (props: { profile: Role | null }) => {
   const { carrierDeliverys } = useCarrierDelivery();
   const [filterDate, setFilterDate] = useState('');
   const phone = props.profile?.phone ? normalizePhone(props.profile.phone) : '';
   const birthdate = props.profile?.birthdate ? normalizeDate(props.profile.birthdate) : '';

   const handleDateChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setFilterDate(event.target.value);
   };

   const filteredDeliveries = carrierDeliverys?.filter(delivery => {
      if (!filterDate) return true;
      const deliveryDate = new Date(delivery.purchase.creation_date).toISOString().split('T')[0];
      return deliveryDate === filterDate;
   });

   const colors = ['bg-pink-100', 'bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100'];

   return (
      <div className="container mx-auto mt-16 mb-8 p-4 sm:p-8 bg-white shadow-xl rounded-xl max-w-screen-lg">
         <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 text-lg border rounded-xl border-gray-300">
            <div className="w-full flex flex-col items-start">
               <h3 className="font-semibold text-xl text-gray-700 mb-2">Información del Carrier</h3>
               <div className="w-full mb-2">
                  <strong>Nombre: </strong>
                  <span className="text-gray-900">{props.profile?.name}</span>
               </div>
               <div className="w-full mb-2">
                  <strong>Apellido: </strong>
                  <span className="text-gray-900">{props.profile?.last_name}</span>
               </div>
               <div className="w-full mb-2">
                  <strong>Celular: </strong>
                  <span className="text-gray-900">{phone}</span>
               </div>
               <div className="w-full mb-2">
                  <strong>Fecha de Nacimiento: </strong>
                  <span className="text-gray-900">{birthdate}</span>
               </div>
               <div className="w-full mb-2">
                  <strong>Tipo de Vehículo: </strong>
                  <span className="text-gray-900">{props.profile?.vehicle_type}</span>
               </div>
               <div className="flex justify-center w-full mt-4">
                  <a href="/auth/me/carrier">
                     <button className="border border-gray-300 rounded-lg px-6 py-2 font-bold bg-blue-600 text-white hover:bg-blue-700 transition duration-300">Modificar Datos</button>
                  </a>
               </div>
            </div>
         </div>
         <div className="mt-8">
            <h3 className="w-full font-semibold text-lg text-center p-2 mt-4 border border-gray-300 rounded-lg">Historial de pedidos:</h3>
            <div className="w-full border border-gray-300 rounded-lg p-4">
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Filtrar por Fecha</label>
                  <div className="flex space-x-4">
                     <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={filterDate} onChange={handleDateChange} />
                  </div>
               </div>
               {filteredDeliveries == null || filteredDeliveries.length === 0 ? (
                  <p className="text-center text-gray-500">No tiene pedidos registrados a su cuenta.</p>
               ) : (
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 text-center">
                     {filteredDeliveries.map((delivery, index) => (
                        <div key={delivery.id} className={`flex flex-col items-center w-full max-w-sm overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 ${colors[index % colors.length]} mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-6 lg:p-8 rounded-lg`}>
                           <FaMotorcycle className="w-8 h-8 text-gray-500 mb-2" /> {/* Cambiado aquí */}
                           <p><strong>Nombre del Cliente:</strong> {delivery.purchase.client.name}</p>
                           <p><strong>Tiempo de entrega:</strong> {delivery.delivery_time}</p>
                           <p><strong>Estado:</strong> {delivery.delivery_state}</p>
                           <p><strong>Fecha:</strong> {normalizeDate(delivery.purchase.creation_date)}</p>
                           <div className="grid grid-cols-1 gap-2 border-gray-200 pt-2 mt-2">
                              <h4 className="font-semibold text-center">Comidas del reparto:</h4>
                              {delivery.purchase.purchasedItems.map((item: { food: { id: React.Key | null | undefined; name: string; image: string; }; }) => (
                                 <div key={item.food.id} className="flex items-center">
                                    <img src={`/Food/${item.food.image}`} alt={item.food.name} className="w-6 h-6 rounded-lg" />
                                    <h2 className="text-center">{item.food.name}</h2>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};