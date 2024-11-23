'use client'
import { useSearchParams } from "next/navigation"
import { useModifyFoods } from "./useModifyFood"

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

   return (<div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Registrar Alimento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
            <label className="block">Nombre:</label>
            <input
               type="text"
               name="name"
               value={formData.name}
               onChange={handleChange}
               className="border p-2 w-full"
               maxLength={50}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
         </div>
         <div>
            <label className="block">Categoría:</label>
            <select
               name="category"
               value={formData.category}
               onChange={handleChange}
               className="border p-2 w-full"
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
            <label className="block">Precio:</label>
            <input
               type="number"
               name="price"
               value={formData.price}
               onChange={handleChange}
               className="border p-2 w-full"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
         </div>
         <div>
            <label className="block">Imagen:</label>
            <input
               type="file"
               name="image"
               onChange={handleImage}
               className="border p-2 w-full"
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
         </div>
         <div>
            <label className="block">Descripción:</label>
            <textarea
               name="description"
               value={formData.description}
               onChange={handleChange}
               className="border p-2 w-full"
               maxLength={200}
            ></textarea>
            {errors.description && <p className="text-red-500">{errors.description}</p>}
         </div>
         <div>
            <label className="block">Cantidad:</label>
            <input
               type="number"
               name="quantity"
               value={formData.quantity}
               onChange={handleChange}
               className="border p-2 w-full"
            />
            {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
         </div>
         <div>
            <label className="block">Fecha de Vencimiento:</label>
            <input
               type="date"
               name="expiration_date"
               value={formData.expiration_date}
               onChange={handleChange}
               className="border p-2 w-full"
            />
            {errors.expiration_date && <p className="text-red-500">{errors.expiration_date}</p>}
         </div>
         <div>
            <label className="block">Fecha de Producción:</label>
            <input
               type="date"
               name="production_date"
               value={formData.production_date}
               onChange={handleChange}
               className="border p-2 w-full"
            />
            {errors.production_date && <p className="text-red-500">{errors.production_date}</p>}
         </div>
         <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
      </form>
   </div>
   )
}