'use client'
import { useUpdateCarrier } from '@/hooks/Carrier/useUpdateCarrier';
import React from 'react'

const RegisterCarrier: React.FC = () => {
    const {
        carrierForm,
        carrierErrors,
        handleChange,
        handleSubmit
    } = useUpdateCarrier();

    return (
        <div id="myElement" className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Modificar Repartidor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className='block text-lg'>Informacion Personal</label>
                <div>
                    <label className="block">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={carrierForm.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                    {carrierErrors.name && <p className="text-red-500">{carrierErrors.name}</p>}
                </div>
                <div>
                    <label className="block">Apellido:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={carrierForm.last_name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                    {carrierErrors.last_name && <p className="text-red-500">{carrierErrors.last_name}</p>}
                </div>
                <div>
                    <label className="block">Vehiculo:</label>
                    <select
                        name="vehicle_type"
                        value={carrierForm.vehicle_type}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="Moto">Moto</option>
                        <option value="Auto">Auto</option>
                    </select>
                    {carrierErrors.vehicle_type && <p className="text-red-500">{carrierErrors.vehicle_type}</p>}
                </div>
                <div>
                    <label className="block">Telefono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={carrierForm.phone}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={15}
                    />
                    {carrierErrors.phone && <p className="text-red-500">{carrierErrors.phone}</p>}
                </div>
                <div>
                    <label className="block">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={carrierForm.birthdate}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {carrierErrors.birthdate && <p className="text-red-500">{carrierErrors.birthdate}</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Modificar</button>
            </form>
        </div>
    );
};

export default RegisterCarrier;
