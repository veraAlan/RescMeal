// ModifyFoodComponent.tsx
'use client'
import { useSearchParams } from "next/navigation"
import { useModifyFoods } from "./useModifyFood"
import Link from "next/link"
import Image from 'next/image' // Import the Image component

export default () => {
   const searchParams = useSearchParams()
   const {
      foodForm,
      foodErrors,
      handleChange,
      handleImage,
      handleSubmit
   } = useModifyFoods(searchParams.get('food'))

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
            <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Modificar {foodForm.name}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block mb-1 font-medium">Nombre:</label>
                  <input
                     type="text"
                     name="name"
                     value={foodForm.name}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                     maxLength={50}
                  />
                  {foodErrors.name && <p className="text-red-500">{foodErrors.name}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Categoría:</label>
                  <select
                     name="category"
                     value={foodForm.category}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  >
                     <option value="">Seleccione una categoría</option>
                     <option value="Sopas">Sopas</option>
                     <option value="Hamburguesas">Hamburguesas</option>
                     <option value="Postre">Postre</option>
                     <option value="Facturas">Facturas</option>
                     <option value="Tacos">Tacos</option>
                     <option value="Quesadillas">Quesadillas</option>
                     <option value="Entradas">Entradas</option>
                  </select>
                  {foodErrors.category && <p className="text-red-500">{foodErrors.category}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Precio:</label>
                  <input
                     type="number"
                     name="price"
                     value={foodForm.price}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
                  {foodErrors.price && <p className="text-red-500">{foodErrors.price}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Imagen:</label>
                  <input
                     type="file"
                     name="image"
                     onChange={handleImage}
                     className="border rounded-lg p-2 w-full"
                  />
                  {foodErrors.image && <p className="text-red-500">{foodErrors.image}</p>}
                  {foodForm.image && (
                     <div className="mt-4">
                        <Image
                           src={foodForm.image}
                           alt="Imagen de previsualización"
                           width={100}
                           height={100}
                           className="mx-auto rounded"
                        />
                     </div>
                  )}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Descripción:</label>
                  <textarea
                     name="description"
                     value={foodForm.description}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                     maxLength={200}
                  ></textarea>
                  {foodErrors.description && <p className="text-red-500">{foodForm.description}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Cantidad:</label>
                  <input
                     type="number"
                     name="quantity"
                     value={foodForm.quantity}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
                  {foodErrors.quantity && <p className="text-red-500">{foodForm.quantity}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Fecha de Vencimiento:</label>
                  <input
                     type="date"
                     name="expiration_date"
                     value={foodForm.expiration_date}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
                  {foodErrors.expiration_date && <p className="text-red-500">{foodErrors.expiration_date}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Fecha de Producción:</label>
                  <input
                     type="date"
                     placeholder="dd-mm-YYYY"
                     name="production_date"
                     value={foodForm.production_date}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
                  {foodErrors.production_date && <p className="text-red-500">{foodErrors.production_date}</p>}
               </div>
               <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                  Modificar
               </button>
            </form>

            <Link href="/auth/me" className="bg-gray-500 text-white p-3 rounded-lg w-full text-center hover:bg-gray-600 transition duration-300 mt-4 block">
               Volver
            </Link>
         </div>
      </div>
   )
}