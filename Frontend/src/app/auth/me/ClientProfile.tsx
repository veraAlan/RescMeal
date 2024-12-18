import React, { useState, useEffect } from 'react';
import normalizePhone from '@/utils/normalizePhone';
import normalizeDate from '@/utils/normalizeDate';
import { FaShoppingBag } from 'react-icons/fa';
import axiosConfig from '@/utils/axiosConfig';

export interface Role {
   id?: number;
   name?: string;
   type?: string;
   address?: string;
   schedule?: string;
   cvu?: string;
   last_name?: string;
   balance?: number;
   phone?: string;
   birthdate?: string;
}

const fetchAllPurchases = async (clientId) => {
   try {
      const response = await axiosConfig.get(`/api/purchase/client/${clientId}`);
      const purchases = response.data;

      // Find the last purchase by checking the maximum ID value
      const lastPurchaseId = purchases.length > 0 ? Math.max(...purchases.map((p: { id: any; }) => p.id)) : null;

      return { purchases, lastPurchaseId };
   } catch (error) {
      console.error('Error fetching purchases:', error);
      throw error;
   }
}

const fetchDeliveryDetails = async (purchaseId) => {
   try {
      const response = await axiosConfig.get(`/api/delivery/carrierByPurchase/${purchaseId}`);
      return response.data;
   } catch (error) {
      console.error('Error fetching delivery details:', error);
      throw error;
   }
}

