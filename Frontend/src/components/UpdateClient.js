import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';

const UpdateClient = () => {
    const { id } = useParams();
    const [client, setClient] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        balance: 0,
        address: '',
        birthdate: ''
    });

    useEffect(() => {
        axios.get(`/clients/${id}`)
            .then(response => {
                const clientData = response.data;
                clientData.birthdate = formatDateForInput(clientData.birthdate);
                setClient(clientData);
            })
            .catch(error => console.error('Error fetching client:', error));
    }, [id]);

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/clients/${id}`, client)
            .then(response => console.log('Client updated:', response.data))
            .catch(error => console.error('Error updating client:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Client</h2>
            <input type="text" name="name" value={client.name} onChange={handleChange} />
            <input type="text" name="lastName" value={client.lastName} onChange={handleChange} />
            <input type="email" name="email" value={client.email} onChange={handleChange} />
            <input type="text" name="phone" value={client.phone} onChange={handleChange} />
            <input type="password" name="password" value={client.password} onChange={handleChange} />
            <input type="number" name="balance" value={client.balance} onChange={handleChange} />
            <input type="text" name="address" value={client.address} onChange={handleChange} />
            <input type="date" name="birthdate" value={client.birthdate} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateClient;
