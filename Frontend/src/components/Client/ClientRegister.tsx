import React from 'react';
import { useRegisterClient } from '../../hooks/Client/useRegisterClient';

const RegisterClient: React.FC = () => {
    const {
        userForm,
        userErrors,
        userSession,
        clientForm,
        clientErrors,
        handleChange,
        handleChangeRegister,
        handleSubmit
    } = useRegisterClient();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
                <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Registrar Cliente</h2>
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
                                value={clientForm.name}
                                onChange={handleChange}
                                className="border rounded-lg p-2 w-full"
                                maxLength={20}
                            />
                            {clientErrors.name && <p className="text-red-500">{clientErrors.name}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Apellido:</label>
                            <input
                                type="text"
                                name="last_name"
                                value={clientForm.last_name}
                                onChange={handleChange}
                                className="border rounded-lg p-2 w-full"
                                maxLength={20}
                            />
                            {clientErrors.last_name && <p className="text-red-500">{clientErrors.last_name}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Teléfono:</label>
                            <input
                                type="text"
                                name="phone"
                                value={clientForm.phone}
                                onChange={handleChange}
                                className="border rounded-lg p-2 w-full"
                                maxLength={15}
                            />
                            {clientErrors.phone && <p className="text-red-500">{clientErrors.phone}</p>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                name="birthdate"
                                value={clientForm.birthdate}
                                onChange={handleChange}
                                className="border rounded-lg p-2 w-full"
                            />
                            {clientErrors.birthdate && <p className="text-red-500">{clientErrors.birthdate}</p>}
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

export default RegisterClient;