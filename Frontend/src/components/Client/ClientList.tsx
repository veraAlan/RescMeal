import React from 'react';
import { useListClients } from '../../hooks/Client/useListClients';
import { Client } from '../../types/Client';

interface ClientListProps {
    clients?: Client[];
}

const ClientList: React.FC<ClientListProps> = () => {
    const { clients, loading, error } = useListClients();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading clients: {error}</div>;
    }

    if (!clients || clients.length === 0) {
        return <div className="text-center text-gray-500">No clients available</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
            <ul className="space-y-2">
                {clients.map(({ id, name, last_name, email, phone, address, birthdate }) => (
                    <li key={id} className="border p-2 rounded shadow-sm">
                        <p><strong>Nombre:</strong> {name}</p>
                        <p><strong>Apellido:</strong> {last_name}</p>
                        <p><strong>Correo Electrónico:</strong> {email}</p>
                        <p><strong>Teléfono:</strong> {phone || 'N/A'}</p>
                        <p><strong>Dirección:</strong> {address}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {birthdate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;