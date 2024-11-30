import React from 'react';
import { useRegisterFood } from '../../hooks/Food/useRegisterFood';

const RegisterFood: React.FC = () => {
    const {
        formData,
        errors,
        successMessage,
        generalError,
        handleChange,
        handleImage,
        handleSubmit
    } = useRegisterFood();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
                <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Registrar Alimento</h2>
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
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
                            name="production_date"
                            value={formData.production_date}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                        />
                        {errors.production_date && <p className="text-red-500">{errors.production_date}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterFood;