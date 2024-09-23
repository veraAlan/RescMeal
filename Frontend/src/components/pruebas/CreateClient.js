import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const CreateClient = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/clients', client)
            .then(response => console.log('Client created:', response.data))
            .catch(error => console.error('Error creating client:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Client</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="number" name="balance" placeholder="Balance" onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <input type="date" name="birthdate" placeholder="Birthdate" onChange={handleChange} />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateClient;
