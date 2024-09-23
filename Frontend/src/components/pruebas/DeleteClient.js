import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axiosConfig';

const DeleteClient = () => {
    const { id } = useParams();
    console.log('Received ID:', id);

    const handleDelete = () => {
        if (id === undefined) {
            console.error('Error: id is undefined');
            return;
        }
        axios.delete(`/clients/${id}`)
            .then(response => console.log('Client deleted:', response.data))
            .catch(error => console.error('Error deleting client:', error));
    };

    return (
        <button onClick={handleDelete}>Delete Client</button>
    );
};

export default DeleteClient;

