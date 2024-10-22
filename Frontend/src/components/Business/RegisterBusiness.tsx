import React from 'react';
import { useRegisterBusiness } from '../../hooks/Business/useRegisterBusiness';

const RegisterBusiness: React.FC = () => {
    //TODO No funcionan las validaciones que viene del Backend. Carga imagenes y las guarda en Frontend/public/Business
    const {
        businessData,
        registerData,
        errors,
        successMessage,
        generalError,
        handleChange,
        handleImage,
        handleSubmit,
        handleChangeRegister
    } = useRegisterBusiness();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Registrar Negocio</h2>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {generalError && <p className="text-red-500">{generalError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nombre usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={registerData.username}
                        onChange={handleChangeRegister}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Email del local:</label>
                    <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleChangeRegister}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleChangeRegister}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Foto del Negocio:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleImage}
                        className="border p-2 w-full"
                    />
                    {errors.image && <p className="text-red-500">{errors.image}</p>}
                </div>
                <div>
                    <label className="block">Nombre del Negocio:</label>
                    <input
                        type="text"
                        name="name"
                        value={businessData.name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <label className="block">Tipo de Negocio:</label>
                    <input
                        type="text"
                        name="type"
                        value={businessData.type}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.type && <p className="text-red-500">{errors.type}</p>}
                </div>
                <div>
                    <label className="block">Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={businessData.address}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.address && <p className="text-red-500">{errors.address}</p>}
                </div>
                <div>
                    <label className="block">Horario del Negocio:</label>
                    <input
                        type="text"
                        name="schedule"
                        value={businessData.schedule}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.schedule && <p className="text-red-500">{errors.schedule}</p>}
                </div>
                <div>
                    <label className="block">CVU:</label>
                    <input
                        type="text"
                        name="cvu"
                        value={businessData.cvu}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.cvu && <p className="text-red-500">{errors.cvu}</p>}
                </div>
                <div>
                    <label className="block">Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={businessData.phone}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default RegisterBusiness;