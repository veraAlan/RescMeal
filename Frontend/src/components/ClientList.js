import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig.js';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get('/clients')
            .then(response => setClients(response.data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    return (
        <div>
            <h2>Client List</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>{client.name} {client.lastName}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;