export default (props: { profile: Role | null }) => {
   const [lastPurchase, setLastPurchase] = useState(null);
   const [lastPurchaseDetails, setLastPurchaseDetails] = useState(null);
   const [purchases, setPurchases] = useState([]);
   const [lastPurchaseId, setLastPurchaseId] = useState(null);

   useEffect(() => {
      if (props.profile?.id) {
         fetchAllPurchases(props.profile.id).then(({ purchases, lastPurchaseId }) => {
            setPurchases(purchases);
            if (lastPurchaseId) {
               const lastPurchase = purchases.find(p => p.id === lastPurchaseId);
               setLastPurchase(lastPurchase);
               fetchDeliveryDetails(lastPurchaseId).then(details => {
                  if (details) {
                     setLastPurchaseDetails(details);
                  }
               });
            }
         });
      }
   }, [props.profile]);

   const phone = props.profile?.phone ? normalizePhone(props.profile.phone) : '';
   const birthdate = props.profile?.birthdate ? normalizeDate(props.profile.birthdate) : '';

   const colors = ['bg-pink-100', 'bg-yellow-100', 'bg-blue-100', 'bg-green-100', 'bg-purple-100'];

   return (
      <div className="container mx-auto mt-16 mb-8 p-4 sm:p-8 bg-white shadow-xl rounded-xl max-w-screen-lg">
         <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 text-lg border rounded-xl border-gray-300">
            <div className="w-full flex flex-col items-start">
               <h3 className="font-semibold text-xl text-gray-700 mb-2">Información del Cliente</h3>
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
                  <strong>Balance: </strong>
                  <span className="text-gray-900">
                     AR$ {props.profile?.balance ? props.profile.balance : "0"}
                  </span>
               </div>
               <div className="flex justify-center w-full mt-4">
                  <a href="/auth/me/client">
                     <button className="border border-gray-300 rounded-lg px-6 py-2 font-bold bg-blue-600 text-white hover:bg-blue-700 transition duration-300">Modificar Datos</button>
                  </a>
               </div>
            </div>
         </div>
         {lastPurchase && lastPurchaseDetails ? (
            <div className="mt-8 flex justify-center">
               <div className="w-full max-w-3xl border border-gray-300 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-lg text-left p-2 mb-4 border-b border-gray-300">Última Compra Realizada</h3>
                  <div className="flex flex-col items-start overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 bg-green-100 p-8 rounded-lg">
                     <FaShoppingBag className="w-8 h-8 text-gray-500 mb-4 mx-auto" />
                     <p><strong>Método de Pago:</strong> {lastPurchase.payment_method === 'credit_card' ? 'Tarjeta de crédito' : lastPurchase.payment_method === 'debit_card' ? 'Tarjeta de débito' : lastPurchase.payment_method}</p>
                     <p><strong>Total: </strong>${lastPurchase.total_cost}</p>
                     <p><strong>Fecha:</strong> {normalizeDate(lastPurchase.creation_date)}</p>
                     <div className="mt-4 w-full text-center">
                        <h4 className="font-semibold">Artículos Comprados:</h4>
                        <ul>
                           {lastPurchase.purchasedItems.map((item) => (
                              <li key={item.id} className="flex items-center gap-2 mt-2 rounded-lg p-2 justify-center">
                                 <img src={`/Food/${item.food.image}`} alt={item.food.name} className="w-8 h-8 rounded-full" />
                                 <span>{item.food.name}</span>
                                 <span className="ml-auto">{item.quantity}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className="mt-4 w-full flex justify-around">
                        <a href={`/carrier/${lastPurchaseDetails.id}`}>
                           <button className="rounded-lg px-6 py-2 font-bold bg-green-200 text-gray-900 hover:bg-green-300 transition duration-300">Ver Información del Carrier</button>
                        </a>
                        <a href="/comment">
                           <button className="rounded-lg px-6 py-2 font-bold bg-blue-200 text-gray-900 hover:bg-blue-300 transition duration-300">Dejar un Comentario</button>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <div className="mt-8 flex justify-center">
               <div className="w-full max-w-3xl border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-xl transition-transform transform hover:scale-105 duration-300">
                  <h3 className="font-semibold text-lg text-left p-2 mb-4 border-b border-gray-300 bg-gray-100 rounded-t-lg">Última Compra Realizada</h3>
                  <div className="flex flex-col items-center justify-center overflow-hidden shadow-lg p-8 rounded-b-lg">
                     <p className="text-center text-gray-700">No has realizado ninguna compra o tu pedido no ha sido tomado.</p>
                     <div className="mt-4 w-full flex justify-around">
                     </div>
                  </div>
               </div>
            </div>
         )}
         <div className="mt-8">
            <h3 className="w-full font-semibold text-lg text-center p-2 mt-4 border border-gray-300 rounded-lg">Historial de Compras</h3>
            <div className="w-full border border-gray-300 rounded-lg p-4">
               {purchases.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 text-center">
                     {purchases
                        .filter(purchase => lastPurchase && purchase.id !== lastPurchase.id)
                        .map((purchase, index) => (
                           <div key={purchase.id} className={`flex flex-col items-start w-full max-w-sm overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 ${colors[index % colors.length]} mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-6 lg:p-8 rounded-lg`}>
                              <FaShoppingBag className="w-8 h-8 text-gray-500 mb-2 mx-auto" />
                              <p><strong>Método de Pago:</strong> {purchase.payment_method === 'credit_card' ? 'Tarjeta de crédito' : purchase.payment_method === 'debit_card' ? 'Tarjeta de débito' : purchase.payment_method}</p>
                              <p><strong>Total:</strong> ${purchase.total_cost}</p>
                              <p><strong>Fecha:</strong> {normalizeDate(purchase.creation_date)}</p>
                              <p><strong>Estado: Terminado</strong></p>
                              <div className="mt-4 w-full text-center">
                                 <h4 className="font-semibold">Artículos Comprados:</h4>
                                 <ul>
                                    {purchase.purchasedItems.map((item) => (
                                       <li key={item.id} className="flex items-center gap-2 mt-2 rounded-lg p-2 justify-center">
                                          <img src={`/Food/${item.food.image}`} alt={item.food.name} className="w-6 h-6 rounded-lg" />
                                          <span>{item.food.name}</span>
                                          <span className="ml-auto">{item.quantity}</span>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        ))}
                  </div>
               ) : (
                  <p className="text-center text-gray-500">No se encontraron compras.</p>
               )}
            </div>
         </div>
      </div>
   );
};