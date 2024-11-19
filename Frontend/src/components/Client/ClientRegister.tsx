import React from 'react';
import { useRegisterClient } from '../../hooks/Client/useRegisterClient';

const RegisterClient: React.FC = () => {
    const {
        userForm,
        userErrors,
        userSession,
        clientForm,
        clientErrors,
        successMessage,
        generalError,
        handleChange,
        handleChangeRegister,
        handleSubmit
    } = useRegisterClient();

    return (
        <div id="myElement" className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div>
                    <label className="block">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={clientForm.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                    {clientErrors.name && <p className="text-red-500">{clientErrors.name}</p>}
                </div>
                <div>
                    <label className="block">Apellido:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={clientForm.last_name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                    {clientErrors.last_name && <p className="text-red-500">{clientErrors.last_name}</p>}
                </div>
                <div>
                    <label className="block">Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={clientForm.phone}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={15}
                    />
                    {clientErrors.phone && <p className="text-red-500">{clientErrors.phone}</p>}
                </div>
                <div>
                    <label className="block">Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={clientForm.address}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={50}
                    />
                    {clientErrors.address && <p className="text-red-500">{clientErrors.address}</p>}
                </div>
                <div>
                    <label className="block">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={clientForm.birthdate}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {clientErrors.birthdate && <p className="text-red-500">{clientErrors.birthdate}</p>}
                </div>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {generalError && <p className="text-red-500">{generalError}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterClient;
