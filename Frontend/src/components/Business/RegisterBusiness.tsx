import React from 'react';
import { useRegisterBusiness } from '../../hooks/Business/useRegisterBusiness';
import AddressPicker from '../Map/AddressPicker';

const RegisterBusiness: React.FC = () => {
    const {
        businessForm,
        setBusinessData,
        userForm,
        userErrors,
        businessErrors,
        imageError,
        userSession,
        hasBusiness,
        setAddress,
        setAddressLat,
        setAddressLong,
        handleChange,
        handleImage,
        handleSubmit,
        handleChangeRegister
    } = useRegisterBusiness();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
                <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Registrar Negocio</h2>
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
                                <label className="block mb-1 font-medium">Email del local:</label>
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
                    <label className="block text-lg mb-1 font-medium">Información de Negocio</label>
                    {!hasBusiness && (
                        <div>
                            <div>
                                <label className="block mb-1 font-medium">Logo/Portada:</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImage}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {imageError && <p className="text-red-500">{imageError}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={businessForm.name}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {businessErrors.name && <p className="text-red-500">{businessErrors.name}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Tipo de Negocio:</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={businessForm.type}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {businessErrors.type && <p className="text-red-500">{businessErrors.type}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Dirección:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={businessForm.address}
                                    readOnly
                                    style={{ display: 'none' }}
                                    className="border rounded-lg p-2 w-full bg-gray-100"
                                />
                                <AddressPicker
                                    setAddress={(address) => {
                                        setAddress(address);
                                        setBusinessData(prevState => ({
                                            ...prevState,
                                            address
                                        }));
                                    }}
                                    setAddressLat={(lat) => {
                                        setAddressLat(lat);
                                        setBusinessData(prevState => ({
                                            ...prevState,
                                            address_lat: lat
                                        }));
                                    }}
                                    setAddressLong={(lng) => {
                                        setAddressLong(lng);
                                        setBusinessData(prevState => ({
                                            ...prevState,
                                            address_long: lng
                                        }));
                                    }}
                                />
                                {businessErrors.address && <p className="text-red-500">{businessErrors.address}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Horario:</label>
                                <input
                                    type="text"
                                    name="schedule"
                                    value={businessForm.schedule}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {businessErrors.schedule && <p className="text-red-500">{businessErrors.schedule}</p>}
                            </div>
                            <div>
                                <div>
                                    <label className="block mb-1 font-medium">CVU:</label>
                                    <input
                                        type="text"
                                        name="cvu"
                                        value={businessForm.cvu}
                                        onChange={handleChange}
                                        className="border rounded-lg p-2 w-full"
                                    />
                                    {businessErrors.cvu && <p className="text-red-500">{businessErrors.cvu}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Teléfono:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={businessForm.phone}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                />
                                {businessErrors.phone && <p className="text-red-500">{businessErrors.phone}</p>}
                            </div>
                        </div>
                    )}
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                        Registrar
                    </button>
                    {hasBusiness && (
                        <p className="text-green-500 text-lg font-semibold text-center">
                            Ya tiene un local asociado. <a href='/auth/me'>Ver perfil</a>
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterBusiness;