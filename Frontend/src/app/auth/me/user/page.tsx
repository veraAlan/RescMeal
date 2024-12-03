'use client'
import React from 'react';
import Link from 'next/link';
import { useUpdateUser } from '@/hooks/User/useUpdateUser';

const UpdateUser: React.FC = () => {
    const {
        userForm,
        userErrors,
        handleChangeUpdate,
        handleSubmit,
    } = useUpdateUser();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div id="myElement" className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 mt-16">
                <h2 className="text-3xl mb-6 text-center font-bold text-blue-600">Modificar Repartidor</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className='block text-lg mb-1 font-medium'>Información Usuario</label>
                    <div>
                        <label className="block mb-1 font-medium">Nombre usuario:</label>
                        <input
                            type="text"
                            name="username"
                            value={userForm.username}
                            onChange={handleChangeUpdate}
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
                            onChange={handleChangeUpdate}
                            className="border rounded-lg p-2 w-full"
                        />
                        {userErrors.email && <p className="text-red-500">{userErrors.email}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                        Modificar
                    </button>
                </form>
                <div className="mt-4">
                    <Link href="/auth/me" className="bg-gray-500 text-white p-3 rounded-lg w-full text-center hover:bg-gray-600 transition duration-300 block">
                        Volver
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;