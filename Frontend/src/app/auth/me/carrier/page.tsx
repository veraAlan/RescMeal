'use client'
import React from 'react'
import Link from 'next/link'
import { useUpdateCarrier } from '@/hooks/Carrier/useUpdateCarrier'

const UpdateCarrier: React.FC = () => {
    const {
        carrierForm,
        carrierErrors,
        handleChange,
        handleSubmit
    } = useUpdateCarrier();

    return (
        <div id="myElement" className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
                <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Modificar Repartidor</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className='block text-lg mb-1 font-medium'>Información Personal</label>
                    <div>
                        <label className="block mb-1 font-medium">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={carrierForm.name}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                            maxLength={20}
                        />
                        {carrierErrors.name && <p className="text-red-500">{carrierErrors.name}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Apellido:</label>
                        <input
                            type="text"
                            name="last_name"
                            value={carrierForm.last_name}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                            maxLength={20}
                        />
                        {carrierErrors.last_name && <p className="text-red-500">{carrierErrors.last_name}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Vehículo:</label>
                        <select
                            name="vehicle_type"
                            value={carrierForm.vehicle_type}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="Moto">Moto</option>
                            <option value="Auto">Auto</option>
                        </select>
                        {carrierErrors.vehicle_type && <p className="text-red-500">{carrierErrors.vehicle_type}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Teléfono:</label>
                        <input
                            type="text"
                            name="phone"
                            value={carrierForm.phone}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                            maxLength={15}
                        />
                        {carrierErrors.phone && <p className="text-red-500">{carrierErrors.phone}</p>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={carrierForm.birthdate}
                            onChange={handleChange}
                            className="border rounded-lg p-2 w-full"
                        />
                        {carrierErrors.birthdate && <p className="text-red-500">{carrierErrors.birthdate}</p>}
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

export default UpdateCarrier