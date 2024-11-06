'use client'
import React, { useState } from 'react'
import { sendSoapRequest } from '@/hooks/SOAP/requestUser'
import axios from 'axios'

export interface User {
    username: string
    email: string
    id: number
}

const Dashboard: React.FC = () => {
    const [identifier, setIdentifier] = useState<string>('')
    const [response, setResponse] = useState<string | null>(null)
    const [userList, setUserFetch] = useState<Array<User> | null>()
    const [selectedType, setSelectedType] = useState<string>('')

    const getUsers = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            withCredentials: true
        }).then(response => {
            setUserFetch(response.data)
        })
            .catch((error) => console.error('Error in User request:', error))
    }


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const soapResponse = await sendSoapRequest(identifier, selectedType)
            setResponse(soapResponse)
        } catch (error) {
            console.error('Error in SOAP request:', error)
        }
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-center my-4">SOAP de Usuarios</h1>
            <div className='w-full grid grid-cols-3'>
                <div>
                    <button type="submit" onClick={getUsers} className='border rounded-2xl border-stone-500 w-50 p-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-md'>Informacion de usuarios</button>
                </div>
                <div className='grid grid-cols-subgrid col-span-2'>
                    {userList && (
                        <table className=" w-75 h-25">
                            <thead className="border rounded-lg p-2 my-2 w-50 h-25">
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody className="border rounded-lg p-2 my-2 w-75 h-25">
                                {userList.map((user) => (
                                    <tr key={user.id}>
                                        <td className='px-5'>{user.username}</td>
                                        <td className='px-5'>{user.email}</td>
                                    </tr>))}
                            </tbody>
                        </table>)
                    }
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">Nombre o email usuario:</label>
                <input type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Nombre de usuario o email."
                    className="border rounded-lg p-2 w-full" />
                <label className="block" htmlFor="requestType">Choose an option:</label>
                <select id="requestType"
                    value={selectedType}
                    onChange={handleSelectChange}
                    className="border rounded-lg p-2 w-full">
                    <option value="">--Elige que datos recuperar--</option>
                    <option value="GetUserRequest">Informacion de usuario</option>
                    <option value="GetUserRoleRequest">Informacion de Rol de usuario</option>
                </select>
                <button type="submit" className='border rounded-2xl border-2 border-stone-500 p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-md'>Pedir datos</button>
            </form>
            <h1 className="pt-2 text-lg">Respuesta:</h1>
            {response && (<div
                className="border rounded-lg p-2 my-2 w-50"><pre className='w-full font-medium text-lg leading-7 p-2'>{response}</pre> </div>)}
        </div>
    )
}

export default Dashboard
