'use client'
import React, { useState } from 'react'
import { sendSoapRequest } from '@/hooks/SOAP/requestUser'

const Dashboard: React.FC = () => {
    const [identifier, setIdentifier] = useState<string>('')
    const [response, setResponse] = useState<string | null>(null)
    const [selectedType, setSelectedType] = useState<string>('')

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
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">Nombre o email usuario:</label>
                <input type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Nombre de usuario o email."
                    className="border p-2 w-full" />
                <label className="block" htmlFor="requestType">Choose an option:</label>
                <select id="requestType"
                    value={selectedType}
                    onChange={handleSelectChange}
                    className="border p-2 w-full">
                    <option value="">--Please choose an option--</option>
                    <option value="GetUserRequest">Informacion de usuario</option>
                    <option value="GetUserRoleRequest">Informacion de Rol de usuario</option>
                </select>
                <button type="submit">Pedir datos</button>
            </form>
            {response && (<div
                className="border p-2 w-50"> <h2>Response:</h2> <pre className='w-full'>{response}</pre> </div>)}
        </div>
    )
}

export default Dashboard
