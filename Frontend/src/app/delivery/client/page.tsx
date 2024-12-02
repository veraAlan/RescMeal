"use client";
import React from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useClientDelivery from '@/hooks/Client/useClientDelivery';

const Page: React.FC = () => {
   const { deliveryCarrier, purchase, state } = useClientDelivery()
   return (
      <div className="container mx-auto px-4">
         <ToastContainer />
         <h1 className="text-4xl font-bold my-4 text-center text-gray-800">Su pedido</h1>
         <div>
            <div className='relative grid grid-cols-3 grid-cols-subgrid grid-flow-row w-full p-4 text-2xl border rounded-xl border-2'>
               <h3 className='w-full h-full rounded-xl font-bold font-semibold text-center'>Nombre de Repartidor: </h3>
               <h4 className='w-full h-full rounded-xl font-bold p-2 text-center'>{deliveryCarrier?.name} {deliveryCarrier?.last_name}</h4>
               <div className='w-full gap-2 flex flex-cols-2 p-4'>
                  <Link href='/carrier' className='border border-2 rounded-xl border-slate-500 p-4 text-xl fit-content h-25'>Ver informacion del repartidor</Link>
               </div>
               <div>
                  <div className='py-2 grid grid-rows-subgrid grid-cols-4 gap-2 border rounded-xl border-slate-500 p-2'>
                     <h3 className='text-center text-2xl font-bold'>Fecha de creacion: </h3>
                     <h2 className='text-center text-2xl font-bold'>{purchase?.creation_date}</h2>
                     <h3 className='text-center text-2xl font-bold'>Estado: </h3>
                     <h2 className='text-center text-2xl font-bold text-lime-800'>{state ? (state) : ("")}</h2>
                  </div>
               </div>
               <div className='py-2 grid-cols-3 gap-2 border rounded-xl border-slate-500 p-2 text-center text-2xl'>
                  <h3 className='row-span-3 text-center text-2xl font-extrabold'>Su compra: </h3>
                  {purchase?.purchasedItems.map(item => (
                     <h2>{item.food.name}</h2>
                  ))}
               </div>
            </div>
         </div>
         <div className="mt-4 flex justify-center">
            <Link href="/food">
               <button className="bg-gray-500 text-white px-4 py-2 rounded">Volver a la página principal</button>
            </Link>
         </div>
      </div>
   );
};

export default Page;