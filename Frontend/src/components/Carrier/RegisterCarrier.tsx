import React from 'react';
import { useRegisterCarrier } from '../../hooks/Carrier/useRegisterCarrier';
import Link from 'next/link';

const RegisterCarrier: React.FC = () => {
    const {
        userForm,
        userErrors,
        userSession,
        hasCarrier,
        carrierForm,
        carrierErrors,
        successMessage,
        generalError,
        handleChange,
        handleChangeRegister,
        handleSubmit
    } = useRegisterCarrier();

    return (
        <div id="myElement" className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Carrier</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className='block text-lg'>Informacion de Inicio de Sesion</label>
                {generalError && <p className="text-green-500 text-lg font-semibold">{ }</p>}
                {!userSession &&
                    <div>
                        <div>
                            <label className="block">Nombre usuario:</label>
                            <input
                                type="text"
                                name="username"
                                value={userForm.username}
                                onChange={handleChangeRegister}
                                className="border p-2 w-full"
                            />
                            {userErrors.username && <p className="text-red-500">{userErrors.username}</p>}
                        </div>
                        <div>
                            <label className="block">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userForm.email}
                                onChange={handleChangeRegister}
                                className="border p-2 w-full"
                            />
                            {userErrors.email && <p className="text-red-500">{userErrors.email}</p>}
                        </div>
                        <div>
                            <label className="block">Contraseña:</label>
                            <input
                                type="password"
                                name="password"
                                value={userForm.password}
                                onChange={handleChangeRegister}
                                className="border p-2 w-full"
                            />
                            {userErrors.password && <p className="text-red-500">{userErrors.password}</p>}
                        </div>
                    </div>
                }
                {userSession && <p className="text-green-500 text-lg font-semibold">Ya estas en una sesion.<br /> Si no quiere crear un local asociado a al usuario actual, primero cierre sesion.</p>}
                <label className='block text-lg'>Informacion Personal</label>
                {!hasCarrier &&
                    <div>
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
                                name="lastName"
                                value={carrierForm.lastName}
                                onChange={handleChange}
                                className="border p-2 w-full"
                                maxLength={20}
                            />
                            {carrierErrors.lastName && <p className="text-red-500">{carrierErrors.lastName}</p>}
                        </div>
                        <div>
                            <label className="block">Tipo de Vehículo:</label>
                            <select
                                id="vehicleType"
                                name="vehicleType"
                                value={carrierForm.vehicleType}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            >
                                <option value="">Selecciona un tipo de vehículo</option>
                                <option value="Moto">Moto</option>
                                <option value="Auto">Auto</option>
                            </select>
                            {carrierErrors.vehicleType && <p className="text-red-500">{carrierErrors.vehicleType}</p>}
                        </div>
                        <div>
                            <label className="block">Teléfono:</label>
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
                            <label className="block">Fecha:</label>
                            <input
                                type="date"
                                name="date"
                                value={carrierForm.date}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                            {carrierErrors.date && <p className="text-red-500">{carrierErrors.date}</p>}
                        </div>
                    </div>
                }
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {generalError && <p className="text-red-500">{generalError}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Registrar
                </button>
                {hasCarrier && <p className="text-green-500 text-lg font-semibold">Ya tiene una cuenta de repartidor creada. <br /><Link href='/auth/me'><button>Ver Perfil</button></Link></p>}
            </form>
        </div>
    );
};

export default RegisterCarrier;

