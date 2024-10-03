import React from 'react';
import { useRegisterClient } from '../../hooks/useRegisterClient';

const RegisterClient: React.FC = () => {
    const {
        formData,
        errors,
        successMessage,
        generalError,
        handleChange,
        handleSubmit
    } = useRegisterClient();

    return (
        <div id="myElement" className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <label className="block">Apellido:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                    {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                </div>
                <div>
                    <label className="block">Correo Electrónico:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={30}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div>
                    <label className="block">Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={15}
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={30}
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div>
                    <label className="block">Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={50}
                    />
                    {errors.address && <p className="text-red-500">{errors.address}</p>}
                </div>
                <div>
                    <label className="block">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.birthdate && <p className="text-red-500">{errors.birthdate}</p>}
                </div>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {generalError && <p className="text-red-500">{generalError}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterClient;
