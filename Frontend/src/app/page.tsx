'use client'
import { AuthContext } from '@/context/AuthContext'
import React, { useContext } from 'react'

const HomePage: React.FC = () => {
   const authContext = useContext(AuthContext)
   if (!authContext) return null

   const { isLoggedIn } = authContext

   return (
      <div className="container mx-auto px-4 flex flex-col items-center">
         <h1 className="text-4xl font-bold my-4 text-center text-gray-800">RescMeal</h1>
         <div className='container p-4 border border-red-500 text-center'>
            <p>Descripcion de la pagina.</p>
            <p className='pt-2'>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
               Quis veniam autem consequuntur aliquam error vitae numquam
               repellendus aperiam, quae iusto porro perspiciatis tenetur
               provident tempora aut fugiat cumque! Asperiores, voluptatum
               accusamus. Est eaque omnis, quod ab perferendis magni molestias
               quasi. Eum totam, dicta enim quidem assumenda explicabo id.
               Quod laudantium laboriosam quam optio perferendis debitis
               at eius magnam quo minima nemo ipsum asperiores reprehenderit,
               incidunt tempora sequi dolores delectus numquam.
            </p>
         </div>
         <div>
            {isLoggedIn ?
               (<button className='p-2 m-2 border rounded-md border-slate-400 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl'><a href='/food'>Ver comidas</a></button>) :
               (<h2 className='p-4'>Registrese o inicie sesion para poder ver el catalogo</h2>)
            }
         </div>
      </div>
   )
}

export default HomePage
