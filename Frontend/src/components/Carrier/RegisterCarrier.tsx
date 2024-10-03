import React from 'react';
import { useRegisterCarrier } from '../../hooks/Carrier/useRegisterCarrier';

const RegisterCarrier: React.FC = () => {
    const {
        formData,
        errors,
        successMessage,
        generalError,
        handleChange,
        handleSubmit
    } = useRegisterCarrier();

    return (
        <div id="myElement" className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Carrier</h2>
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
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border p-2 w-full"
                        maxLength={20}
                    />
                    {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
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
                    <label className="block">Tipo de Vehículo:</label>
                    <select
                        id="vehicleType"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    >
                        <option value="">Selecciona un tipo de vehículo</option>
                        <option value="Moto">Moto</option>
                        <option value="Auto">Auto</option>
                    </select>
                    {errors.vehicleType && <p className="text-red-500">{errors.vehicleType}</p>}
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
                    <label className="block">Fecha:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.date && <p className="text-red-500">{errors.date}</p>}
                </div>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {generalError && <p className="text-red-500">{generalError}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterCarrier;

