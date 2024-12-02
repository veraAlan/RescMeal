// ModifyFoodComponent.tsx
'use client'
import { useSearchParams } from "next/navigation"
import { useModifyFoods } from "./useModifyFood"
import Link from "next/link"
import Image from 'next/image' // Import the Image component

export default () => {
   const searchParams = useSearchParams()
   const {
      formData,
      errors,
      successImage,
      generalError,
      handleChange,
      handleImage,
      handleSubmit
   } = useModifyFoods(searchParams.get('food'))

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
            <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Modificar {formData.name}</h2>
            {successImage && <p className="text-green-500 text-center">{successImage}</p>}
            {generalError && <p className="text-red-500 text-center">{generalError}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label className="block mb-1 font-medium">Nombre:</label>
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                     maxLength={50}
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Categoría:</label>
                  <select
                     name="category"
                     value={formData.category}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  >
                     <option value="">Seleccione una categoría</option>
                     <option value="sopa">Sopa</option>
                     <option value="hamburguesa">Hamburguesa</option>
                     <option value="postre">Postre</option>
                     <option value="panadería">Panadería</option>
                     <option value="tacos">Tacos</option>
                     <option value="quesadillas">Quesadillas</option>
                     <option value="entradas">Entradas</option>
                  </select>
                  {errors.category && <p className="text-red-500">{errors.category}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Precio:</label>
                  <input
                     type="number"
                     name="price"
                     value={formData.price}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
                  {errors.price && <p className="text-red-500">{errors.price}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Imagen:</label>
                  <input
                     type="file"
                     name="image"
                     onChange={handleImage}
                     className="border rounded-lg p-2 w-full"
                  />
                  {errors.image && <p className="text-red-500">{errors.image}</p>}
                  {formData.image && (
                     <div className="mt-4">
                        <Image
                           src={formData.image}
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
                     value={formData.description}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                     maxLength={200}
                  ></textarea>
                  {errors.description && <p className="text-red-500">{errors.description}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Cantidad:</label>
                  <input
                     type="number"
                     name="quantity"
                     value={formData.quantity}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
                  {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Fecha de Vencimiento:</label>
                  <input
                     type="date"
                     name="expiration_date"
                     value={formData.expiration_date}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
                  {errors.expiration_date && <p className="text-red-500">{errors.expiration_date}</p>}
               </div>
               <div>
                  <label className="block mb-1 font-medium">Fecha de Producción:</label>
                  <input
                     type="date"
                     placeholder="dd-mm-YYYY"
                     name="production_date"
                     value={formData.production_date}
                     onChange={handleChange}
                     className="border rounded-lg p-2 w-full"
                  />
                  {errors.production_date && <p className="text-red-500">{errors.production_date}</p>}
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