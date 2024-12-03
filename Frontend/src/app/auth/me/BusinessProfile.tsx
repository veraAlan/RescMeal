import React from 'react';
import normalizeDate from '../../../utils/normalizeDate';
import useBusinessFoods from './useBusinessFood';
import { Food } from '../../../types/Food';

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
   const { businessFoods } = useBusinessFoods();
   const businessImage = props.profile?.image ? `/Business/${props.profile.image}` : null;

   return (
      <div className="container mx-auto mt-16 mb-8 p-4 sm:p-8 bg-white shadow-xl rounded-xl max-w-screen-lg">
         <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 text-lg border rounded-xl border-gray-300">
            {businessImage && (
               <div className="w-full md:w-1/3 flex items-center justify-center mb-4 md:mb-0">
                  <img src={businessImage} alt="Imagen del Local" className="w-full h-auto rounded-xl" />
               </div>
            )}
            <div className="w-full md:w-2/3 flex flex-col justify-center">
               <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <h3 className='font-semibold text-xl text-gray-700'>Nombre de Local:</h3>
                  <p className='text-gray-900'>{props.profile?.name}</p>
               </div>
               <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <h3 className='font-semibold text-xl text-gray-700'>Tipo de Local:</h3>
                  <p className='text-gray-900'>{props.profile?.type}</p>
               </div>
               <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <h3 className='font-semibold text-xl text-gray-700'>Dirección:</h3>
                  <p className='text-gray-900'>{props.profile?.address}</p>
               </div>
               <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <h3 className='font-semibold text-xl text-gray-700'>Celular:</h3>
                  <p className='text-gray-900'>{props.profile?.phone}</p>
               </div>
               <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <h3 className='font-semibold text-xl text-gray-700'>Horario:</h3>
                  <p className='text-gray-900'>{props.profile?.schedule}</p>
               </div>
               <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <h3 className='font-semibold text-xl text-gray-700'>CVU:</h3>
                  <p className='text-gray-900'>{props.profile?.cvu}</p>
               </div>
               <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <h3 className='font-semibold text-xl text-gray-700'>Tipo de Vehículo:</h3>
                  <p className='text-gray-900'>{props.profile?.vehicle_type}</p>
               </div>
               <div className="flex justify-center">
                  <a href='/auth/me/business'>
                     <button className='border border-gray-300 rounded-lg px-6 py-2 font-bold bg-blue-600 text-white hover:bg-blue-700 transition duration-300'>Modificar Datos</button>
                  </a>
               </div>
            </div>
         </div>
         <div className="mt-8">
            {businessFoods == null ? (
               <p className="text-center text-gray-500">No tiene publicaciones de comidas.</p>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                  {businessFoods.map((food: Food) => (
                     <div key={food.id} className="flex flex-col items-center w-full max-w-sm overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 bg-white mb-4 sm:mb-6 lg:mb-8 mx-auto min-h-[300px] p-4 sm:p-6 lg:p-8 rounded-lg">
                        <img className="w-32 h-32 object-cover mb-4 rounded-lg" src={food.image} alt={food.name} />
                        <div className="flex flex-col justify-between leading-normal flex-grow text-center">
                           <div>
                              <div className="text-black font-bold text-xl sm:text-2xl mb-2">{food.name}</div>
                              <p className="text-black text-lg sm:text-base lg:text-lg">{food.description}</p>
                           </div>
                           <div className="text-black text-md mt-4 space-y-1">
                              <p><span className="font-semibold">Categoría: </span>{food.category}</p>
                              <p><span className="font-semibold">Cantidad: </span>{food.quantity}</p>
                              <p><span className="font-semibold">Fecha de Expiración: </span>{normalizeDate(food.expiration_date)}</p>
                              <p><span className="font-semibold">Fecha de Producción: </span>{normalizeDate(food.production_date)}</p>
                           </div>
                           <div className="mt-6 flex justify-between items-center w-full">
                              <span className="text-black text-xl sm:text-lg lg:text-xl line-through">${(food.price * 2).toFixed(2)}</span>
                              <span className="text-black font-bold text-2xl sm:text-3xl ml-2">${food.price}</span>
                           </div>
                           <a href={'/food/modify?food=' + food.id} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-md mt-4 text-center">
                              Modificar
                           </a>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};
