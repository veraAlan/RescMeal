'use client'
import { useUpdateUser } from '@/hooks/User/useUpdateUser';
import React from 'react'

const UpdateUser: React.FC = () => {
    const {
        userForm,
        userErrors,
        handleChangeUpdate,
        handleSubmit,
    } = useUpdateUser();

    return (
        <div id="myElement" className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Modificar Repartidor</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className='block text-lg'>Informacion Usuario</label>
                <div>
                    <label className="block">Nombre usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={userForm.username}
                        onChange={handleChangeUpdate}
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
                        onChange={handleChangeUpdate}
                        className="border p-2 w-full"
                    />
                    {userErrors.email && <p className="text-red-500">{userErrors.email}</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Modificar</button>
            </form>
        </div>
    );
};

export default UpdateUser;