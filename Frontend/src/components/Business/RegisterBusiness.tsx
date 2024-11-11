import React from 'react';
import { useRegisterBusiness } from '../../hooks/Business/useRegisterBusiness';

const RegisterBusiness: React.FC = () => {
    const {
        businessForm,
        userForm,
        userErrors,
        businessErrors,
        imageError,
        generalError,
        userSession,
        hasBusiness,
        handleChange,
        handleImage,
        handleSubmit,
        handleChangeRegister
    } = useRegisterBusiness();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-4">Registrar Negocio</h2>
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
                            <label className="block">Email del local:</label>
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
                <label className='block text-lg'>Informacion de Negocio</label>
                {hasBusiness &&
                    <div>
                        <div>
                            <label className="block">Logo/Portada:</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleImage}
                                className="border p-2 w-full"
                            />
                            {imageError && <p className="text-red-500">{imageError}</p>}
                        </div>
                        <div>
                            <label className="block">Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                value={businessForm.name}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                            {businessErrors.name && <p className="text-red-500">{businessErrors.name}</p>}
                        </div>
                        <div>
                            <label className="block">Tipo de Negocio:</label>
                            <input
                                type="text"
                                name="type"
                                value={businessForm.type}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                            {businessErrors.type && <p className="text-red-500">{businessErrors.type}</p>}
                        </div>
                        <div>
                            <label className="block">Dirección:</label>
                            <input
                                type="text"
                                name="address"
                                value={businessForm.address}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                            {businessErrors.address && <p className="text-red-500">{businessErrors.address}</p>}
                        </div>
                        <div>
                            <label className="block">Horario:</label>
                            <input
                                type="text"
                                name="schedule"
                                value={businessForm.schedule}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                            {businessErrors.schedule && <p className="text-red-500">{businessErrors.schedule}</p>}
                        </div>
                        <div>
                            <label className="block">CVU:</label>
                            <input
                                type="text"
                                name="cvu"
                                value={businessForm.cvu}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                            {businessErrors.cvu && <p className="text-red-500">{businessErrors.cvu}</p>}
                        </div>
                        <div>
                            <label className="block">Teléfono:</label>
                            <input
                                type="text"
                                name="phone"
                                value={businessForm.phone}
                                onChange={handleChange}
                                className="border p-2 w-full"
                            />
                            {businessErrors.phone && <p className="text-red-500">{businessErrors.phone}</p>}
                        </div>
                    </div>
                }
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Registrar
                </button>
                {!hasBusiness && <p className="text-green-500 text-lg font-semibold">Ya tiene un local asociado. <a href='/auth/me'>Ver perfil</a></p>}
            </form>
        </div>
    );
};

export default RegisterBusiness;