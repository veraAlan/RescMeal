'use client'
import { AuthContext } from '@/context/AuthContext'
import React, { useContext } from 'react'

const HomePage: React.FC = () => {
   const authContext = useContext(AuthContext)
   if (!authContext) return null

   const { isLoggedIn } = authContext

   return (
      <div className="container mx-auto px-4 flex flex-col items-center mt-16">
         <h1 className="text-5xl font-extrabold my-6 text-center text-gray-900">RescMeal</h1>
         <main className='container p-6 border border-teal-400 text-center bg-white shadow-xl rounded-lg'>
            <h2 className="text-2xl font-bold mb-4 text-teal-600">Descripción</h2>
            <p className='text-lg text-gray-800'>
               Nuestro objetivo principal es resolver el problema de qué hacer con el
               excedente de comida de los comercios gastronómicos, para que al final
               del día no se desperdicie.
            </p>
            <p className='mt-4 text-lg text-gray-800'>
               Se busca el desarrollo de una aplicación la cual permita, la
               compraventa de productos los cuales no se vendieron en tiempo a un
               menor precio, evitando el desperdicio de alimentos que serían
               desechados.
            </p>
            <p className='mt-4 text-lg text-gray-800'>
               Los locales podrán registrar su local, publicar comidas,
               gestionar las ventas, ver estadísticas respecto a las compras.
               Mientras que los usuarios podrán realizar compras, pagar por
               transferencia, localizar el local por medio de un mapa, escribir
               comentarios de un local y calificar el servicio.
            </p>
            <p className='mt-4 text-lg text-gray-800'>
               Para corroborar el correcto funcionamiento de la aplicación,
               dispondremos de contacto de soporte tanto para clientes como
               comercios.
            </p>
         </main>
         <div className="mt-8">
            {isLoggedIn ?
               (<button className='px-6 py-3 mt-4 rounded-md bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold text-lg hover:shadow-lg transition-transform transform hover:scale-105'><a href='/food'>Ver comidas</a></button>) :
               (<h2 className='p-4 text-xl text-gray-900'>Regístrese o inicie sesión para poder ver el catálogo</h2>)
            }
         </div>
      </div>
   )
}

export default HomePage