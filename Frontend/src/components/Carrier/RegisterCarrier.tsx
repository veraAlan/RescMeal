import React from 'react';
import { useRegisterCarrier } from '../../hooks/Carrier/useRegisterCarrier';
import Link from 'next/link';

const RegisterCarrier: React.FC = () => {
    const {
        userForm,
        userErrors,
        userSession,
        carrierForm,
        carrierErrors,
        handleChange,
        handleChangeRegister,
        handleSubmit
    } = useRegisterCarrier();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
                <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Registrar Carrier</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!userSession && (
                        <div>
                            <div>
                                <label className="block mb-1 font-medium">Nombre usuario:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={userForm.username}
                                    onChange={handleChangeRegister}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {userErrors.username && <p className="text-red-500">{userErrors.username}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userForm.email}
                                    onChange={handleChangeRegister}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {userErrors.email && <p className="text-red-500">{userErrors.email}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Contraseña:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={userForm.password}
                                    onChange={handleChangeRegister}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {userErrors.password && <p className="text-red-500">{userErrors.password}</p>}
                            </div>
                        </div>
                    )}
                    {userSession && (
                        <p className="text-green-500 text-lg font-semibold text-center">
                            Ya estás en una sesión.<br />
                            Si no quieres crear un local asociado al usuario actual, primero cierra sesión.
                        </p>
                    )}
                    <div>
                        <label className="block text-lg mb-1 font-medium">Información Personal</label>
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
                            <label className="block mb-1 font-medium">Tipo de Vehículo:</label>
                            <select
                                name="vehicle_type"
                                value={carrierForm.vehicle_type}
                                onChange={handleChange}
                                className="border rounded-lg p-2 w-full"
                            >
                                <option value="">Selecciona un tipo de vehículo</option>
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
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterCarrier;